import { useState, useEffect, useRef } from "react";

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const LANGS = {
  en: {
    name: "English", flag: "🇬🇧",
    appTitle: "MediFlow",
    appSubtitle: "Smart Patient Intake & Triage System",
    selectRole: "Select Your Role",
    patient: "Patient", nurse: "Nurse / Staff", doctor: "Doctor",
    login: "Login", register: "Register", logout: "Logout",
    email: "Email", password: "Password", name: "Full Name",
    age: "Age", gender: "Gender", male: "Male", female: "Female", other: "Other",
    contact: "Contact Number", knownDiseases: "Known Diseases / Conditions",
    createAccount: "Create Account", alreadyHave: "Already have an account?",
    dontHave: "Don't have an account?",
    dashboard: "Dashboard", myProfile: "My Profile", reportSymptoms: "Report Symptoms",
    medicalHistory: "Medical History", myFiles: "My Files", uploadFile: "Upload File",
    symptoms: "Symptoms", duration: "Duration of Illness", painLevel: "Pain Level",
    notes: "Additional Notes", submit: "Submit", submitSymptoms: "Submit Symptoms",
    aiAnalysis: "AI Analysis", triageLevel: "Triage Level", urgency: "Urgency",
    category: "Category", riskScore: "Risk Score",
    queuePosition: "Queue Position", waitTime: "Wait Time",
    patientQueue: "Patient Queue", vitals: "Vitals", recordVitals: "Record Vitals",
    bp: "Blood Pressure", hr: "Heart Rate", spo2: "SpO2", temp: "Temperature", weight: "Weight",
    confirmArrival: "Confirm Arrival", arrived: "Arrived",
    alert: "ALERT", critical: "CRITICAL",
    myPatients: "My Patients", patientDetails: "Patient Details",
    diagnosis: "Diagnosis Notes", prescription: "Prescription",
    medication: "Medication & Dosage", followUp: "Follow-up Date",
    savePrescription: "Save Prescription", addFile: "Add File",
    fileUploaded: "File uploaded successfully",
    noPatients: "No patients in queue",
    priority: "Priority", high: "High", medium: "Medium", low: "Low",
    waiting: "Waiting", inProgress: "In Progress", completed: "Completed",
    minutes: "min", hours: "hr",
    selectSpecialization: "Specialization", department: "Department",
    experience: "Years of Experience",
    welcomeBack: "Welcome back",
    triageRed: "RED – Immediate", triageOrange: "ORANGE – Very Urgent",
    triageYellow: "YELLOW – Moderate", triageGreen: "GREEN – Non-urgent",
    uploadPatientFile: "Upload Patient File",
    fileType: "File Type", labReport: "Lab Report", xray: "X-Ray",
    prescription_file: "Prescription", other_file: "Other",
    close: "Close", view: "View", download: "Download",
    staffAddFile: "Staff: Add File to Patient",
    selectPatient: "Select Patient",
    minutesAgo: "min ago",
    threshold: "Max Safe Wait", exceeded: "⚠ Wait Exceeded!",
    mins: "mins",
    doctorAssigned: "Assigned Doctor",
    allPatients: "All Patients",
    search: "Search patients...",
    language: "Language",
  },
  hi: {
    name: "हिंदी", flag: "🇮🇳",
    appTitle: "मेडीफ्लो",
    appSubtitle: "स्मार्ट रोगी सेवन और ट्राइएज प्रणाली",
    selectRole: "अपनी भूमिका चुनें",
    patient: "रोगी", nurse: "नर्स / स्टाफ", doctor: "डॉक्टर",
    login: "लॉगिन", register: "रजिस्टर", logout: "लॉगआउट",
    email: "ईमेल", password: "पासवर्ड", name: "पूरा नाम",
    age: "उम्र", gender: "लिंग", male: "पुरुष", female: "महिला", other: "अन्य",
    contact: "संपर्क नंबर", knownDiseases: "ज्ञात रोग / स्थितियाँ",
    createAccount: "खाता बनाएं", alreadyHave: "पहले से खाता है?",
    dontHave: "खाता नहीं है?",
    dashboard: "डैशबोर्ड", myProfile: "मेरी प्रोफाइल", reportSymptoms: "लक्षण बताएं",
    medicalHistory: "चिकित्सा इतिहास", myFiles: "मेरी फाइलें", uploadFile: "फाइल अपलोड करें",
    symptoms: "लक्षण", duration: "बीमारी की अवधि", painLevel: "दर्द का स्तर",
    notes: "अतिरिक्त नोट्स", submit: "जमा करें", submitSymptoms: "लक्षण जमा करें",
    aiAnalysis: "AI विश्लेषण", triageLevel: "ट्राइएज स्तर", urgency: "तात्कालिकता",
    category: "श्रेणी", riskScore: "जोखिम स्कोर",
    queuePosition: "कतार में स्थान", waitTime: "प्रतीक्षा समय",
    patientQueue: "रोगी कतार", vitals: "महत्वपूर्ण संकेत", recordVitals: "संकेत दर्ज करें",
    bp: "रक्तचाप", hr: "हृदय गति", spo2: "ऑक्सीजन", temp: "तापमान", weight: "वजन",
    confirmArrival: "आगमन की पुष्टि करें", arrived: "पहुँच गए",
    alert: "चेतावनी", critical: "गंभीर",
    myPatients: "मेरे मरीज", patientDetails: "मरीज का विवरण",
    diagnosis: "निदान नोट्स", prescription: "नुस्खा",
    medication: "दवा और खुराक", followUp: "फॉलो-अप तारीख",
    savePrescription: "नुस्खा सहेजें", addFile: "फाइल जोड़ें",
    fileUploaded: "फाइल सफलतापूर्वक अपलोड हुई",
    noPatients: "कतार में कोई मरीज नहीं",
    priority: "प्राथमिकता", high: "उच्च", medium: "मध्यम", low: "कम",
    waiting: "प्रतीक्षारत", inProgress: "जारी", completed: "पूर्ण",
    minutes: "मिनट", hours: "घंटे",
    selectSpecialization: "विशेषज्ञता", department: "विभाग",
    experience: "अनुभव (वर्ष)",
    welcomeBack: "वापस स्वागत है",
    triageRed: "लाल – तत्काल", triageOrange: "नारंगी – बहुत जरूरी",
    triageYellow: "पीला – मध्यम", triageGreen: "हरा – सामान्य",
    uploadPatientFile: "रोगी फाइल अपलोड करें",
    fileType: "फाइल प्रकार", labReport: "लैब रिपोर्ट", xray: "एक्स-रे",
    prescription_file: "नुस्खा", other_file: "अन्य",
    close: "बंद करें", view: "देखें", download: "डाउनलोड",
    staffAddFile: "स्टाफ: मरीज की फाइल जोड़ें",
    selectPatient: "मरीज चुनें",
    minutesAgo: "मिनट पहले",
    threshold: "अधिकतम सुरक्षित प्रतीक्षा", exceeded: "⚠ समय सीमा पार!",
    mins: "मिनट",
    doctorAssigned: "नियुक्त डॉक्टर",
    allPatients: "सभी मरीज",
    search: "मरीज खोजें...",
    language: "भाषा",
  },
  ta: {
    name: "தமிழ்", flag: "🇮🇳",
    appTitle: "மெடிஃப்ளோ",
    appSubtitle: "ஸ்மார்ட் நோயாளி உட்கொள்ளல் மற்றும் ட்ரையேஜ் அமைப்பு",
    selectRole: "உங்கள் பாத்திரத்தைத் தேர்ந்தெடுக்கவும்",
    patient: "நோயாளி", nurse: "நர்ஸ் / பணியாளர்", doctor: "மருத்துவர்",
    login: "உள்நுழைய", register: "பதிவு செய்ய", logout: "வெளியேற",
    email: "மின்னஞ்சல்", password: "கடவுச்சொல்", name: "முழு பெயர்",
    age: "வயது", gender: "பாலினம்", male: "ஆண்", female: "பெண்", other: "மற்றவை",
    contact: "தொடர்பு எண்", knownDiseases: "அறியப்பட்ட நோய்கள்",
    createAccount: "கணக்கை உருவாக்கு", alreadyHave: "ஏற்கனவே கணக்கு உள்ளதா?",
    dontHave: "கணக்கு இல்லையா?",
    dashboard: "டாஷ்போர்டு", myProfile: "என் சுயவிவரம்", reportSymptoms: "அறிகுறிகளைப் புகாரளி",
    medicalHistory: "மருத்துவ வரலாறு", myFiles: "என் கோப்புகள்", uploadFile: "கோப்பை பதிவேற்று",
    symptoms: "அறிகுறிகள்", duration: "நோய்இன் காலம்", painLevel: "வலி அளவு",
    notes: "கூடுதல் குறிப்புகள்", submit: "சமர்ப்பி", submitSymptoms: "அறிகுறிகளை சமர்ப்பி",
    aiAnalysis: "AI பகுப்பாய்வு", triageLevel: "ட்ரையேஜ் நிலை", urgency: "அவசரம்",
    category: "வகை", riskScore: "ஆபத்து மதிப்பெண்",
    queuePosition: "வரிசை நிலை", waitTime: "காத்திருக்கும் நேரம்",
    patientQueue: "நோயாளி வரிசை", vitals: "உயிர் அறிகுறிகள்", recordVitals: "உயிர் அறிகுறிகளை பதிவு செய்",
    bp: "இரத்த அழுத்தம்", hr: "இதய துடிப்பு", spo2: "ஆக்சிஜன்", temp: "வெப்பநிலை", weight: "எடை",
    confirmArrival: "வருகையை உறுதிப்படுத்து", arrived: "வந்தது",
    alert: "எச்சரிக்கை", critical: "மிகவும் தீவிரம்",
    myPatients: "என் நோயாளிகள்", patientDetails: "நோயாளி விவரங்கள்",
    diagnosis: "நோய் கண்டறிதல் குறிப்புகள்", prescription: "மருந்துச் சீட்டு",
    medication: "மருந்து மற்றும் அளவு", followUp: "பின்தொடர் தேதி",
    savePrescription: "மருந்துச் சீட்டை சேமி", addFile: "கோப்பைச் சேர்",
    fileUploaded: "கோப்பு வெற்றிகரமாக பதிவேற்றப்பட்டது",
    noPatients: "வரிசையில் நோயாளிகள் இல்லை",
    priority: "முன்னுரிமை", high: "அதிக", medium: "நடுத்தர", low: "குறைந்த",
    waiting: "காத்திருக்கிறார்", inProgress: "நடைமுறையில்", completed: "முடிந்தது",
    minutes: "நிமிடம்", hours: "மணி",
    selectSpecialization: "நிபுணத்துவம்", department: "துறை",
    experience: "அனுபவம் (ஆண்டுகள்)",
    welcomeBack: "மீண்டும் வரவேற்கிறோம்",
    triageRed: "சிவப்பு – உடனடி", triageOrange: "ஆரஞ்சு – மிகவும் அவசரம்",
    triageYellow: "மஞ்சள் – மிதமான", triageGreen: "பச்சை – அவசரமில்லை",
    uploadPatientFile: "நோயாளி கோப்பை பதிவேற்று",
    fileType: "கோப்பு வகை", labReport: "ஆய்வக அறிக்கை", xray: "எக்ஸ்-ரே",
    prescription_file: "மருந்துச் சீட்டு", other_file: "மற்றவை",
    close: "மூடு", view: "பார்", download: "பதிவிறக்கு",
    staffAddFile: "பணியாளர்: நோயாளி கோப்பைச் சேர்",
    selectPatient: "நோயாளியைத் தேர்ந்தெடு",
    minutesAgo: "நிமிடங்களுக்கு முன்பு",
    threshold: "அதிகபட்ச காத்திருப்பு", exceeded: "⚠ காத்திருப்பு தாண்டியது!",
    mins: "நிமிடங்கள்",
    doctorAssigned: "நியமிக்கப்பட்ட மருத்துவர்",
    allPatients: "அனைத்து நோயாளிகள்",
    search: "நோயாளிகளை தேடு...",
    language: "மொழி",
  },
  ar: {
    name: "العربية", flag: "🇸🇦",
    appTitle: "ميدي فلو",
    appSubtitle: "نظام الفرز الذكي للمرضى",
    selectRole: "اختر دورك",
    patient: "مريض", nurse: "ممرض / موظف", doctor: "طبيب",
    login: "تسجيل الدخول", register: "تسجيل", logout: "تسجيل الخروج",
    email: "البريد الإلكتروني", password: "كلمة المرور", name: "الاسم الكامل",
    age: "العمر", gender: "الجنس", male: "ذكر", female: "أنثى", other: "آخر",
    contact: "رقم الاتصال", knownDiseases: "الأمراض المعروفة",
    createAccount: "إنشاء حساب", alreadyHave: "هل لديك حساب؟",
    dontHave: "ليس لديك حساب؟",
    dashboard: "لوحة التحكم", myProfile: "ملفي الشخصي", reportSymptoms: "الإبلاغ عن الأعراض",
    medicalHistory: "التاريخ الطبي", myFiles: "ملفاتي", uploadFile: "رفع ملف",
    symptoms: "الأعراض", duration: "مدة المرض", painLevel: "مستوى الألم",
    notes: "ملاحظات إضافية", submit: "إرسال", submitSymptoms: "إرسال الأعراض",
    aiAnalysis: "تحليل الذكاء الاصطناعي", triageLevel: "مستوى الفرز", urgency: "الإلحاح",
    category: "الفئة", riskScore: "درجة الخطر",
    queuePosition: "موضع في الطابور", waitTime: "وقت الانتظار",
    patientQueue: "طابور المرضى", vitals: "العلامات الحيوية", recordVitals: "تسجيل العلامات الحيوية",
    bp: "ضغط الدم", hr: "معدل ضربات القلب", spo2: "الأكسجين", temp: "درجة الحرارة", weight: "الوزن",
    confirmArrival: "تأكيد الوصول", arrived: "وصل",
    alert: "تنبيه", critical: "حرج",
    myPatients: "مرضاي", patientDetails: "تفاصيل المريض",
    diagnosis: "ملاحظات التشخيص", prescription: "الوصفة الطبية",
    medication: "الدواء والجرعة", followUp: "تاريخ المتابعة",
    savePrescription: "حفظ الوصفة", addFile: "إضافة ملف",
    fileUploaded: "تم رفع الملف بنجاح",
    noPatients: "لا يوجد مرضى في الطابور",
    priority: "الأولوية", high: "عالية", medium: "متوسطة", low: "منخفضة",
    waiting: "انتظار", inProgress: "جارٍ", completed: "مكتمل",
    minutes: "دقيقة", hours: "ساعة",
    selectSpecialization: "التخصص", department: "القسم",
    experience: "سنوات الخبرة",
    welcomeBack: "مرحباً بعودتك",
    triageRed: "أحمر – فوري", triageOrange: "برتقالي – عاجل جداً",
    triageYellow: "أصفر – معتدل", triageGreen: "أخضر – غير عاجل",
    uploadPatientFile: "رفع ملف المريض",
    fileType: "نوع الملف", labReport: "تقرير المختبر", xray: "أشعة سينية",
    prescription_file: "وصفة طبية", other_file: "أخرى",
    close: "إغلاق", view: "عرض", download: "تنزيل",
    staffAddFile: "الموظف: إضافة ملف للمريض",
    selectPatient: "اختر المريض",
    minutesAgo: "دقيقة مضت",
    threshold: "الانتظار الآمن القصوى", exceeded: "⚠ تجاوز وقت الانتظار!",
    mins: "دقائق",
    doctorAssigned: "الطبيب المعين",
    allPatients: "جميع المرضى",
    search: "ابحث عن المرضى...",
    language: "اللغة",
  },
  fr: {
    name: "Français", flag: "🇫🇷",
    appTitle: "MédiFlow",
    appSubtitle: "Système intelligent de triage des patients",
    selectRole: "Sélectionnez votre rôle",
    patient: "Patient", nurse: "Infirmier / Personnel", doctor: "Médecin",
    login: "Connexion", register: "S'inscrire", logout: "Déconnexion",
    email: "Email", password: "Mot de passe", name: "Nom complet",
    age: "Âge", gender: "Genre", male: "Homme", female: "Femme", other: "Autre",
    contact: "Numéro de contact", knownDiseases: "Maladies connues",
    createAccount: "Créer un compte", alreadyHave: "Vous avez déjà un compte?",
    dontHave: "Pas encore de compte?",
    dashboard: "Tableau de bord", myProfile: "Mon profil", reportSymptoms: "Signaler des symptômes",
    medicalHistory: "Historique médical", myFiles: "Mes fichiers", uploadFile: "Télécharger un fichier",
    symptoms: "Symptômes", duration: "Durée de la maladie", painLevel: "Niveau de douleur",
    notes: "Notes supplémentaires", submit: "Soumettre", submitSymptoms: "Soumettre les symptômes",
    aiAnalysis: "Analyse IA", triageLevel: "Niveau de triage", urgency: "Urgence",
    category: "Catégorie", riskScore: "Score de risque",
    queuePosition: "Position dans la file", waitTime: "Temps d'attente",
    patientQueue: "File de patients", vitals: "Signes vitaux", recordVitals: "Enregistrer les signes vitaux",
    bp: "Tension artérielle", hr: "Fréquence cardiaque", spo2: "SpO2", temp: "Température", weight: "Poids",
    confirmArrival: "Confirmer l'arrivée", arrived: "Arrivé",
    alert: "ALERTE", critical: "CRITIQUE",
    myPatients: "Mes patients", patientDetails: "Détails du patient",
    diagnosis: "Notes de diagnostic", prescription: "Ordonnance",
    medication: "Médicament et posologie", followUp: "Date de suivi",
    savePrescription: "Sauvegarder l'ordonnance", addFile: "Ajouter un fichier",
    fileUploaded: "Fichier téléchargé avec succès",
    noPatients: "Aucun patient dans la file",
    priority: "Priorité", high: "Haute", medium: "Moyenne", low: "Basse",
    waiting: "En attente", inProgress: "En cours", completed: "Terminé",
    minutes: "min", hours: "h",
    selectSpecialization: "Spécialisation", department: "Département",
    experience: "Années d'expérience",
    welcomeBack: "Bon retour",
    triageRed: "ROUGE – Immédiat", triageOrange: "ORANGE – Très urgent",
    triageYellow: "JAUNE – Modéré", triageGreen: "VERT – Non urgent",
    uploadPatientFile: "Télécharger le fichier patient",
    fileType: "Type de fichier", labReport: "Rapport de labo", xray: "Radiographie",
    prescription_file: "Ordonnance", other_file: "Autre",
    close: "Fermer", view: "Voir", download: "Télécharger",
    staffAddFile: "Personnel : Ajouter un fichier patient",
    selectPatient: "Sélectionner un patient",
    minutesAgo: "min passées",
    threshold: "Attente max sûre", exceeded: "⚠ Attente dépassée!",
    mins: "mins",
    doctorAssigned: "Médecin assigné",
    allPatients: "Tous les patients",
    search: "Rechercher des patients...",
    language: "Langue",
  },
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const DOCTORS_DB = [
  { id: "d1", name: "Dr. Priya Kumar", dept: "Cardiology", specialization: "Cardiovascular", exp: 12, email: "priya@med.com", password: "pass123" },
  { id: "d2", name: "Dr. Raj Sharma", dept: "Orthopedics", specialization: "Musculoskeletal", exp: 8, email: "raj@med.com", password: "pass123" },
  { id: "d3", name: "Dr. Ali Hassan", dept: "General Medicine", specialization: "General", exp: 15, email: "ali@med.com", password: "pass123" },
  { id: "d4", name: "Dr. Sarah Lee", dept: "Neurology", specialization: "Neurological", exp: 10, email: "sarah@med.com", password: "pass123" },
];

const STAFF_DB = [
  { id: "s1", name: "Nurse Anjali", email: "anjali@med.com", password: "pass123" },
  { id: "s2", name: "Nurse Ravi", email: "ravi@med.com", password: "pass123" },
];

const SYMPTOM_CATEGORIES = {
  cardiovascular: ["chest pain", "chest pressure", "heart palpitation", "sweating", "shortness of breath", "left arm pain"],
  neurological: ["headache", "dizziness", "numbness", "tingling", "confusion", "vision changes", "fainting"],
  musculoskeletal: ["joint pain", "back pain", "muscle ache", "swelling", "fracture"],
  respiratory: ["cough", "breathing difficulty", "wheezing", "congestion"],
  general: ["fever", "fatigue", "nausea", "vomiting", "cold", "flu"],
};

const COMORBIDITY_RISK = { diabetes: 1.4, hypertension: 1.3, "heart disease": 1.6, asthma: 1.2, cancer: 1.5 };

// ─── AI ENGINE ────────────────────────────────────────────────────────────────
function aiTriage(symptoms, painLevel, duration, knownDiseases) {
  const sym = symptoms.toLowerCase();
  let category = "general";
  let baseScore = 20;

  for (const [cat, keywords] of Object.entries(SYMPTOM_CATEGORIES)) {
    if (keywords.some(k => sym.includes(k))) {
      category = cat;
      break;
    }
  }

  const catScores = { cardiovascular: 75, neurological: 65, respiratory: 55, musculoskeletal: 40, general: 25 };
  baseScore = catScores[category] || 25;
  baseScore += (painLevel / 10) * 20;

  let comorbidityBonus = 0;
  const diseases = (knownDiseases || "").toLowerCase();
  for (const [disease, mult] of Object.entries(COMORBIDITY_RISK)) {
    if (diseases.includes(disease)) comorbidityBonus += (mult - 1) * 20;
  }
  baseScore = Math.min(100, baseScore + comorbidityBonus);

  const durationMatch = duration.match(/\d+/);
  const durationNum = durationMatch ? parseInt(durationMatch[0]) : 1;
  if (duration.includes("hour") || duration.includes("hr")) baseScore = Math.min(100, baseScore + 5);
  if (duration.includes("day")) baseScore = Math.min(100, baseScore + 10);

  let triageLevel, triageColor, maxWait;
  if (baseScore >= 75) { triageLevel = "RED"; triageColor = "#ef4444"; maxWait = 5; }
  else if (baseScore >= 55) { triageLevel = "ORANGE"; triageColor = "#f97316"; maxWait = 10; }
  else if (baseScore >= 35) { triageLevel = "YELLOW"; triageColor = "#eab308"; maxWait = 30; }
  else { triageLevel = "GREEN"; triageColor = "#22c55e"; maxWait = 60; }

  const doctorMatch = category === "cardiovascular" ? "d1" : category === "musculoskeletal" ? "d2" : category === "neurological" ? "d4" : "d3";

  return {
    riskScore: Math.round(baseScore),
    category: category.charAt(0).toUpperCase() + category.slice(1),
    triageLevel,
    triageColor,
    maxWait,
    assignedDoctor: doctorMatch,
    summary: `${category.charAt(0).toUpperCase() + category.slice(1)} symptoms with pain ${painLevel}/10 for ${duration}`,
  };
}

function calcPriorityScore(patient) {
  const waitMins = Math.floor((Date.now() - patient.queuedAt) / 60000);
  return patient.riskScore + Math.min(waitMins * 0.5, 25);
}

// ─── GLOBAL STATE ─────────────────────────────────────────────────────────────
let globalPatients = [];
let globalFiles = {};
let globalPrescriptions = {};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const TRIAGE_COLORS = { RED: "#ef4444", ORANGE: "#f97316", YELLOW: "#eab308", GREEN: "#22c55e" };

function LanguageSwitcher({ lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{
        background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: "#fff",
        display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontFamily: "inherit"
      }}>
        {LANGS[lang].flag} {LANGS[lang].name} ▾
      </button>
      {open && (
        <div style={{
          position: "absolute", right: 0, top: "100%", marginTop: 4,
          background: "#1e293b", border: "1px solid #334155", borderRadius: 10,
          overflow: "hidden", zIndex: 100, minWidth: 140, boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
        }}>
          {Object.entries(LANGS).map(([code, l]) => (
            <button key={code} onClick={() => { setLang(code); setOpen(false); }} style={{
              display: "block", width: "100%", padding: "10px 16px", textAlign: "left",
              background: lang === code ? "#0ea5e9" : "transparent", border: "none",
              color: "#e2e8f0", cursor: "pointer", fontSize: 13, fontFamily: "inherit"
            }}>
              {l.flag} {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Header({ t, lang, setLang, user, role, onLogout, page, setPage }) {
  const navItems = role === "patient"
    ? [{ key: "dashboard", label: t.dashboard }, { key: "report", label: t.reportSymptoms }, { key: "history", label: t.medicalHistory }, { key: "files", label: t.myFiles }]
    : role === "nurse"
    ? [{ key: "dashboard", label: t.dashboard }, { key: "queue", label: t.patientQueue }, { key: "addfile", label: t.staffAddFile }]
    : [{ key: "dashboard", label: t.dashboard }, { key: "mypatients", label: t.myPatients }, { key: "allpatients", label: t.allPatients }];

  return (
    <header style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      padding: "0 24px", display: "flex", alignItems: "center", gap: 16,
      height: 64, position: "sticky", top: 0, zIndex: 50,
      boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 16 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
        }}>⚕</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>{t.appTitle}</div>
          <div style={{ color: "#94a3b8", fontSize: 10, letterSpacing: "0.5px" }}>
            {role === "patient" ? "🧑‍🤝‍🧑 " + t.patient : role === "nurse" ? "👩‍⚕️ " + t.nurse : "👨‍⚕️ " + t.doctor}
          </div>
        </div>
      </div>
      <nav style={{ display: "flex", gap: 4, flex: 1 }}>
        {navItems.map(item => (
          <button key={item.key} onClick={() => setPage(item.key)} style={{
            background: page === item.key ? "rgba(14,165,233,0.2)" : "transparent",
            border: page === item.key ? "1px solid rgba(14,165,233,0.4)" : "1px solid transparent",
            borderRadius: 8, padding: "6px 14px", color: page === item.key ? "#38bdf8" : "#94a3b8",
            cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: 500,
            transition: "all 0.2s"
          }}>{item.label}</button>
        ))}
      </nav>
      <LanguageSwitcher lang={lang} setLang={setLang} t={t} />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #0ea5e9)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 700, fontSize: 14
        }}>{(user?.name || "U")[0].toUpperCase()}</div>
        <button onClick={onLogout} style={{
          background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: 8, padding: "6px 12px", color: "#f87171", cursor: "pointer",
          fontSize: 12, fontFamily: "inherit"
        }}>{t.logout}</button>
      </div>
    </header>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#1e293b", border: "1px solid #334155", borderRadius: 16,
      padding: 24, ...style
    }}>{children}</div>
  );
}

function Badge({ color, children }) {
  const colors = {
    red: { bg: "rgba(239,68,68,0.15)", border: "#ef4444", text: "#f87171" },
    orange: { bg: "rgba(249,115,22,0.15)", border: "#f97316", text: "#fb923c" },
    yellow: { bg: "rgba(234,179,8,0.15)", border: "#eab308", text: "#facc15" },
    green: { bg: "rgba(34,197,94,0.15)", border: "#22c55e", text: "#4ade80" },
    blue: { bg: "rgba(14,165,233,0.15)", border: "#0ea5e9", text: "#38bdf8" },
  };
  const c = colors[color] || colors.blue;
  return (
    <span style={{
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600
    }}>{children}</span>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, required }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", color: "#94a3b8", fontSize: 12, marginBottom: 6, fontWeight: 500 }}>{label}{required && " *"}</label>}
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} required={required}
        style={{
          width: "100%", boxSizing: "border-box", background: "#0f172a",
          border: "1px solid #334155", borderRadius: 8, padding: "10px 14px",
          color: "#e2e8f0", fontSize: 14, fontFamily: "inherit", outline: "none",
          transition: "border-color 0.2s"
        }}
        onFocus={e => e.target.style.borderColor = "#0ea5e9"}
        onBlur={e => e.target.style.borderColor = "#334155"}
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", color: "#94a3b8", fontSize: 12, marginBottom: 6, fontWeight: 500 }}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        width: "100%", background: "#0f172a", border: "1px solid #334155",
        borderRadius: 8, padding: "10px 14px", color: "#e2e8f0",
        fontSize: 14, fontFamily: "inherit", outline: "none"
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", style = {}, disabled }) {
  const variants = {
    primary: { background: "linear-gradient(135deg, #0ea5e9, #6366f1)", color: "#fff" },
    success: { background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff" },
    danger: { background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#fff" },
    ghost: { background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid #334155" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...variants[variant], border: "none", borderRadius: 10, padding: "10px 20px",
      cursor: disabled ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 600,
      fontFamily: "inherit", opacity: disabled ? 0.5 : 1, transition: "all 0.2s",
      ...style
    }}>{children}</button>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", color: "#94a3b8", fontSize: 12, marginBottom: 6, fontWeight: 500 }}>{label}</label>}
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{
        width: "100%", boxSizing: "border-box", background: "#0f172a",
        border: "1px solid #334155", borderRadius: 8, padding: "10px 14px",
        color: "#e2e8f0", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical"
      }} />
    </div>
  );
}

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────
function RoleSelect({ t, onSelect }) {
  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24
    }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>⚕️</div>
        <h1 style={{ color: "#fff", fontSize: 42, fontWeight: 900, letterSpacing: "-1px", margin: 0 }}>{t.appTitle}</h1>
        <p style={{ color: "#64748b", marginTop: 8, fontSize: 16 }}>{t.appSubtitle}</p>
      </div>
      <p style={{ color: "#94a3b8", marginBottom: 24, fontSize: 14 }}>{t.selectRole}</p>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { key: "patient", icon: "🧑‍🤝‍🧑", color: "#0ea5e9" },
          { key: "nurse", icon: "👩‍⚕️", color: "#22c55e" },
          { key: "doctor", icon: "👨‍⚕️", color: "#6366f1" },
        ].map(r => (
          <button key={r.key} onClick={() => onSelect(r.key)} style={{
            background: "#1e293b", border: `2px solid ${r.color}33`,
            borderRadius: 20, padding: "32px 40px", cursor: "pointer",
            color: "#fff", textAlign: "center", minWidth: 160,
            transition: "all 0.3s", fontFamily: "inherit"
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.background = `${r.color}15`; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${r.color}33`; e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.transform = "none"; }}
          >
            <div style={{ fontSize: 44, marginBottom: 12 }}>{r.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: r.color }}>{t[r.key]}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AuthPage({ t, role, onLogin, onRegister }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", age: "", gender: "male", contact: "", knownDiseases: "", specialization: "", department: "", experience: "" });
  const [err, setErr] = useState("");

  const set = k => v => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.email || !form.password) return setErr("Please fill required fields");
    if (mode === "register" && !form.name) return setErr("Name is required");
    setErr("");
    if (mode === "login") onLogin(form.email, form.password);
    else onRegister(form);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24
    }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>
            {role === "patient" ? "🧑‍🤝‍🧑" : role === "nurse" ? "👩‍⚕️" : "👨‍⚕️"}
          </div>
          <h2 style={{ color: "#fff", margin: 0, fontSize: 24 }}>{t[role]} {t[mode]}</h2>
        </div>
        <Card>
          {mode === "register" && (
            <>
              <Input label={t.name} value={form.name} onChange={set("name")} required />
              <Input label={t.age} value={form.age} onChange={set("age")} type="number" />
              <Select label={t.gender} value={form.gender} onChange={set("gender")}
                options={[{ value: "male", label: t.male }, { value: "female", label: t.female }, { value: "other", label: t.other }]} />
              <Input label={t.contact} value={form.contact} onChange={set("contact")} />
              {role === "patient" && <Input label={t.knownDiseases} value={form.knownDiseases} onChange={set("knownDiseases")} placeholder="e.g. diabetes, hypertension" />}
              {role === "doctor" && <>
                <Input label={t.selectSpecialization} value={form.specialization} onChange={set("specialization")} />
                <Input label={t.department} value={form.department} onChange={set("department")} />
                <Input label={t.experience} value={form.experience} onChange={set("experience")} type="number" />
              </>}
            </>
          )}
          <Input label={t.email} value={form.email} onChange={set("email")} type="email" required />
          <Input label={t.password} value={form.password} onChange={set("password")} type="password" required />
          {err && <div style={{ color: "#f87171", fontSize: 13, marginBottom: 12, background: "rgba(239,68,68,0.1)", padding: "8px 12px", borderRadius: 8 }}>{err}</div>}
          <Btn onClick={handleSubmit} style={{ width: "100%", marginBottom: 12 }}>{t[mode]}</Btn>
          <p style={{ color: "#64748b", textAlign: "center", fontSize: 13, margin: 0 }}>
            {mode === "login" ? t.dontHave : t.alreadyHave}{" "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ color: "#0ea5e9", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              {mode === "login" ? t.register : t.login}
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
}

// ─── FILE MANAGER ─────────────────────────────────────────────────────────────
function FileUploader({ patientId, uploaderRole, t, addedBy }) {
  const [files, setFiles] = useState(globalFiles[patientId] || []);
  const [fileType, setFileType] = useState("labReport");
  const [fileName, setFileName] = useState("");
  const [msg, setMsg] = useState("");
  const inputRef = useRef();

  const refresh = () => setFiles([...(globalFiles[patientId] || [])]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const entry = {
      id: Date.now(), name: file.name, type: fileType, size: file.size,
      uploadedAt: new Date().toLocaleString(), uploadedBy: addedBy,
      url: URL.createObjectURL(file), role: uploaderRole
    };
    if (!globalFiles[patientId]) globalFiles[patientId] = [];
    globalFiles[patientId].push(entry);
    refresh();
    setMsg(t.fileUploaded);
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <select value={fileType} onChange={e => setFileType(e.target.value)} style={{
          background: "#0f172a", border: "1px solid #334155", borderRadius: 8,
          padding: "8px 12px", color: "#e2e8f0", fontSize: 13, fontFamily: "inherit"
        }}>
          <option value="labReport">{t.labReport}</option>
          <option value="xray">{t.xray}</option>
          <option value="prescription_file">{t.prescription_file}</option>
          <option value="other_file">{t.other_file}</option>
        </select>
        <Btn onClick={() => inputRef.current.click()} variant="ghost" style={{ fontSize: 13 }}>📎 {t.uploadFile}</Btn>
        <input ref={inputRef} type="file" onChange={handleUpload} style={{ display: "none" }} />
      </div>
      {msg && <div style={{ color: "#4ade80", fontSize: 13, marginBottom: 8 }}>✅ {msg}</div>}
      {files.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {files.map(f => (
            <div key={f.id} style={{
              background: "#0f172a", border: "1px solid #334155", borderRadius: 10,
              padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div>
                <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>📄 {f.name}</div>
                <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>
                  {f.type} • {f.uploadedAt} • by {f.uploadedBy}
                </div>
              </div>
              <a href={f.url} download={f.name} style={{ color: "#38bdf8", fontSize: 12, textDecoration: "none" }}>⬇ {t.download}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PATIENT PAGES ────────────────────────────────────────────────────────────
function PatientDashboard({ user, t, patients }) {
  const p = patients.find(x => x.id === user.id);
  const waitMins = p ? Math.floor((Date.now() - p.queuedAt) / 60000) : 0;
  const doc = p ? DOCTORS_DB.find(d => d.id === p.assignedDoctor) : null;

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: 24 }}>👋 {t.welcomeBack}, {user.name}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { label: t.riskScore, value: p ? p.riskScore : "—", icon: "📊", color: p ? TRIAGE_COLORS[p.triageLevel] : "#64748b" },
          { label: t.triageLevel, value: p ? p.triageLevel : "—", icon: "🏥", color: p ? TRIAGE_COLORS[p.triageLevel] : "#64748b" },
          { label: t.queuePosition, value: p ? "#" + (patients.sort((a,b)=>calcPriorityScore(b)-calcPriorityScore(a)).findIndex(x=>x.id===p.id)+1) : "—", icon: "📋", color: "#0ea5e9" },
          { label: t.waitTime, value: p ? `${waitMins} ${t.mins}` : "—", icon: "⏱", color: "#6366f1" },
        ].map(s => (
          <Card key={s.label} style={{ borderColor: `${s.color}44` }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ color: s.color, fontSize: 28, fontWeight: 800 }}>{s.value}</div>
            <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>{s.label}</div>
          </Card>
        ))}
      </div>
      {p && (
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ color: "#e2e8f0", margin: "0 0 16px" }}>🤖 {t.aiAnalysis}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 14 }}>
              <div style={{ color: "#64748b", fontSize: 12 }}>{t.category}</div>
              <div style={{ color: "#e2e8f0", fontWeight: 600, marginTop: 4 }}>{p.category}</div>
            </div>
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 14 }}>
              <div style={{ color: "#64748b", fontSize: 12 }}>{t.triageLevel}</div>
              <div style={{ color: TRIAGE_COLORS[p.triageLevel], fontWeight: 700, marginTop: 4 }}>{p.triageLevel}</div>
            </div>
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 14, gridColumn: "1/-1" }}>
              <div style={{ color: "#64748b", fontSize: 12 }}>Summary</div>
              <div style={{ color: "#e2e8f0", marginTop: 4, fontSize: 13 }}>{p.summary}</div>
            </div>
          </div>
        </Card>
      )}
      {doc && (
        <Card>
          <h3 style={{ color: "#e2e8f0", margin: "0 0 12px" }}>👨‍⚕️ {t.doctorAssigned}</h3>
          <div style={{ color: "#38bdf8", fontSize: 16, fontWeight: 700 }}>{doc.name}</div>
          <div style={{ color: "#64748b", fontSize: 13 }}>{doc.dept} • {doc.specialization}</div>
        </Card>
      )}
    </div>
  );
}

function ReportSymptoms({ user, t, onSubmit }) {
  const [form, setForm] = useState({ symptoms: "", duration: "", painLevel: 5, notes: "" });
  const [result, setResult] = useState(null);
  const set = k => v => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.symptoms) return;
    const analysis = aiTriage(form.symptoms, form.painLevel, form.duration, user.knownDiseases);
    setResult(analysis);
    onSubmit({ ...form, ...analysis, id: user.id, patientName: user.name, patientAge: user.age, knownDiseases: user.knownDiseases, queuedAt: Date.now(), status: "waiting", vitals: null, prescription: null });
  };

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: 24 }}>🩺 {t.reportSymptoms}</h2>
      <Card>
        <Textarea label={t.symptoms} value={form.symptoms} onChange={set("symptoms")} placeholder="Describe your symptoms..." rows={4} />
        <Input label={t.duration} value={form.duration} onChange={set("duration")} placeholder="e.g. 2 hours, 3 days" />
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 8 }}>{t.painLevel}: <strong style={{ color: "#e2e8f0" }}>{form.painLevel}/10</strong></label>
          <input type="range" min={0} max={10} value={form.painLevel} onChange={e => set("painLevel")(+e.target.value)} style={{ width: "100%", accentColor: "#0ea5e9" }} />
          <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: 11, marginTop: 4 }}>
            <span>0 No pain</span><span>10 Severe</span>
          </div>
        </div>
        <Textarea label={t.notes} value={form.notes} onChange={set("notes")} placeholder="Any additional information..." />
        <Btn onClick={handleSubmit} style={{ width: "100%" }}>{t.submitSymptoms}</Btn>
      </Card>

      {result && (
        <Card style={{ marginTop: 20, borderColor: `${result.triageColor}44` }}>
          <h3 style={{ color: "#e2e8f0", margin: "0 0 16px" }}>🤖 {t.aiAnalysis}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 14 }}>
              <div style={{ color: "#64748b", fontSize: 12 }}>{t.riskScore}</div>
              <div style={{ color: result.triageColor, fontSize: 32, fontWeight: 900 }}>{result.riskScore}</div>
            </div>
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 14 }}>
              <div style={{ color: "#64748b", fontSize: 12 }}>{t.triageLevel}</div>
              <div style={{ color: result.triageColor, fontSize: 24, fontWeight: 800 }}>{result.triageLevel}</div>
            </div>
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 14 }}>
              <div style={{ color: "#64748b", fontSize: 12 }}>{t.category}</div>
              <div style={{ color: "#e2e8f0", fontWeight: 600 }}>{result.category}</div>
            </div>
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 14 }}>
              <div style={{ color: "#64748b", fontSize: 12 }}>{t.threshold}</div>
              <div style={{ color: "#e2e8f0", fontWeight: 600 }}>{result.maxWait} {t.mins}</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function MedicalHistory({ user, t }) {
  const pHistory = globalPrescriptions[user.id] || [];
  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: 24 }}>📋 {t.medicalHistory}</h2>
      {pHistory.length === 0 ? (
        <Card><p style={{ color: "#64748b", textAlign: "center" }}>No medical history yet.</p></Card>
      ) : pHistory.map((h, i) => (
        <Card key={i} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ color: "#38bdf8", fontWeight: 700 }}>{h.doctorName}</div>
            <div style={{ color: "#64748b", fontSize: 12 }}>{h.date}</div>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 8 }}><strong>Diagnosis:</strong> {h.diagnosis}</div>
          <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 8 }}><strong>Prescription:</strong> {h.prescription}</div>
          <div style={{ color: "#94a3b8", fontSize: 13 }}><strong>Follow-up:</strong> {h.followUp}</div>
        </Card>
      ))}
    </div>
  );
}

function PatientFiles({ user, t }) {
  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: 24 }}>📁 {t.myFiles}</h2>
      <Card>
        <h3 style={{ color: "#e2e8f0", margin: "0 0 16px", fontSize: 15 }}>📤 {t.uploadFile}</h3>
        <FileUploader patientId={user.id} uploaderRole="patient" t={t} addedBy={user.name} />
      </Card>
    </div>
  );
}

// ─── NURSE PAGES ──────────────────────────────────────────────────────────────
function NurseDashboard({ t, patients, setPatients }) {
  const stats = {
    total: patients.length,
    red: patients.filter(p => p.triageLevel === "RED").length,
    waiting: patients.filter(p => p.status === "waiting").length,
    arrived: patients.filter(p => p.arrived).length,
  };
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: 24 }}>👩‍⚕️ Nurse {t.dashboard}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Patients", value: stats.total, color: "#0ea5e9", icon: "👥" },
          { label: "Critical (RED)", value: stats.red, color: "#ef4444", icon: "🚨" },
          { label: t.waiting, value: stats.waiting, color: "#eab308", icon: "⏳" },
          { label: t.arrived, value: stats.arrived, color: "#22c55e", icon: "✅" },
        ].map(s => (
          <Card key={s.label} style={{ borderColor: `${s.color}44` }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div style={{ color: s.color, fontSize: 32, fontWeight: 800 }}>{s.value}</div>
            <div style={{ color: "#64748b", fontSize: 12 }}>{s.label}</div>
          </Card>
        ))}
      </div>
      {patients.filter(p => p.triageLevel === "RED" && !p.arrived).length > 0 && (
        <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid #ef4444", borderRadius: 12, padding: 16, marginBottom: 16, animation: "pulse 2s infinite" }}>
          🚨 {patients.filter(p => p.triageLevel === "RED" && !p.arrived).length} RED priority patient(s) not yet arrived!
        </div>
      )}
    </div>
  );
}

function PatientQueue({ t, patients, setPatients, user }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [vitals, setVitals] = useState({ bp: "", hr: "", spo2: "", temp: "", weight: "" });
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const sorted = [...patients].sort((a, b) => calcPriorityScore(b) - calcPriorityScore(a));

  const vitalAlerts = (v) => {
    const alerts = [];
    if (v.spo2 && parseInt(v.spo2) < 92) alerts.push("🚨 SpO2 CRITICAL: " + v.spo2 + "%");
    if (v.hr && (parseInt(v.hr) > 120 || parseInt(v.hr) < 50)) alerts.push("⚠ Heart Rate: " + v.hr);
    if (v.temp && parseFloat(v.temp) > 39.5) alerts.push("🌡 High Fever: " + v.temp + "°C");
    if (v.bp && v.bp.split("/")[0] && parseInt(v.bp.split("/")[0]) > 180) alerts.push("⚠ BP Critical: " + v.bp);
    return alerts;
  };

  const handleSaveVitals = () => {
    const alerts = vitalAlerts(vitals);
    setPatients(prev => prev.map(p => p.id === selectedPatient.id
      ? { ...p, vitals, vitalAlerts: alerts, vitalRecordedAt: Date.now(), arrived: true }
      : p));
    globalPatients = globalPatients.map(p => p.id === selectedPatient.id ? { ...p, vitals, vitalAlerts: alerts, vitalRecordedAt: Date.now(), arrived: true } : p);
    setSelectedPatient(null);
    setVitals({ bp: "", hr: "", spo2: "", temp: "", weight: "" });
  };

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: 24 }}>📋 {t.patientQueue}</h2>
      {sorted.length === 0 ? (
        <Card><p style={{ color: "#64748b", textAlign: "center" }}>{t.noPatients}</p></Card>
      ) : sorted.map(p => {
        const waitMins = Math.floor((now - p.queuedAt) / 60000);
        const exceeded = waitMins > p.maxWait;
        const doc = DOCTORS_DB.find(d => d.id === p.assignedDoctor);
        return (
          <Card key={p.id} style={{
            marginBottom: 12, borderColor: exceeded ? "#ef4444" : `${TRIAGE_COLORS[p.triageLevel]}44`,
            borderWidth: exceeded ? 2 : 1
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 16 }}>{p.patientName}</div>
                  <Badge color={p.triageLevel === "RED" ? "red" : p.triageLevel === "ORANGE" ? "orange" : p.triageLevel === "YELLOW" ? "yellow" : "green"}>
                    {p.triageLevel}
                  </Badge>
                  <Badge color="blue">Score: {Math.round(calcPriorityScore(p))}</Badge>
                  {p.arrived && <Badge color="green">✓ {t.arrived}</Badge>}
                </div>
                <div style={{ color: "#64748b", fontSize: 12 }}>
                  {p.category} • Age {p.patientAge} • Wait: {waitMins} {t.mins}
                  {exceeded && <span style={{ color: "#f87171", marginLeft: 8 }}>{t.exceeded}</span>}
                </div>
                {doc && <div style={{ color: "#38bdf8", fontSize: 12, marginTop: 2 }}>→ {doc.name}</div>}
                {p.vitalAlerts && p.vitalAlerts.map((a, i) => (
                  <div key={i} style={{ color: "#f87171", fontSize: 12, marginTop: 2 }}>{a}</div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {!p.arrived && (
                  <Btn variant="success" style={{ fontSize: 12, padding: "6px 12px" }}
                    onClick={() => {
                      setPatients(prev => prev.map(x => x.id === p.id ? { ...x, arrived: true } : x));
                      globalPatients = globalPatients.map(x => x.id === p.id ? { ...x, arrived: true } : x);
                    }}>
                    ✓ {t.confirmArrival}
                  </Btn>
                )}
                <Btn variant="ghost" style={{ fontSize: 12, padding: "6px 12px" }}
                  onClick={() => { setSelectedPatient(p); setVitals(p.vitals || { bp: "", hr: "", spo2: "", temp: "", weight: "" }); }}>
                  {p.vitals ? "✏ Vitals" : "📊 " + t.recordVitals}
                </Btn>
              </div>
            </div>
          </Card>
        );
      })}

      {selectedPatient && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 24
        }}>
          <Card style={{ width: "100%", maxWidth: 480 }}>
            <h3 style={{ color: "#fff", marginBottom: 16 }}>📊 {t.recordVitals} — {selectedPatient.patientName}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[["bp", t.bp, "120/80"], ["hr", t.hr, "72 bpm"], ["spo2", t.spo2, "98%"], ["temp", t.temp, "37.0°C"], ["weight", t.weight, "70 kg"]].map(([k, l, ph]) => (
                <Input key={k} label={l} value={vitals[k]} onChange={v => setVitals(vt => ({ ...vt, [k]: v }))} placeholder={ph} />
              ))}
            </div>
            {vitalAlerts(vitals).map((a, i) => <div key={i} style={{ color: "#f87171", fontSize: 13, marginBottom: 4 }}>{a}</div>)}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Btn onClick={handleSaveVitals} variant="success" style={{ flex: 1 }}>💾 Save</Btn>
              <Btn onClick={() => setSelectedPatient(null)} variant="ghost" style={{ flex: 1 }}>{t.close}</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function StaffAddFile({ t, patients }) {
  const [selectedId, setSelectedId] = useState(patients[0]?.id || "");
  const selected = patients.find(p => p.id === selectedId);
  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: 24 }}>📁 {t.staffAddFile}</h2>
      <Card>
        <Select label={t.selectPatient} value={selectedId} onChange={setSelectedId}
          options={patients.map(p => ({ value: p.id, label: `${p.patientName} (${p.triageLevel})` }))} />
        {selected && (
          <div style={{ marginTop: 16 }}>
            <div style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: 12 }}>
              {selected.patientName} • {selected.category} • <span style={{ color: TRIAGE_COLORS[selected.triageLevel] }}>{selected.triageLevel}</span>
            </div>
            <FileUploader patientId={selectedId} uploaderRole="staff" t={t} addedBy="Nurse" />
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── DOCTOR PAGES ─────────────────────────────────────────────────────────────
function DoctorPatients({ t, patients, setPatients, doctorId, showAll = false }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [form, setForm] = useState({ diagnosis: "", prescription: "", medication: "", followUp: "" });
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");

  const myPatients = showAll
    ? patients
    : patients.filter(p => p.assignedDoctor === doctorId);

  const filtered = myPatients.filter(p =>
    !search || p.patientName?.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => calcPriorityScore(b) - calcPriorityScore(a));

  const openPatient = (p) => {
    setSelectedPatient(p);
    const presc = (globalPrescriptions[p.id] || []).slice(-1)[0] || {};
    setForm({ diagnosis: presc.diagnosis || "", prescription: presc.prescription || "", medication: presc.medication || "", followUp: presc.followUp || "" });
  };

  const savePrescription = () => {
    const entry = { ...form, doctorId, doctorName: DOCTORS_DB.find(d => d.id === doctorId)?.name || "Doctor", date: new Date().toLocaleString(), patientId: selectedPatient.id };
    if (!globalPrescriptions[selectedPatient.id]) globalPrescriptions[selectedPatient.id] = [];
    globalPrescriptions[selectedPatient.id].push(entry);
    setPatients(prev => prev.map(p => p.id === selectedPatient.id ? { ...p, prescription: entry, status: "completed" } : p));
    globalPatients = globalPatients.map(p => p.id === selectedPatient.id ? { ...p, prescription: entry, status: "completed" } : p);
    setMsg("✅ Prescription saved!");
    setTimeout(() => setMsg(""), 3000);
    // add file for staff
    const entry2 = { id: Date.now(), name: `Prescription_${selectedPatient.patientName}_${new Date().toLocaleDateString()}.txt`, type: "prescription_file", size: 1024, uploadedAt: new Date().toLocaleString(), uploadedBy: "Doctor", role: "doctor", url: "#" };
    if (!globalFiles[selectedPatient.id]) globalFiles[selectedPatient.id] = [];
    globalFiles[selectedPatient.id].push(entry2);
  };

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: 24 }}>👨‍⚕️ {showAll ? t.allPatients : t.myPatients}</h2>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 340px", minWidth: 280 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search} style={{
            width: "100%", boxSizing: "border-box", background: "#1e293b", border: "1px solid #334155",
            borderRadius: 10, padding: "10px 14px", color: "#e2e8f0", fontSize: 14, fontFamily: "inherit",
            outline: "none", marginBottom: 12
          }} />
          {sorted.length === 0
            ? <Card><p style={{ color: "#64748b", textAlign: "center" }}>{t.noPatients}</p></Card>
            : sorted.map(p => {
              const waitMins = Math.floor((Date.now() - p.queuedAt) / 60000);
              return (
                <div key={p.id} onClick={() => openPatient(p)} style={{
                  background: selectedPatient?.id === p.id ? "rgba(14,165,233,0.15)" : "#1e293b",
                  border: `1px solid ${selectedPatient?.id === p.id ? "#0ea5e9" : `${TRIAGE_COLORS[p.triageLevel]}44`}`,
                  borderRadius: 12, padding: 14, marginBottom: 10, cursor: "pointer", transition: "all 0.2s"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ color: "#e2e8f0", fontWeight: 700 }}>{p.patientName}</div>
                    <Badge color={p.triageLevel === "RED" ? "red" : p.triageLevel === "ORANGE" ? "orange" : p.triageLevel === "YELLOW" ? "yellow" : "green"}>{p.triageLevel}</Badge>
                  </div>
                  <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>
                    {p.category} • {waitMins} {t.mins} wait
                    {p.status === "completed" && <span style={{ color: "#4ade80", marginLeft: 6 }}>✓</span>}
                  </div>
                  {waitMins > p.maxWait && <div style={{ color: "#f87171", fontSize: 11, marginTop: 2 }}>{t.exceeded}</div>}
                </div>
              );
            })}
        </div>

        <div style={{ flex: 1, minWidth: 280 }}>
          {selectedPatient ? (
            <Card>
              <h3 style={{ color: "#e2e8f0", margin: "0 0 16px" }}>🩺 {selectedPatient.patientName}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                {[
                  ["Age", selectedPatient.patientAge],
                  ["Risk Score", selectedPatient.riskScore],
                  ["Triage", selectedPatient.triageLevel],
                  ["Category", selectedPatient.category],
                  ["Known Diseases", selectedPatient.knownDiseases || "None"],
                  ["Symptoms", selectedPatient.symptoms],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "#0f172a", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ color: "#64748b", fontSize: 11 }}>{k}</div>
                    <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600, marginTop: 2, wordBreak: "break-word" }}>{v || "—"}</div>
                  </div>
                ))}
              </div>

              {selectedPatient.vitals && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 8, fontWeight: 600 }}>📊 VITALS</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6 }}>
                    {[["BP", selectedPatient.vitals.bp], ["HR", selectedPatient.vitals.hr], ["SpO2", selectedPatient.vitals.spo2], ["Temp", selectedPatient.vitals.temp], ["Wt", selectedPatient.vitals.weight]].map(([k, v]) => (
                      <div key={k} style={{ background: "#0f172a", borderRadius: 8, padding: "8px", textAlign: "center" }}>
                        <div style={{ color: "#64748b", fontSize: 10 }}>{k}</div>
                        <div style={{ color: "#38bdf8", fontSize: 12, fontWeight: 700 }}>{v || "—"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ borderTop: "1px solid #334155", paddingTop: 16, marginTop: 8 }}>
                <h4 style={{ color: "#e2e8f0", margin: "0 0 12px" }}>📝 Consultation</h4>
                <Textarea label={t.diagnosis} value={form.diagnosis} onChange={v => setForm(f => ({ ...f, diagnosis: v }))} rows={2} />
                <Textarea label={t.prescription} value={form.prescription} onChange={v => setForm(f => ({ ...f, prescription: v }))} rows={2} />
                <Textarea label={t.medication} value={form.medication} onChange={v => setForm(f => ({ ...f, medication: v }))} rows={2} />
                <Input label={t.followUp} value={form.followUp} onChange={v => setForm(f => ({ ...f, followUp: v }))} type="date" />
                {msg && <div style={{ color: "#4ade80", fontSize: 13, marginBottom: 8 }}>{msg}</div>}
                <Btn onClick={savePrescription} variant="success" style={{ width: "100%", marginBottom: 12 }}>💊 {t.savePrescription}</Btn>
                <h4 style={{ color: "#e2e8f0", margin: "0 0 12px" }}>📁 {t.addFile}</h4>
                <FileUploader patientId={selectedPatient.id} uploaderRole="doctor" t={t} addedBy="Doctor" />
              </div>
            </Card>
          ) : (
            <Card style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
              <p style={{ color: "#64748b" }}>Select a patient to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const t = LANGS[lang];

  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [patients, setPatients] = useState([]);
  const [patientsDb, setPatientsDb] = useState([]);

  // sync with global
  useEffect(() => { globalPatients = patients; }, [patients]);

  const handleLogin = (email, password) => {
    if (role === "doctor") {
      const doc = DOCTORS_DB.find(d => d.email === email && d.password === password);
      if (doc) { setUser({ ...doc, role: "doctor" }); setPage("dashboard"); }
      else alert("Invalid credentials. Try: priya@med.com / pass123");
    } else if (role === "nurse") {
      const staff = STAFF_DB.find(s => s.email === email && s.password === password);
      if (staff) { setUser({ ...staff, role: "nurse" }); setPage("dashboard"); }
      else alert("Invalid credentials. Try: anjali@med.com / pass123");
    } else {
      const p = patientsDb.find(p => p.email === email && p.password === password);
      if (p) { setUser({ ...p, role: "patient" }); setPage("dashboard"); }
      else alert("Account not found. Please register first.");
    }
  };

  const handleRegister = (form) => {
    if (role === "patient") {
      const newUser = { ...form, id: "p_" + Date.now(), role: "patient" };
      setPatientsDb(prev => [...prev, newUser]);
      setUser(newUser); setPage("dashboard");
    } else if (role === "nurse") {
      const newUser = { ...form, id: "s_" + Date.now(), role: "nurse" };
      setUser(newUser); setPage("dashboard");
    } else {
      const newUser = { ...form, id: "d_" + Date.now(), role: "doctor" };
      DOCTORS_DB.push(newUser);
      setUser(newUser); setPage("dashboard");
    }
  };

  const handleSymptomSubmit = (data) => {
    setPatients(prev => {
      const exists = prev.find(p => p.id === user.id);
      if (exists) return prev.map(p => p.id === user.id ? { ...p, ...data } : p);
      return [...prev, data];
    });
    setPage("dashboard");
  };

  const handleLogout = () => { setUser(null); setRole(null); setPage("dashboard"); };

  const isRTL = lang === "ar";

  if (!role) return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 100 }}>
        <LanguageSwitcher lang={lang} setLang={setLang} t={t} />
      </div>
      <RoleSelect t={t} onSelect={r => { setRole(r); setPage("dashboard"); }} />
    </div>
  );

  if (!user) return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 100 }}>
        <LanguageSwitcher lang={lang} setLang={setLang} t={t} />
      </div>
      <AuthPage t={t} role={role} onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  );

  const renderPage = () => {
    if (role === "patient") {
      if (page === "dashboard") return <PatientDashboard user={user} t={t} patients={patients} />;
      if (page === "report") return <ReportSymptoms user={user} t={t} onSubmit={handleSymptomSubmit} />;
      if (page === "history") return <MedicalHistory user={user} t={t} />;
      if (page === "files") return <PatientFiles user={user} t={t} />;
    }
    if (role === "nurse") {
      if (page === "dashboard") return <NurseDashboard t={t} patients={patients} setPatients={setPatients} />;
      if (page === "queue") return <PatientQueue t={t} patients={patients} setPatients={setPatients} user={user} />;
      if (page === "addfile") return <StaffAddFile t={t} patients={patients} />;
    }
    if (role === "doctor") {
      if (page === "dashboard") return (
        <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", marginBottom: 24 }}>👨‍⚕️ {t.welcomeBack}, {user.name}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {[
              { label: t.myPatients, value: patients.filter(p => p.assignedDoctor === user.id).length, color: "#0ea5e9", icon: "👥" },
              { label: "Pending", value: patients.filter(p => p.assignedDoctor === user.id && p.status !== "completed").length, color: "#f97316", icon: "⏳" },
              { label: "Completed", value: patients.filter(p => p.assignedDoctor === user.id && p.status === "completed").length, color: "#22c55e", icon: "✅" },
              { label: "Critical", value: patients.filter(p => p.assignedDoctor === user.id && p.triageLevel === "RED").length, color: "#ef4444", icon: "🚨" },
            ].map(s => (
              <Card key={s.label} style={{ borderColor: `${s.color}44` }}>
                <div style={{ fontSize: 28 }}>{s.icon}</div>
                <div style={{ color: s.color, fontSize: 32, fontWeight: 800 }}>{s.value}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{s.label}</div>
              </Card>
            ))}
          </div>
        </div>
      );
      if (page === "mypatients") return <DoctorPatients t={t} patients={patients} setPatients={setPatients} doctorId={user.id} />;
      if (page === "allpatients") return <DoctorPatients t={t} patients={patients} setPatients={setPatients} doctorId={user.id} showAll />;
    }
    return null;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI', system-ui, sans-serif", direction: isRTL ? "rtl" : "ltr" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        input[type=range] { -webkit-appearance: none; height: 6px; border-radius: 3px; background: #334155; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #0ea5e9; cursor: pointer; }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.7 } }
        button:hover { opacity: 0.9; }
      `}</style>
      <Header t={t} lang={lang} setLang={setLang} user={user} role={role} onLogout={handleLogout} page={page} setPage={setPage} />
      <main>{renderPage()}</main>
    </div>
  );
}