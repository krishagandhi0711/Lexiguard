// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      console.log('🔄 Starting Google Sign-In...');
      
      // Create a new provider instance with proper scopes
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      
      // Additional provider settings for better compatibility
      provider.setCustomParameters({
        prompt: 'select_account',
        // Remove any domain restrictions
      });
      
      console.log('🔄 Attempting signInWithPopup...');
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Debug logging
      console.log('✅ User signed in successfully:', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        emailVerified: user.emailVerified
      });
      
      return user;
    } catch (error) {
      console.error("❌ Error signing in with Google:", error);
      
      // Provide more specific error messages
      let userFriendlyMessage = "Failed to sign in with Google. ";
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          userFriendlyMessage += "Sign-in popup was closed. Please try again.";
          break;
        case 'auth/popup-blocked':
          userFriendlyMessage += "Sign-in popup was blocked by your browser. Please allow popups and try again.";
          break;
        case 'auth/cancelled-popup-request':
          userFriendlyMessage += "Another sign-in popup is already open.";
          break;
        case 'auth/operation-not-allowed':
          userFriendlyMessage += "Google sign-in is not enabled for this app.";
          break;
        case 'auth/network-request-failed':
          userFriendlyMessage += "Network error. Please check your connection and try again.";
          break;
        case 'auth/invalid-api-key':
          userFriendlyMessage += "Invalid API key configuration.";
          break;
        case 'auth/app-not-authorized':
          userFriendlyMessage += "This app is not authorized to use Firebase Authentication.";
          break;
        default:
          userFriendlyMessage += `Error: ${error.message}`;
      }
      
      // Create a custom error with user-friendly message
      const customError = new Error(userFriendlyMessage);
      customError.originalError = error;
      throw customError;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      console.log('✅ User signed out successfully');
    } catch (error) {
      console.error("❌ Error signing out:", error);
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('👤 Auth state updated:', {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          hasPhoto: !!user.photoURL
        });
      } else {
        console.log('👤 No user authenticated');
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}