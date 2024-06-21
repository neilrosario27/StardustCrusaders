import os
from dotenv import load_dotenv
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def ask_gemini(user_question, user_experience):
    model = genai.GenerativeModel('gemini-pro')
    prompt = (f"Assume the user is a Computer Engineering student, the user is going to provide you with their career "
              f"goals, prepare a 5-step program to help the user achieve their goals. Only give titles of each step, do not give "
              f"any further details. {user_question} This is the user's level of experience: {user_experience}.")
    response_gemini = model.generate_content(prompt)
    response_gemini = response_gemini.text.replace('**', '').replace('*', '•')
    return response_gemini

def format_response(response):
    lines = response.split('•')
    lines = [line.strip() for line in lines if line.strip()]
    formatted_response = '\n'.join(lines)
    return formatted_response

def elaborate_step(step_title):
    prompt = f"Based on this step: {step_title}, elaborate on how to achieve this step. Keep it short and precise."
    model = genai.GenerativeModel('gemini-pro')
    response_gemini = model.generate_content(prompt)
    response_gemini = response_gemini.text.replace('**', '').replace('*', '•')
    return response_gemini

@app.route('/api/flowchart', methods=['POST'])
def generate_flowchart():
    data = request.json
    user_question = data.get('career_choice')
    user_experience = data.get('experience')

    raw_gemini_response = ask_gemini(user_question, user_experience)
    formatted_gemini_response = format_response(raw_gemini_response)

    steps = formatted_gemini_response.split('\n')
    detailed_responses = [elaborate_step(step) for step in steps]

    return jsonify({
        'original_response': raw_gemini_response,
        'steps': detailed_responses
    })

if __name__ == "__main__":
    app.run(debug=True)
