#!/usr/bin/env python3
"""
Check available Gemini models
"""

import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

def list_available_models():
    """List all available Gemini models"""
    
    # Get API key
    API_KEY = os.getenv("GOOGLE_API_KEY")
    if not API_KEY:
        print("❌ GOOGLE_API_KEY not found in .env file!")
        return False
    
    # Configure Gemini
    genai.configure(api_key=API_KEY)
    print(f"✅ Gemini API configured with key: {API_KEY[:8]}...")
    
    try:
        print("\n🔍 Listing all available Gemini models...")
        models = genai.list_models()
        
        available_models = []
        for m in models:
            if 'generateContent' in m.supported_generation_methods:
                available_models.append(m.name)
                print(f"   ✅ Available: {m.name}")
                print(f"      Display name: {m.display_name}")
                print(f"      Supported methods: {m.supported_generation_methods}")
                print()
        
        print(f"\n📊 Summary:")
        print(f"   Total available models: {len(available_models)}")
        
        # Test the most common Flash models
        flash_candidates = [
            "gemini-1.5-flash",
            "models/gemini-1.5-flash", 
            "gemini-1.5-flash-latest",
            "models/gemini-1.5-flash-latest",
            "gemini-1.5-flash-002",
            "models/gemini-1.5-flash-002"
        ]
        
        print(f"\n🧪 Testing Flash model variations...")
        working_models = []
        
        safety_settings = {
            "HARM_CATEGORY_HARASSMENT": "block_none",
            "HARM_CATEGORY_HATE_SPEECH": "block_none", 
            "HARM_CATEGORY_SEXUALLY_EXPLICIT": "block_none",
            "HARM_CATEGORY_DANGEROUS_CONTENT": "block_none",
        }
        
        for candidate in flash_candidates:
            try:
                print(f"   Testing: {candidate}")
                model = genai.GenerativeModel(candidate, safety_settings=safety_settings)
                response = model.generate_content("Hello! Say 'Working'.")
                if response and response.text:
                    working_models.append(candidate)
                    print(f"   ✅ {candidate}: WORKS - {response.text[:30]}...")
                else:
                    print(f"   ❌ {candidate}: No response")
            except Exception as e:
                print(f"   ❌ {candidate}: {str(e)[:60]}...")
        
        print(f"\n🎯 RESULTS:")
        if working_models:
            print(f"✅ Working Flash models found: {len(working_models)}")
            for model_name in working_models:
                print(f"   • {model_name}")
            print(f"\n🎉 RECOMMENDATION: Use '{working_models[0]}' for fixed model")
        else:
            print(f"❌ No working Flash models found")
            print(f"🔍 Available models to try:")
            for model_name in available_models[:5]:  # Show first 5
                print(f"   • {model_name}")
                
        return working_models
        
    except Exception as e:
        print(f"❌ Error listing models: {e}")
        return []

if __name__ == "__main__":
    print("🔍 LexiGuard Model Discovery Tool")
    print("=" * 50)
    working_models = list_available_models()