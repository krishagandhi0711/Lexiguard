// Debug Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Debug: Log environment variables
console.log('🔧 Firebase Environment Variables:');
console.log('API Key:', process.env.REACT_APP_FIREBASE_API_KEY ? '✅ Loaded' : '❌ Missing');
console.log('Auth Domain:', process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? '✅ Loaded' : '❌ Missing');
console.log('Project ID:', process.env.REACT_APP_FIREBASE_PROJECT_ID ? '✅ Loaded' : '❌ Missing');
console.log('Storage Bucket:', process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ? '✅ Loaded' : '❌ Missing');
console.log('Messaging Sender ID:', process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ? '✅ Loaded' : '❌ Missing');
console.log('App ID:', process.env.REACT_APP_FIREBASE_APP_ID ? '✅ Loaded' : '❌ Missing');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Debug: Log the final config (without sensitive values)
console.log('🔧 Final Firebase Config:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 8)}...` : 'MISSING'
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Configure Google Auth provider with additional settings
googleProvider.setCustomParameters({
  prompt: 'select_account',
  hd: undefined // Remove domain restrictions if any
});

// Add additional scopes for better user info
googleProvider.addScope('profile');
googleProvider.addScope('email');

export default app;