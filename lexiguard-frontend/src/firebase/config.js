// firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Debug: Check if environment variables are loaded
const envVars = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Validate that all environment variables are present
const missingEnvVars = Object.entries(envVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing Firebase environment variables:', missingEnvVars);
  console.error('Make sure your .env file contains all REACT_APP_FIREBASE_* variables');
  console.error('For Vercel deployment, add these in Vercel Dashboard → Settings → Environment Variables');
}

// Your web app's Firebase configuration
const firebaseConfig = envVars;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Create and configure Google Auth provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google Auth provider settings for production
googleProvider.setCustomParameters({
  prompt: 'select_account', // Always show account selection
  // Remove any domain restrictions that might prevent sign-in
});

// Add required scopes
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Debug: Log environment and configuration info
const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'server';
const isProduction = process.env.NODE_ENV === 'production';
const isVercel = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');

console.log('🔧 Firebase Configuration Status:');
console.log('✅ Firebase initialized successfully');
console.log('🌐 Current domain:', currentDomain);
console.log('🏗️ Environment:', isProduction ? 'Production' : 'Development');
console.log('☁️ Platform:', isVercel ? 'Vercel' : 'Other');
console.log('🔑 Auth domain:', firebaseConfig.authDomain);
console.log('📱 Project ID:', firebaseConfig.projectId);

// Production deployment warnings
if (isProduction && isVercel) {
  console.log('🚀 PRODUCTION DEPLOYMENT DETECTED');
  console.log('⚠️ Make sure your Vercel domain is added to Firebase Console:');
  console.log('   1. Go to Firebase Console → Authentication → Settings → Authorized domains');
  console.log(`   2. Add: ${window.location.hostname}`);
  console.log('   3. Also add: *.vercel.app for wildcard support');
}

export default app;