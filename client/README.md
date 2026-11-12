# Forme – AI Interview Preparation Platform

### Your Personal AI-Powered Interview Preparation Assistant

Forme AI Interview Prep is an intelligent, AI-powered interview preparation platform designed to help job seekers prepare for technical and non-technical interviews.

The platform analyzes a candidate's resume, self-description, and target job description to generate personalized interview preparation reports using Google Gemini AI.

It helps candidates understand their strengths, identify skill gaps, evaluate their job-role compatibility, and prepare effectively for upcoming interviews.

---

## Table of Contents

1. About the Project
2. Problem Statement
3. Project Objectives
4. Key Features
5. How It Works
6. AI Integration
7. Technologies Used
8. Project Architecture
9. Project Workflow
10. AI-Generated Report
11. Installation and Setup
12. Environment Variables
13. API Integration
14. Project Structure
15. Screenshots
16. Security
17. Future Enhancements
18. Advantages
19. Limitations
20. Author
21. License

---

## 1. About the Project

Forme AI Interview Prep is a web-based application that uses Artificial Intelligence to make interview preparation smarter, easier, and more personalized.

Traditional interview preparation often requires candidates to search for questions manually, understand job requirements, and identify their technical weaknesses.

Forme simplifies this process by using AI to analyze candidate information and generate a personalized interview preparation strategy.

Users provide:

- Resume
- Self Description
- Target Job Description

The system processes this information using Google Gemini AI and generates a structured interview preparation report.

---

## 2. Problem Statement

Many students and job seekers face difficulties preparing for interviews because:

- They do not know which questions are relevant to their target job.
- They struggle to identify missing technical skills.
- They cannot properly evaluate their resume against job requirements.
- They lack a personalized interview preparation roadmap.
- They spend considerable time searching for interview questions.

**Proposed Solution:**

Forme AI Interview Prep provides an AI-powered solution that analyzes candidate profiles and generates personalized interview questions, skill-gap analysis, job compatibility scores, and preparation plans.

---

## 3. Project Objectives

- Automate interview preparation using Artificial Intelligence.
- Analyze resumes and job descriptions.
- Generate personalized technical interview questions.
- Generate behavioral interview questions.
- Identify missing skills and knowledge gaps.
- Calculate a job-role matching score.
- Provide structured interview preparation roadmaps.
- Help candidates improve their interview confidence.

---

## 4. Key Features

### 1. AI Resume Analysis
- Analyze candidate resume information.
- Understand technical skills and qualifications.
- Identify relevant experience and strengths.

### 2. Job Description Analysis
- Analyze the target job description.
- Identify required technical skills.
- Understand job responsibilities and expectations.

### 3. AI-Powered Interview Questions
Generate personalized interview questions based on candidate information.

Includes:
- Technical Interview Questions
- Behavioral Interview Questions
- Job-Specific Questions

### 4. Resume and Job Matching Score
- Compare candidate skills with job requirements.
- Generate a compatibility score.
- Help candidates understand their suitability for the target role.

### 5. Skill Gap Analysis
Identify missing or insufficient skills based on the target job description.

Skill gaps are categorized according to severity:

- High
- Medium
- Low

### 6. Personalized Preparation Roadmap
Generate a structured preparation plan based on identified skill gaps and job requirements.

### 7. AI-Powered Report Generation
Generate a structured report containing:

- Job Match Score
- Technical Questions
- Behavioral Questions
- Skill Gap Analysis
- Personalized Preparation Plan

---

## ⚙️ 5. How It Works

The application follows a simple workflow:

**Step 1:** User provides their resume.

**Step 2:** User enters their self-description.

**Step 3:** User provides the target job description.

**Step 4:** Backend receives and processes the information.

**Step 5:** Google Gemini AI analyzes the provided information.

**Step 6:** AI generates a structured interview preparation report.

**Step 7:** Backend returns the generated report to the frontend.

**Step 8:** User reviews the personalized preparation report.

---

## 6. AI Integration

Forme uses Google Gemini AI to generate intelligent and personalized interview preparation reports.

### AI Model

- AI Provider: Google
- AI Model: Gemini 2.5 Flash
- SDK: @google/genai
- Backend Language: JavaScript
- Data Validation: Zod

### AI Input

The AI model receives three main inputs:

1. Resume
2. Self Description
3. Job Description

### AI Output

The AI generates structured JSON containing:

```json
{
  "matchScore": 85,
  "technicalQuestions": [],
  "behavioralQuestions": [],
  "skillGaps": [],
  "preprationPlan": []
}
```

The output is validated using Zod to maintain a structured response format.

---

## 7. Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express.js
- JavaScript
- CommonJS

### Artificial Intelligence
- Google Gemini AI
- @google/genai
- Gemini 2.5 Flash
- Zod

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Postman
- npm

### Database
- MongoDb.

---

## 8. Project Architecture

The application follows a client-server architecture.

**Frontend Layer**
- Collects candidate information.
- Sends requests to backend APIs.
- Displays AI-generated reports.

