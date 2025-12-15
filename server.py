from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import time

# Import your agents
from agents.junior_dev import JuniorDeveloper
from agents.security_auditor import SecurityAuditor
from agents.tech_lead import TechLead

app = FastAPI()

# Allow Frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Restrict to known frontends
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestBody(BaseModel):
    prompt: str

# --- HELPER FUNCTIONS ---
def read_style_guide():
    try:
        with open("memory/style_guide.txt", "r", encoding="utf-8") as f:
            return f.read()
    except:
        return ""

def update_style_guide(rule):
    try:
        with open("memory/style_guide.txt", "a", encoding="utf-8") as f:
            f.write(f"\n- {rule}")
    except Exception as e:
        print(f"Error updating memory: {e}")

# --- THE API ENDPOINT ---
@app.post("/api/review")
async def run_review(body: RequestBody):
    """
    Runs the 'Self-Healing' loop:
    Junior Dev -> Auditor -> Tech Lead -> (Loop if Rejected)
    """
    history = []  # We will store every attempt here
    user_request = body.prompt
    max_retries = 3
    attempt = 1
    success = False

    while attempt <= max_retries:
        print(f"--- API Attempt {attempt} ---")
        
        # 1. Get Memory
        current_style = read_style_guide()
        
        # 2. Junior Dev Writes Code
        code = JuniorDeveloper().run(user_request, current_style)
        time.sleep(2)  # Delay to avoid RPM limits
        
        # 3. Security Auditor Checks
        audit = SecurityAuditor().run(code)
        time.sleep(2)  # Delay
        
        # 4. Tech Lead Decides
        verdict = TechLead().run(code, audit)
        time.sleep(2)  # Delay

        # 5. Determine Status
        is_approved = "VERDICT: YES" in verdict.upper()
        status = "approved" if is_approved else "rejected"

        # 6. Save this attempt to history
        history.append({
            "attempt": attempt,
            "code": code,
            "security_report": audit,
            "tech_lead_verdict": verdict,
            "status": status
        })

        if is_approved:
            success = True
            break  # Exit loop (Success!)
        
        # 7. If Rejected, Learn & Retry
        if "Add to style guide:" in verdict:
            try:
                new_rule = verdict.split("Add to style guide:")[-1].strip().split("\n")[0]
                if len(new_rule) > 10 and "None" not in new_rule:
                    update_style_guide(new_rule)
            except:
                pass
        
        # Update prompt for next loop
        user_request = f"Previous attempt failed.\nFeedback: {audit}\n\nOriginal Request: {body.prompt}"
        attempt += 1

    # Return the FULL history so the UI shows Red -> Green
    return {"history": history, "final_status": "success" if success else "failed"}