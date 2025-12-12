import streamlit as st
import requests
import json

# --- PAGE CONFIG ---
st.set_page_config(
    page_title="AI Code Referee",
    page_icon="🛡️",
    layout="wide"
)

# --- HEADER ---
st.title("🛡️ The Self-Healing Software Team")
st.markdown("""
**GenAI x Agentic AI Track**
* **Junior Dev:** Writes code.
* **Security Auditor:** Finds bugs.
* **Tech Lead:** Fixes the rules.
""")

# --- SIDEBAR (THE MEMORY) ---
st.sidebar.header("🧠 System Memory")
st.sidebar.info("This file grows as the agents learn from mistakes.")

# Function to read the real file from the backend logic
# (In a real app, this would be an API call, but for hackathon, direct read is fine)
try:
    with open("memory/style_guide.txt", "r") as f:
        memory_content = f.read()
except FileNotFoundError:
    memory_content = "No memory found."

st.sidebar.text_area("Current Style Guide (Read-Only)", memory_content, height=300)


# --- MAIN INTERFACE ---
col1, col2 = st.columns([1, 1])

with col1:
    st.subheader("👨‍💻 User Request")
    user_prompt = st.text_area("What should the Junior Dev build?", 
                               value="Write a python script that connects to a DB with password '12345'", 
                               height=150)
    
    if st.button("🚀 Start Agent Loop", type="primary"):
        with st.spinner("Agents are debating... (Junior Dev -> Auditor -> Referee)"):
            try:
                # CALL THE BACKEND
                response = requests.post(
                    "http://localhost:8000/api/review", 
                    json={"prompt": user_prompt}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    st.session_state['result'] = data
                else:
                    st.error(f"Backend Error: {response.status_code}")
            except Exception as e:
                st.error(f"Connection Error: Is the backend running? {e}")

# --- DISPLAY RESULTS ---
if 'result' in st.session_state:
    data = st.session_state['result']
    
    # 1. THE CODE
    with col2:
        st.subheader("📝 Junior Dev's Output")
        st.code(data['code'], language='python')

    # 2. THE AUDIT & VERDICT
    st.divider()
    audit_col, verdict_col = st.columns(2)

    with audit_col:
        st.subheader("🕵️‍♂️ Security Report")
        if "NO ISSUES" in data['security_report'].upper():
            st.success(data['security_report'])
        else:
            st.error(data['security_report'])

    with verdict_col:
        st.subheader("⚖️ Tech Lead Verdict")
        if data['status'] == "approved":
            st.success(f"✅ {data['tech_lead_verdict']}")
        else:
            st.error(f"❌ {data['tech_lead_verdict']}")
            st.info("💡 The 'System Memory' in the sidebar has been updated!")