**Backend Layer**
- Handles API requests.
- Validates user input.
- Communicates with Google Gemini AI.
- Processes and returns AI-generated reports.

**AI Layer**
- Analyzes candidate information.
- Generates interview questions.
- Identifies skill gaps.
- Creates preparation plans.

### Architecture Flow

```text
          USER
            |
            |
       REACT FRONTEND
            |
            |
       AXIOS REQUEST
            |
            |
      NODE.JS + EXPRESS
            |
            |
       INPUT VALIDATION
            |
            |
       GOOGLE GEMINI AI
            |
            |
      AI REPORT GENERATION
            |
            |
       STRUCTURED JSON
            |
            |
       BACKEND RESPONSE
            |
            |
       REACT FRONTEND
            |
            |
       DISPLAY AI REPORT
```

---

## 9. Project Structure

Suggested project organization:

```text
forme-ai-interview-prep/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   └── interview/
│   │   │
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── app.routes.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   │
│   │   └── app.js
│   │
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

*Note: Adjust the folder structure according to your actual implementation.*

---

## 10. Installation and Setup

Follow these instructions to run the project locally.

### Prerequisites

Install the following:

- Node.js
- npm
- Git
- Visual Studio Code
- Google Gemini API Key

### Step 1: Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/forme-ai-interview-prep.git
```

### Step 2: Navigate to Project

```bash
cd forme-ai-interview-prep
```

### Step 3: Install Frontend Dependencies

```bash
cd client
npm install
```

### Step 4: Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

### Step 5: Configure Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=3000
GOOGLE_API_KEY=your_google_gemini_api_key
```

Add any additional environment variables required by your implementation.

### Step 6: Start Backend Server

```bash
cd server
npm start
```

### Step 7: Start Frontend Application

```bash
cd client
npm run dev
```

### Step 8: Open Application

Open the local URL displayed by Vite in your browser.

---

## 11. Environment Variables

The application uses environment variables to protect sensitive configuration information.

| Variable | Description |
|---|---|
| PORT | Backend server port |
| GOOGLE_API_KEY | Google Gemini API key |

**Important Security Instructions:**

- Never upload your actual `.env` file to GitHub.
- Never expose your Gemini API key in frontend code.
- Add `.env` to `.gitignore`.
- Use `.env.example` to document required environment variables.

---

## 12. API Integration

The backend provides an API layer for communication between the frontend and AI services.

The AI service accepts:

| Parameter | Description |
|---|---|
| Resume | Candidate resume information |
| Self Description | Candidate introduction and skills |
| Job Description | Target job requirements |

The service processes these inputs and generates a structured interview preparation report.

*Add your actual API endpoints, HTTP methods, and request examples here.*

---

## 13. AI-Generated Report

The generated report contains the following sections:

### Match Score
Provides a numerical indication of how closely the candidate profile matches the target job description.

### Technical Questions
Provides relevant technical questions based on the candidate's skills and job requirements.

### Behavioral Questions
Provides questions related to communication, teamwork, leadership, and problem-solving.

### Skill Gaps
Identifies missing skills and categorizes them according to their severity.

### Preparation Plan
Provides a personalized roadmap to help candidates prepare for the target job role.

---

## 14. Screenshots

Add your actual project screenshots here.

Recommended screenshots:

1. Home Page
2. Login / Registration Page
3. Resume Input Section
4. Self Description Section
5. Job Description Section
6. AI Interview Report
7. Technical Questions Section
8. Skill Gap Analysis
9. Preparation Roadmap

Example:

```markdown
## Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Interview Preparation
![Interview Preparation](screenshots/interview.png)

### AI Generated Report
![AI Report](screenshots/report.png)
```

---

## 15. Security

Security is an important part of the application.

- API keys are stored using environment variables.
- Backend validation helps prevent invalid input.
- AI responses are validated using Zod.
- Sensitive configuration files should not be committed to GitHub.
- Gemini API calls are handled through the backend.

Additional security measures should be implemented according to deployment requirements.

---

## 16. Future Enhancements

The following features can be added in future versions:

- AI-powered mock interview sessions.
- Voice-based interview practice.
- Real-time speech recognition.
- AI evaluation of interview answers.
- Resume PDF upload and automatic parsing.
- Downloadable interview preparation reports.
- Interview performance tracking.
- Personalized learning recommendations.
- Multiple language support.
- Interview history and progress dashboard.
- Job recommendations based on candidate profiles.

---

## 17. Advantages

- Saves interview preparation time.
- Provides personalized interview questions.
- Helps identify technical weaknesses.
- Improves job-role preparation.
- Offers structured learning guidance.
- Uses modern Artificial Intelligence technology.
- Provides an organized interview preparation experience.

---


## 18. Author

**Atharv Shete**

Information Technology Student

Amrutvahini College of Engineering, Sangamner

### Technical Interests
- Full Stack Web Development
- Artificial Intelligence and Machine Learning
- React.js
- Node.js
- Python
- Software Development

### Connect With Me

- GitHub:https://github.com/atharvshete-07 .

---



**Forme – Prepare Smart. Practice Better. Perform Confidently.**
