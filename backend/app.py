import os
from dotenv import load_dotenv
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from openai import OpenAI
from langchain.chat_models import ChatOpenAI
import PyPDF2 as pdf
import re
from openai import OpenAI
from langchain_community.chat_models import ChatOpenAI


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key = OPENAI_API_KEY)

#flowchart

# def ask_gemini(user_question, user_experience):
#     model = genai.GenerativeModel('gemini-pro')
#     prompt = (f"Assume the user is a Computer Engineering student, the user is going to provide you with their career "
#               f"goals, prepare a 5-step program to help the user achieve their goals. Only give titles of each step, do not give "
#               f"any further details. {user_question} This is the user's level of experience: {user_experience}.")
#     response_gemini = model.generate_content(prompt)
#     response_gemini = response_gemini.text.replace('**', '').replace('*', '•')
#     return response_gemini

# def format_response(response):
#     lines = response.split('•')
#     lines = [line.strip() for line in lines if line.strip()]
#     formatted_response = '\n'.join(lines)
#     return formatted_response

# def elaborate_step(step_title):
#     prompt = f"Based on this step: {step_title}, elaborate on how to achieve this step. Keep it short and precise."
#     model = genai.GenerativeModel('gemini-pro')
#     response_gemini = model.generate_content(prompt)
#     response_gemini = response_gemini.text.replace('**', '').replace('*', '•')
#     return response_gemini

# @app.route('/api/flowchart', methods=['POST'])
# def generate_flowchart():
#     data = request.json
#     user_question = data.get('career_choice')
#     user_experience = data.get('experience')

#     raw_gemini_response = ask_gemini(user_question, user_experience)
#     formatted_gemini_response = format_response(raw_gemini_response)

#     steps = formatted_gemini_response.split('\n')
#     detailed_responses = [elaborate_step(step) for step in steps]

#     return jsonify({
#         'original_response': raw_gemini_response,
#         'steps': detailed_responses
#     })





@app.route('/api/flowchart', methods=['POST'])
def roadmap():
    data = request.json
    user_question = data.get('career_choice')
    user_experience = data.get('experience')
    steps = mainsteps(user_question, user_experience)

    step1e = elaborate(steps['Step 1'])
    step2e = elaborate(steps['Step 2'])
    step3e = elaborate(steps['Step 3'])
    step4e = elaborate(steps['Step 4'])
    step5e = elaborate(steps['Step 5'])

    tech = techstack(user_question)

    print(steps['Step 1'], step1e, steps['Step 2'], step2e,steps['Step 3'], step3e,steps['Step 4'], step4e, steps['Step 5'], step5e)
    return jsonify(step1=steps['Step 1'], step1e=step1e, step2=steps['Step 2'], step2e=step2e,step3=steps['Step 3'], step3e=step3e,step4=steps['Step 4'], step4e=step4e, step5=steps['Step 5'], step5e=step5e, tech = tech)



def elaborate(step_title):
    response2 = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f"Based on this step: {step_title}, elaborate on how to achieve this step in paragraph. Keep it short and precise."},
        
    ]
    )


    return response2.choices[0].message.content


def mainsteps(user_question, user_experience):
    response = client.chat.completions.create(
    model="gpt-3.5-turbo-0125",
    response_format={ "type": "json_object" },
    messages=[
        {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
        {"role": "system", "content": "Always follow this format (Step 1: first step, Step 2: second step, )"},
        {"role": "user", "content": f"Assume the user is a Computer Engineering student, the user is going to provide you with their career "
                f"goals, prepare a roadmap to help the user achieve their goals in 5 steps. Only give titles of each step, do not give "
                f"any further details. {user_question} This is the user's level of experience: {user_experience}."}
    ]
    )

    answer = response.choices[0].message.content

    json_data = json.loads(answer)

    return json_data


def techstack(role):
    response3 = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f"Based on this role: {role}, give Techstack for the role."},
        
    ]
    )

    return response3.choices[0].message.content








#mcq done

@app.route('/getmcq/', methods=['POST'])
def mcq():
    try:
        # Retrieving data from the form
        topic = request.form.get('topic')
        number = int(request.form.get('number'))

        if number <= 0:
            return jsonify({"message": "Invalid number of questions, please enter number greater than 0"}), 500

        # Assuming get_mcq is a function that retrieves MCQ data
        result = get_mcq(topic, number)
        data = json.loads(result)

        formatted = []
        for question_ob in data:
            question = question_ob["question"]
            answer = question_ob["answer"]
            options = [question_ob["option1"], question_ob["option2"], question_ob["option3"]]
            formatted_question = {
                "question": question,
                "answer": answer,
                "options": options
            }
            formatted.append(formatted_question)

        return jsonify(formatted), 200

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"success": False, "message": "Can't generate these many MCQs"}), 500



