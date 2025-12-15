from llm_setup import call_llm


class SecurityAuditor:
    def run(self, code):
        prompt = f"""
You are a strict security auditor.

Analyze the following code for any issues:
- security flaws
- unsafe practices
- efficiency problems

Return a bullet-point list.

Code:
{code}
"""
        return call_llm(prompt)
