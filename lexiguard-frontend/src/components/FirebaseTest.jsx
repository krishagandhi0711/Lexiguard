// Test component to debug Firebase issues
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';

export default function FirebaseTest() {
  const [status, setStatus] = useState('Checking Firebase configuration...');
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const runTests = async () => {
      const results = [];
      
      // Test 1: Environment variables
      results.push({
        test: 'Environment Variables',
        status: process.env.REACT_APP_FIREBASE_API_KEY ? '✅ Loaded' : '❌ Missing',
        details: `API Key: ${process.env.REACT_APP_FIREBASE_API_KEY ? 'Present' : 'Missing'}`
      });
      
      // Test 2: Firebase Auth initialization
      try {
        results.push({
          test: 'Firebase Auth',
          status: auth ? '✅ Initialized' : '❌ Failed',
          details: `Auth instance: ${auth ? 'Present' : 'Missing'}`
        });
      } catch (error) {
        results.push({
          test: 'Firebase Auth',
          status: '❌ Error',
          details: error.message
        });
      }
      
      // Test 3: Current domain
      results.push({
        test: 'Current Domain',
        status: '📍 Info',
        details: `${window.location.protocol}//${window.location.host}`
      });
      
      setDetails(results);
      setStatus('Firebase configuration check complete');
    };
    
    runTests();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Firebase Configuration Test</h2>
      <p className="mb-4 text-gray-600">{status}</p>
      
      <div className="space-y-3">
        {details.map((result, index) => (
          <div key={index} className="p-3 border rounded-lg">
            <div className="flex justify-between items-center">
              <strong>{result.test}</strong>
              <span className={result.status.includes('✅') ? 'text-green-600' : 
                             result.status.includes('❌') ? 'text-red-600' : 'text-blue-600'}>
                {result.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{result.details}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800">Common Issues & Solutions:</h3>
        <ul className="text-sm text-yellow-700 mt-2 space-y-1">
          <li>• Make sure .env file is in the root of lexiguard-frontend/</li>
          <li>• Restart your development server after changing .env</li>
          <li>• Check Firebase Console: Authentication → Sign-in method → Google (enabled)</li>
          <li>• Verify authorized domains in Firebase Console include localhost:3000</li>
          <li>• Clear browser cache and cookies for localhost</li>
        </ul>
      </div>
    </div>
  );
}