def get_mcq(topic, number):
    # docs = vectorstore.similarity_search(topic)
    client = OpenAI(api_key=OPENAI_API_KEY)
    questions = []
    for i in range(0, number, 1):
        response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_format={ "type": "json_object" },
        messages=[
            {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
            {"role": "system", "content": "Always follow this format (questions : Question generated, answer : correct answer, option1: wrong option , option2 : wrong option, option3: wrong options).\n"},
            {"role": "user", "content": f"{topic}\n Generate one mcq questions from the above topic. Don't repeat these questions: \n{questions}\n Keep in mind that the generated options should not be more than 15 words. The difficulty of questions hould be moderate."}
        ]
        )
        questions.append(response.choices[0].message.content)  
    print(questions)
    json_responses = [json.loads(response) for response in questions]
    fin2 = json.dumps(json_responses, indent=4)
    parsed_json = json.loads(fin2)
    minimized_json_string = json.dumps(parsed_json, separators=(',', ':'))
    print(minimized_json_string)
    return minimized_json_string                 



# resume done

def get_gemini_response(input):
    # Assuming genai.GenerativeModel and related configurations are correctly set up
    model = genai.GenerativeModel('gemini-1.5-flash',
                              generation_config={"response_mime_type": "application/json"})
    response = model.generate_content(input)
    return response.text

def input_pdf_text(uploaded_file):
    reader = pdf.PdfReader(uploaded_file)
    text = ""
    for page in range(len(reader.pages)):
        page = reader.pages[page]
        text += str(page.extract_text())
    return text

# Prompt Template (assuming it's defined as before)
input_prompt="""
Hey Act Like a skilled or very experience ATS(Application Tracking System)
with a deep understanding of tech field,software engineering,data science ,data analyst
and big data engineer. Your task is to evaluate the resume based on the given job description.
You must consider the job market is very competitive and you should provide 
best assistance for improving thr resumes. Assign the percentage Matching based 
on Jd and
the missing keywords with high accuracy
resume:{text}
description:{jd}

I want the response Using this JSON schema:
response = ("JD Match":percentage score ,"Missing Keywords:[]","Profile Summary": summary)

"""



jd_prompt="""
Hey Act Like a skilled or very experience ATS(Application Tracking System)
with a deep understanding of tech field,software engineering,data science ,data analyst
and big data engineer. Your task is to evaluate the resume based on the given job description.
You must consider the job market is very competitive and you should provide 
best assistance for improving thr resumes. Assign the percentage Matching based 
on Jd and
the missing keywords with high accuracy
resume:{text}
description:{jd}

I want the response Using this JSON schema:
response = ("JD Match":percentage score)

"""


missing_prompt="""
Hey Act Like a skilled or very experience ATS(Application Tracking System)
with a deep understanding of tech field,software engineering,data science ,data analyst
and big data engineer. Your task is to evaluate the resume based on the given job description.
You must consider the job market is very competitive and you should provide 
best assistance for improving thr resumes. Find
the missing keywords with high accuracy
resume:{text}
description:{jd}

I want the response Using this JSON schema:
response = ("Missing Keywords:[]")

"""


summary_prompt="""
Hey Act Like a skilled or very experience ATS(Application Tracking System)
with a deep understanding of tech field,software engineering,data science ,data analyst
and big data engineer. Your task is to evaluate the resume based on the given job description.
You must consider the job market is very competitive and you should provide 
best assistance for improving the resumes. Give Profile Summary
resume:{text}
description:{jd}

I want the response Using this JSON schema:
response = ("Profile Summary": summary)

"""

def JD_Score(jd, text):
    input_text = jd_prompt.replace('{text}', text).replace('{jd}', jd)
    response = get_gemini_response(input_text)
    # print(response)

    return response

def Missing(jd, text):
    input_text = missing_prompt.replace('{text}', text).replace('{jd}', jd)
    response = get_gemini_response(input_text)
    # print(response)

    return response


def Summary(jd, text):
    input_text = summary_prompt.replace('{text}', text).replace('{jd}', jd)
    response = get_gemini_response(input_text)
    # print(response)

    return response



@app.route('/resume', methods=['POST'])
def index():
    jd = request.form['jd']
    uploaded_file = request.files['uploaded_file']
    text = input_pdf_text(uploaded_file)
    input_text = input_prompt.replace('{text}', text).replace('{jd}', jd)

    
    jds = JD_Score(jd, text)
    print("jd ===>", jds)

    missing = Missing(jd, text)
    print("missing ==>", missing)

    summary = Summary(jd, text)
    print("summary ==>", summary)

    jdsnew = remove_brackets(jds)
    missingnew = remove_brackets(missing)
    summarynew = remove_brackets(summary)

    print("new ===>",jdsnew, missingnew, summarynew)
    return jsonify(jds=jdsnew, missing=missingnew, summary=summarynew)

def remove_brackets(input_string):
    return re.sub(r'[{}"]', '', input_string)



if __name__ == "__main__":
    app.run(debug=True)
