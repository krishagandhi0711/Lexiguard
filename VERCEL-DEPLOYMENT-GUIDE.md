# 🚀 Vercel Deployment Guide for LexiGuard

## 📋 Pre-Deployment Checklist

### **1. Firebase Console Configuration**

🔥 **CRITICAL: Add Vercel Domain to Firebase**

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `lexiguard-475609`
3. Navigate to: **Authentication → Settings → Authorized domains**
4. Click **Add domain** and add:
   - Your Vercel URL: `your-app-name.vercel.app`
   - Wildcard: `*.vercel.app` (for preview deployments)
   - Example: `lexiguard-frontend-git-main-dhriti-5.vercel.app`

### **2. Vercel Environment Variables**

In your Vercel Dashboard → Project Settings → Environment Variables, add:

```bash
REACT_APP_BACKEND_URL=https://lexiguard-backend-372716482731.asia-south1.run.app
REACT_APP_FIREBASE_API_KEY=AIzaSyDn7_Xcn4tj3SbrTeO8dhAcoqUiSt1n_Y4
REACT_APP_FIREBASE_AUTH_DOMAIN=lexiguard-475609.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=lexiguard-475609
REACT_APP_FIREBASE_STORAGE_BUCKET=lexiguard-475609.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=372716482731
REACT_APP_FIREBASE_APP_ID=1:372716482731:web:bd783a97a7e51e7ac0c7b6
```

### **3. Backend CORS Update**

✅ Your backend already has CORS configured for Vercel:
```javascript
allow_origin_regex=r"https://.*\.vercel\.app"
```

## 🔧 Common Vercel Deployment Issues

### **Google Sign-In Fails (auth/unauthorized-domain)**
- **Cause**: Vercel domain not in Firebase authorized domains
- **Fix**: Add your Vercel domain to Firebase Console

### **Environment Variables Not Loading**
- **Cause**: Missing REACT_APP_ prefix or not set in Vercel
- **Fix**: Check Vercel Dashboard → Environment Variables

### **API Calls Failing (CORS)**
- **Cause**: Backend CORS not configured for Vercel
- **Fix**: ✅ Already configured in your backend

### **Build Failures**
- **Cause**: Import errors or missing dependencies
- **Fix**: ✅ Already fixed in previous commits

## 🚀 Deployment Steps

1. **Push to GitHub main branch**
2. **Connect Vercel to your GitHub repo**
3. **Set environment variables in Vercel**
4. **Deploy and get your Vercel URL**
5. **Add Vercel URL to Firebase authorized domains**
6. **Test Google Sign-In on live site**

## 🔍 Debugging Production Issues

Check browser console for these logs:
- Firebase configuration status
- Environment variables validation
- Domain authorization warnings

## 📞 Support

If Google Sign-In still fails:
1. Check browser console for exact error
2. Verify Firebase authorized domains
3. Test in incognito mode
4. Clear browser cache

---

**⚠️ Remember**: Every time you get a new Vercel URL (preview deployments), add it to Firebase authorized domains!