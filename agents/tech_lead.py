# from llm_setup import call_llm

# class TechLead:
#     def run(self, code, audit_report):
#         prompt = f"""
#         ROLE:
#         You are a decisive Tech Lead. You are responsible for the quality and security of the codebase.
#         You must review the code and the security audit report to make a final decision.

#         INPUTS:
#         1. Audit Report (from Security Auditor):
#         {audit_report}

#         2. Proposed Code (from Junior Dev):
#         {code}

#         INSTRUCTIONS:
#         - If the Audit Report contains ANY "CRITICAL" issues, you MUST reject the code (VERDICT: NO).
#         - If the Audit Report has only minor style suggestions, you can approve it (VERDICT: YES) but still suggest improvements.
#         - If you reject, define a NEW RULE for the Style Guide to prevent this mistake in the future.

#         OUTPUT FORMAT (Strict):
#         Respond in this EXACT format:
#         VERDICT: [YES or NO]
#         REASON: [Short explanation of why you approved or rejected]
#         Add to style guide: [One short, clear rule to prevent this error, or "None" if valid]
#         """
#         return call_llm(prompt)

from llm_setup import call_llm

class TechLead:
    def run(self, code, audit_report):
        prompt = f"""
        ROLE:
        You are a Pragmatic Tech Lead. Your goal is to ship code fast, as long as it is safe.
        
        INPUTS:
        1. Audit Report:
        {audit_report}

        2. Code:
        {code}

        INSTRUCTIONS:
        - **PRIMARY GOAL:** Check if the specific "Critical" issue from the previous attempt was fixed.
        - **IGNORE:** Do not reject code for minor issues like "logging configuration", "docstring formatting", "file descriptors", or "cleanup". 
        - **APPROVE IMMEDIATELY** if the code works and has no obvious SQL Injection or Hardcoded Secrets.
        
        OUTPUT FORMAT (Strict):
        VERDICT: [YES or NO]
        REASON: [Short explanation]
        Add to style guide: [One simple rule or "None"]
        """
        return call_llm(prompt)