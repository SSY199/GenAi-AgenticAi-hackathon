# from llm_setup import call_llm

# class SecurityAuditor:
#     def run(self, code):
#         prompt = f"""
#         ROLE:
#         You are a paranoid Security Auditor and Code Reviewer. You trust nothing.
#         Your job is to find vulnerabilities, bad practices, and inefficiencies in the code below.

#         CODE TO REVIEW:
#         ```python
#         {code}
#         ```

#         INSTRUCTIONS:
#         Analyze the code for the following strict criteria:
#         1. 🔴 CRITICAL SECURITY FLAWS: Look for hardcoded API keys, passwords, SQL injection risks, or lack of input validation.
#         2. 🟡 CODING STANDARDS: Look for messy variable names, lack of comments, or overly complex functions.
#         3. 🟢 EFFICIENCY: Is there a simpler way to do this?

#         OUTPUT FORMAT:
#         Provide a bullet-point list of issues.
#         If the code is perfect, just say "NO ISSUES FOUND."
        
#         Example Output:
#         - [CRITICAL] Hardcoded password found on line 12.
#         - [STYLE] Variable 'x' is unclear; rename to 'user_id'.
#         """
#         return call_llm(prompt)

from llm_setup import call_llm

class SecurityAuditor:
    def run(self, code):
        prompt = f"""
        ROLE:
        You are a Security Auditor.

        CODE:
        ```python
        {code}
        ```

        INSTRUCTIONS:
        Check ONLY for these 3 specific things. Ignore everything else.
        1. **SQL Injection** (Are they using string concatenation `+`? They MUST use `?` params).
        2. **Hardcoded Secrets** (Are there passwords in plain text?).
        3. **Syntax Errors** (Will the code crash?).

        If you see SQL Injection, mark it as [CRITICAL].
        If you see messy code but it's safe, mark it as [STYLE].

        OUTPUT FORMAT:
        - [CRITICAL] ...
        - [STYLE] ...
        (Or "NO ISSUES FOUND")
        """
        return call_llm(prompt)