from llm_setup import call_llm


class TechLead:

    def run(self, code, audit_report):

        prompt = f"""
You are the Tech Lead. Review the code and audit.

Respond in this exact format:

VERDICT: YES or NO

If NO, explain issues and provide ONE new rule:

Add to style guide: <single short rule>

Code:
{code}

Audit Report:
{audit_report}
"""

        return call_llm(prompt)
