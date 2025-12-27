from fastapi import APIRouter, Body
import requests

router = APIRouter()

# Hugging Face Inference API (free tier, rate limited)
HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
HF_HEADERS = {"Authorization": "Bearer hf_xxx"}  # Replace with your Hugging Face token (free to create)

@router.post("/ai-tutor/ask")
async def ask_ai_tutor(question: str = Body(...)):
    payload = {"inputs": question}
    response = requests.post(HF_API_URL, headers=HF_HEADERS, json=payload)
    if response.ok:
        data = response.json()
        # Hugging Face returns a list of dicts with 'generated_text'
        answer = data[0]["generated_text"] if data and "generated_text" in data[0] else "No answer."
        return {"answer": answer}
    return {"answer": "Sorry, AI Tutor is unavailable right now."}
