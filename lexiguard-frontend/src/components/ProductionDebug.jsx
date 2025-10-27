// Debug component for production deployment
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';

export default function ProductionDebug() {
  const [debugInfo, setDebugInfo] = useState({});
  const [apiTest, setApiTest] = useState('Testing...');

  useEffect(() => {
    const runDebugChecks = async () => {
      const info = {
        // Environment Info
        domain: window.location.hostname,
        url: window.location.href,
        environment: process.env.NODE_ENV,
        
        // Firebase Config Check
        firebaseApiKey: process.env.REACT_APP_FIREBASE_API_KEY ? '✅ Present' : '❌ Missing',
        firebaseAuthDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '❌ Missing',
        firebaseProjectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '❌ Missing',
        
        // Backend Config Check
        backendUrl: process.env.REACT_APP_BACKEND_URL || '❌ Missing',
        
        // Auth Status
        authInitialized: auth ? '✅ Initialized' : '❌ Failed',
        
        // User Agent
        userAgent: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                  navigator.userAgent.includes('Firefox') ? 'Firefox' : 
                  navigator.userAgent.includes('Safari') ? 'Safari' : 'Other'
      };
      
      setDebugInfo(info);
      
      // Test API connection
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (backendUrl) {
          const response = await fetch(`${backendUrl}/`);
          const data = await response.json();
          setApiTest(`✅ Backend connected: ${data.message || 'OK'}`);
        } else {
          setApiTest('❌ Backend URL not configured');
        }
      } catch (error) {
        setApiTest(`❌ Backend connection failed: ${error.message}`);
      }
    };
    
    runDebugChecks();
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg max-w-md text-xs z-50">
      <h3 className="font-bold mb-2">🔧 Production Debug Info</h3>
      
      <div className="space-y-1">
        <div><strong>Domain:</strong> {debugInfo.domain}</div>
        <div><strong>Environment:</strong> {debugInfo.environment}</div>
        <div><strong>Firebase API Key:</strong> {debugInfo.firebaseApiKey}</div>
        <div><strong>Firebase Auth Domain:</strong> {debugInfo.firebaseAuthDomain}</div>
        <div><strong>Firebase Project ID:</strong> {debugInfo.firebaseProjectId}</div>
        <div><strong>Backend URL:</strong> {debugInfo.backendUrl}</div>
        <div><strong>Auth Initialized:</strong> {debugInfo.authInitialized}</div>
        <div><strong>Browser:</strong> {debugInfo.userAgent}</div>
        <div><strong>API Test:</strong> {apiTest}</div>
      </div>
      
      <div className="mt-3 text-yellow-300">
        <strong>Expected for lexiguard-one.vercel.app:</strong>
        <div>• All configs should show ✅</div>
        <div>• API test should be ✅</div>
        <div>• Domain must be in Firebase Console</div>
      </div>
    </div>
  );
}