from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Import your agents
from agents.junior_dev import JuniorDeveloper
from agents.security_auditor import SecurityAuditor
from agents.tech_lead import TechLead

app = FastAPI()

# CRITICAL: Allow your Frontend to talk to this Backend
# Lovable/Vite usually runs on localhost:8080 or localhost:5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (easiest for hackathon)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestBody(BaseModel):
    prompt: str

@app.post("/api/review")
async def run_review(body: RequestBody):
    """
    Runs the Junior Dev -> Security -> Tech Lead loop
    """
    # 1. Read Memory
    try:
        with open("memory/style_guide.txt", "r") as f:
            style_guide = f.read()
    except:
        style_guide = ""

    # 2. Run Agents (Simplified for speed)
    # Junior Dev
    code = JuniorDeveloper().run(body.prompt, style_guide)
    
    # Security
    audit = SecurityAuditor().run(code)
    
    # Tech Lead
    verdict = TechLead().run(code, audit)

    # 3. Return JSON that your Frontend expects
    return {
        "code": code,
        "security_report": audit,
        "tech_lead_verdict": verdict,
        # Check if approved based on text analysis
        "status": "approved" if "VERDICT: YES" in verdict.upper() else "rejected"
    }

# Run with: uvicorn server:app --reload --port 8000