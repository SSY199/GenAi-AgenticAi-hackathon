from llm_setup import call_llm


class JuniorDeveloper:
    def run(self, user_request, style_guide):
        prompt = f"""
You are a junior developer.

Follow this style guide strictly:

{style_guide}

Write clean, functional Python code for this request:

{user_request}
"""
        return call_llm(prompt)
