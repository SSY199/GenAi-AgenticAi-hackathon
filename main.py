from agents.junior_dev import JuniorDeveloper
from agents.security_auditor import SecurityAuditor
from agents.tech_lead import TechLead
import time

def read_style_guide():
    try:
        # FIX: Added encoding="utf-8"
        with open("memory/style_guide.txt", "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return "No specific rules yet."

def update_style_guide(addition):
    # FIX: Added encoding="utf-8"
    with open("memory/style_guide.txt", "a", encoding="utf-8") as f:
        f.write("\n- " + addition)

def main():
    print("🚀 Starting AI Engineering Team...")
    user_request = input("Enter feature request: ")
    
    max_retries = 5
    attempt = 1
    success = False

    while attempt <= max_retries:
        print(f"\n\n=== ATTEMPT {attempt}/{max_retries} ===")
        
        # 0. Get current "Brain" (Style Guide)
        current_style = read_style_guide()
        
        # 1. Junior Dev writes code
        print("👨‍💻 Junior Dev is coding...")
        code = JuniorDeveloper().run(user_request, current_style)
        print(f"   -> Code generated ({len(code)} chars)")

        # 2. Auditor checks it
        print("🕵️  Security Auditor is scanning...")
        audit = SecurityAuditor().run(code)

        # 3. Tech Lead decides
        print("boss  Tech Lead is reviewing...")
        decision = TechLead().run(code, audit)
        
        # Check verdict
        if "VERDICT: YES" in decision.upper() and "NO" not in decision.upper():
            print("\n✅ TEAM SUCCESS! Code Merged.")
            print("\nFinal Code:\n", code)
            success = True
            break
        else:
            print("\n❌ REJECTED. Fixing issues...")
            
            # 4. LEARNING STEP (Crucial for Hackathon)
            if "Add to style guide:" in decision:
                try:
                    new_rule = decision.split("Add to style guide:")[-1].split("\n")[0].strip()
                    # Only add if it's a real rule
                    if len(new_rule) > 5 and "None" not in new_rule:
                        update_style_guide(new_rule)
                        print(f"   -> 🧠 Learned new rule: {new_rule}")
                    else:
                        print("   -> (No new rule added this time)")
                except Exception as e:
                    print(f"   -> ⚠️ Failed to save rule: {e}")
            
            # Send feedback back to Junior Dev via the 'user_request' for the next loop
            user_request = f"Previous attempt failed.\nFeedback: {audit}\n\nOriginal Request: {user_request}"
            attempt += 1
            time.sleep(1) # formatting pause

    if not success:
        print("\n💀 Failed after max retries.")

if __name__ == "__main__":
    main()