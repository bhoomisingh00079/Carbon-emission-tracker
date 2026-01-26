# 🌍 Carbon Emission Tracker

A **web-based carbon emission tracker** built to help users measure and monitor their personal carbon footprints from daily activities, visualize progress, and gain actionable tips to reduce emissions.

This project was built as a **hackathon MVP** using React, Firebase Auth, Firestore (future), and backend services — focused on rapid prototyping and real-world usability.

---

## 📌 Problem Statement

With climate change worsening, individuals need tools to understand and reduce their environmental impact. This platform enables users to:

- Log daily activity details (transport, electricity, food)
- Calculate carbon emissions from each activity
- Visualize emission breakdowns with interactive charts
- Track progress over time (daily, weekly, monthly)
- Get recommendations to reduce footprint
- Manage profiles and sessions via authentication

---

## 🧠 Key Features

### ✅ Authentication
- Login & logout powered by **Firebase Auth**
- User profile page showing email and session management

### 📊 Emission Tracking
- Users input daily activities:
  - Transport (km)
  - Electricity usage (kWh)
  - Food type (veg/non-veg)
- Emission estimates computed using standard emission coefficients

### 📈 Interactive Analytics
- Dashboard with pie charts for emission breakdown
- Analytics page showing emission trends over time
- History tracking enabling weekly/monthly aggregation (with Firestore backend)

### 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| UI Visualization | Chart.js + react-chartjs-2 |
| Routing | react-router-dom |
| Auth | Firebase Authentication |
| Backend API | Node.js + Express (future) |
| Database | Firestore (future per-user storage) |

---

## 📦 Getting Started (Frontend)

1. Clone repository
bash
git clone https://github.com/bhoomisingh00079/Carbon-emission-tracker.git
cd Carbon-emission-tracker

2. Install dependencies

Copy code
bash
npm install
3. Start development server
Copy code
Bash
npm run dev
4. Visit in browser
Open at: http://localhost:5173/

🧪 Usage
Register / Login using Firebase credentials
Navigate dashboard to input daily activities
View breakdown charts and analytics
Go to Profile to view user email and logout

## 🔮 Future Scope

- **AI-Powered Recommendation Chatbot**  
  A conversational chatbot can be integrated into the Recommendations page to analyze user activity data and provide personalized, interactive suggestions for reducing carbon emissions.

- **UI / UX Enhancements**  
  The user interface can be further improved with a modern, responsive design, better visual hierarchy, and accessibility-focused enhancements to improve overall user experience.

- **Location-Based Alerts & Reminders**  
  Location-aware features can be added to send smart reminders, emission alerts, and eco-friendly transport suggestions based on user movement and regional context.

