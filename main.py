from agents.junior_dev import JuniorDeveloper
from agents.security_auditor import SecurityAuditor
from agents.tech_lead import TechLead
import time

def read_style_guide():
    try:
        with open("memory/style_guide.txt", "r") as f:
            return f.read()
    except FileNotFoundError:
        return "No specific rules yet."

def update_style_guide(addition):
    with open("memory/style_guide.txt", "a") as f:
        f.write("\n- " + addition)

def main():
    print("🚀 Starting AI Engineering Team...")
    user_request = input("Enter feature request: ")
    
    max_retries = 3
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
        time.sleep(2)  # Delay to avoid RPM limits

        # 2. Auditor checks it
        print("🕵️  Security Auditor is scanning...")
        audit = SecurityAuditor().run(code)
        time.sleep(2)  # Delay

        # 3. Tech Lead decides
        print("boss  Tech Lead is reviewing...")
        decision = TechLead().run(code, audit)
        time.sleep(2)  # Delay
        
        # Check verdict
        if "VERDICT: YES" in decision.upper():
            print("\n✅ TEAM SUCCESS! Code Merged.")
            print("\nFinal Code:\n", code)
            success = True
            break
        else:
            print("\n❌ REJECTED. Fixing issues...")
            
            # 4. LEARNING STEP (Crucial for Hackathon)
            # Extract the new rule from the Tech Lead's decision
            if "Add to style guide:" in decision:
                new_rule = decision.split("Add to style guide:")[-1].strip().split("\n")[0]
                if len(new_rule) > 10:
                    update_style_guide(new_rule)
                    print(f"   -> 🧠 Learned new rule: {new_rule}")
            
            # Send feedback back to Junior Dev via the 'user_request' for the next loop
            user_request = f"Previous attempt failed.\nFeedback: {audit}\n\nOriginal Request: {user_request}"
            attempt += 1
            time.sleep(1)  # Formatting pause

    if not success:
        print("\n💀 Failed after max retries.")

if __name__ == "__main__":
    main()