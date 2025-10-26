import requests
import json

# Test script for Role-Aware Chat Agent
BACKEND_URL = "http://localhost:8000"

def test_chat_flow():
    """Test the complete role-aware chat flow"""
    
    print("🧪 Testing LexiGuard Role-Aware Chat Agent")
    print("=" * 50)
    
    # Sample document text for testing
    sample_document = """
    RESIDENTIAL LEASE AGREEMENT
    
    This agreement is between John Doe (Landlord) and Jane Smith (Tenant).
    The tenant agrees to pay $1,200 monthly rent by the 1st of each month.
    The lease term is 12 months starting January 1, 2024.
    
    The tenant is responsible for utilities and must provide 30 days notice before moving out.
    The landlord may enter the property with 24-hour notice for inspections.
    
    Security deposit of $1,200 is required and will be returned within 30 days after move-out.
    """
    
    # Test 1: Initial chat request (should ask for role)
    print("\n1️⃣ Testing initial chat request...")
    response = requests.post(f"{BACKEND_URL}/chat", json={
        "message": "Hello, I need help with this lease agreement",
        "document_text": sample_document,
        "analysis_id": "test-123",
        "user_role": None,
        "conversation_history": []
    })
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Status: {response.status_code}")
        print(f"📝 Response: {data['reply'][:100]}...")
        print(f"🎭 Role needed: {data['needs_role_input']}")
        print(f"👤 Identified role: {data.get('identified_role', 'None')}")
    else:
        print(f"❌ Error: {response.status_code} - {response.text}")
        return
    
    # Test 2: Role declaration
    print("\n2️⃣ Testing role declaration...")
    response = requests.post(f"{BACKEND_URL}/chat", json={
        "message": "I'm the tenant",
        "document_text": sample_document,
        "analysis_id": "test-123",
        "user_role": None,
        "conversation_history": [
            {"sender": "ai", "text": data['reply']}
        ]
    })
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Status: {response.status_code}")
        print(f"📝 Response: {data['reply'][:150]}...")
        print(f"🎭 Role needed: {data['needs_role_input']}")
        print(f"👤 Identified role: {data.get('identified_role', 'None')}")
        user_role = data.get('identified_role')
    else:
        print(f"❌ Error: {response.status_code} - {response.text}")
        return
    
    # Test 3: Role-aware question
    print("\n3️⃣ Testing role-aware response...")
    response = requests.post(f"{BACKEND_URL}/chat", json={
        "message": "What are my rights regarding the security deposit?",
        "document_text": sample_document,
        "analysis_id": "test-123",
        "user_role": user_role,
        "conversation_history": [
            {"sender": "user", "text": "I'm the tenant"},
            {"sender": "ai", "text": data['reply']}
        ]
    })
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Status: {response.status_code}")
        print(f"📝 Response: {data['reply'][:200]}...")
        print(f"👤 Role context: {data.get('identified_role', 'None')}")
        print(f"🎯 Intent: {data.get('intent', 'None')}")
    else:
        print(f"❌ Error: {response.status_code} - {response.text}")
    
    print("\n" + "=" * 50)
    print("✅ Chat flow test completed!")

def test_backend_health():
    """Test if backend is running and Gemini is working"""
    
    print("🏥 Testing backend health...")
    
    # Test root endpoint
    try:
        response = requests.get(f"{BACKEND_URL}/")
        if response.status_code == 200:
            print("✅ Backend is running")
        else:
            print(f"❌ Backend error: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Is it running on localhost:8000?")
        return False
    
    # Test Gemini API
    try:
        response = requests.get(f"{BACKEND_URL}/test-gemini")
        if response.status_code == 200:
            data = response.json()
            print(f"🤖 Gemini Status: {data['status']}")
            print(f"🔑 API Key Configured: {data['api_key_configured']}")
            if data['status'] == 'success':
                print("✅ Gemini API is working")
                return True
            else:
                print(f"❌ Gemini Error: {data['message']}")
                print(f"🔧 Model: {data.get('model_name', 'Unknown')}")
                return False
        else:
            print(f"❌ Test endpoint error: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

if __name__ == "__main__":
    print("🚀 LexiGuard Chat Agent Test Suite")
    print("🎯 Testing Role-Aware Chat Feature Implementation")
    print()
    
    # First check if backend is healthy
    if test_backend_health():
        print("\n" + "="*50)
        test_chat_flow()
    else:
        print("\n❌ Backend health check failed. Please:")
        print("1. Start the backend: cd lexiguard-backend && python main.py")
        print("2. Check your GOOGLE_API_KEY in .env file")
        print("3. Verify Gemini API access and billing")