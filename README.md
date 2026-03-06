
# MediFlow ⚕️
### Smart Hospital Triage & Patient Management System


AI-powered triage • Real-time queue management • Multilingual support • SOS emergency alerts • PDF discharge summaries

</div>

---

# 📋 Overview

**MediFlow** is an AI-powered hospital triage and patient management system designed to improve patient flow and emergency response in healthcare environments.

Traditional hospitals often rely on manual intake systems that slow down patient prioritization. MediFlow replaces this with an AI-assisted digital triage system that evaluates symptoms, assigns priority levels, and routes patients efficiently to medical staff.

### Workflow

Patient reports symptoms  
↓  
AI triage analysis  
↓  
Priority queue generation  
↓  
Nurse records vitals  
↓  
Doctor diagnosis & prescription  
↓  
AI generates discharge summary

This ensures **critical patients receive immediate care while maintaining fairness in waiting queues**.

---

# ✨ Key Features

## 🤖 AI-Powered Triage

MediFlow integrates an AI-based triage engine that:

- Analyzes patient symptoms
- Considers pain level and duration
- Evaluates known diseases or comorbidities
- Assigns risk score (0–100)
- Determines triage category

### Triage Levels

| Level | Priority | Max Wait Time |
|------|---------|---------------|
| 🔴 RED | Immediate | 5 minutes |
| 🟠 ORANGE | Very Urgent | 15 minutes |
| 🟡 YELLOW | Moderate | 30 minutes |
| 🟢 GREEN | Non-Urgent | 60 minutes |

---

## 🏥 Multi-Role System

The platform supports **three main user roles**.

### Patient
- Report symptoms
- View AI triage results
- Track queue position
- Upload medical files
- Trigger emergency SOS

### Nurse / Staff
- View live patient queue
- Confirm patient arrival
- Record vital signs
- Upload patient reports
- Monitor critical alerts

### Doctor
- View assigned patients
- Analyze AI recommendations
- Write diagnosis & prescriptions
- Generate discharge summaries
- Access patient history

---

## 📊 Smart Queue System

Patient priority is calculated using both medical urgency and waiting time.

Effective Priority = Risk Score + (Wait Time in Minutes ÷ 5)

Queue behavior:

• Critical patients always appear first  
• Waiting time gradually increases priority  
• Prevents long wait times for lower-risk patients  

---

## 🌍 Multilingual Support

The system supports multiple languages including:

- English 🇬🇧
- Hindi 🇮🇳
- Tamil 🇮🇳
- French 🇫🇷

New languages can be added easily through translation configuration.

---

## 🚨 SOS Emergency System

Patients can trigger an emergency alert using the SOS feature.

When activated:

• Patient triage automatically becomes RED  
• Risk score is set to 100  
• Staff receive instant alerts  
• Patient moves to top of queue  

---

## 📁 File Management

Patients and staff can upload medical documents such as:

- Lab reports
- X-ray scans
- Prescriptions
- Medical records

Files are tagged with:

- Upload time
- File type
- Uploader role
- Patient reference

---

## 🔔 Notification System

MediFlow includes an in-app notification system for:

• New patient assignments  
• Critical vital signs  
• SOS alerts  
• Prescription updates  

Notifications refresh automatically to keep staff informed in real time.

---

## 📄 PDF Discharge Summaries

Doctors can generate a full discharge summary including:

- Patient information
- Diagnosis
- Medication instructions
- Follow-up details
- AI generated medical summary

Documents are downloadable as **PDF files**.

---

# 🧰 Technology Stack

| Layer | Technology |
|------|------------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| AI | Google Gemini API |
| Authentication | bcryptjs |
| File Uploads | Multer |
| PDF Generation | PDFKit |

---

