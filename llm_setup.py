import os
import time
import random
from groq import Groq, RateLimitError
from dotenv import load_dotenv

# Load .env file so os.getenv works
load_dotenv()

# Initialize Client (Make sure GROQ_API_KEY is in your .env)
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def call_llm(prompt: str, max_retries=5):
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="llama-3.1-8b-instant",  # Switched to higher-limit model
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1,  # Keep it low for coding tasks
                max_tokens=2048  # Prevent huge outputs
            )
            return response.choices[0].message.content.strip()
        except RateLimitError as e:
            # Extract wait time if provided
            if hasattr(e, 'response') and e.response.headers.get('retry-after'):
                wait = int(e.response.headers['retry-after'])
            else:
                wait = (2 ** attempt) + random.uniform(0, 1)  # Exponential backoff
            print(f"Rate limit hit! Waiting {wait:.1f}s (attempt {attempt+1}/{max_retries})")
            time.sleep(wait + 1)  # Extra safety
        except Exception as e:
            print(f"Other LLM Error: {str(e)}")
            time.sleep(2 ** attempt)
    return "Failed to get response after retries."