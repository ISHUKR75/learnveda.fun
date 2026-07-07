/**
 * @file lib/i18n/translations.ts
 * @description Full i18n translation dictionary for LearnVeda
 * @purpose Supports 11 Indian languages + English for all UI text
 * @used-by useTranslation hook, TranslationProvider, all page components
 *
 * Languages supported:
 *  en (English), hi (Hindi), ta (Tamil), te (Telugu), bn (Bengali),
 *  kn (Kannada), ml (Malayalam), mr (Marathi), gu (Gujarati),
 *  pa (Punjabi), or (Odia)
 *
 * Structure: nested key paths (e.g. "nav.learn" → "Learn" or "सीखें")
 */

/* ─── Supported Language Type ────────────────────────────────────────────── */
export type Language =
  | "en" | "hi" | "ta" | "te" | "bn"
  | "kn" | "ml" | "mr" | "gu" | "pa" | "or";

/* ─── Language Metadata ──────────────────────────────────────────────────── */
export const LANGUAGES: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: "en", name: "English",    nativeName: "English",    flag: "🇬🇧" },
  { code: "hi", name: "Hindi",      nativeName: "हिंदी",       flag: "🇮🇳" },
  { code: "ta", name: "Tamil",      nativeName: "தமிழ்",       flag: "🇮🇳" },
  { code: "te", name: "Telugu",     nativeName: "తెలుగు",      flag: "🇮🇳" },
  { code: "bn", name: "Bengali",    nativeName: "বাংলা",       flag: "🇮🇳" },
  { code: "kn", name: "Kannada",    nativeName: "ಕನ್ನಡ",       flag: "🇮🇳" },
  { code: "ml", name: "Malayalam",  nativeName: "മലയാളം",      flag: "🇮🇳" },
  { code: "mr", name: "Marathi",    nativeName: "मराठी",       flag: "🇮🇳" },
  { code: "gu", name: "Gujarati",   nativeName: "ગુજરાતી",     flag: "🇮🇳" },
  { code: "pa", name: "Punjabi",    nativeName: "ਪੰਜਾਬੀ",      flag: "🇮🇳" },
  { code: "or", name: "Odia",       nativeName: "ଓଡ଼ିଆ",       flag: "🇮🇳" },
];

/* ─── Translation Dictionary ─────────────────────────────────────────────── */
// Each key maps to translations in all 11 languages
// Keys follow the pattern: section.subsection.key
export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  // ── Navigation ─────────────────────────────────────────────────────
  "nav.learn":        { en: "Learn",       hi: "सीखें",         ta: "கற்றல்",       te: "నేర్చుకోండి",  bn: "শেখা",         kn: "ಕಲಿ",          ml: "പഠിക്കൂ",     mr: "शिकणे",        gu: "શીખો",         pa: "ਸਿੱਖੋ",         or: "ଶିଖ"           },
  "nav.platform":     { en: "Platform",    hi: "प्लेटफ़ॉर्म",    ta: "தளம்",         te: "వేదిక",         bn: "প্ল্যাটফর্ম",   kn: "ವೇದಿಕೆ",        ml: "പ്ലാറ്റ്ഫോം",  mr: "व्यासपीठ",     gu: "પ્લેટફોર્મ",   pa: "ਪਲੇਟਫਾਰਮ",     or: "ପ୍ଲାଟଫର୍ମ"     },
  "nav.features":     { en: "Features",    hi: "विशेषताएं",      ta: "அம்சங்கள்",    te: "లక్షణాలు",      bn: "বৈশিষ্ট্য",    kn: "ವೈಶಿಷ್ಟ್ಯಗಳು",  ml: "ഫീച്ചറുകൾ",   mr: "वैशिष्ट्ये",   gu: "સુવિધાઓ",     pa: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",  or: "ବୈଶିଷ୍ଟ୍ୟ"     },
  "nav.pricing":      { en: "Pricing",     hi: "मूल्य निर्धारण", ta: "விலை நிர்ணயம்", te: "ధరల నిర్ణయం",  bn: "মূল্য নির্ধারণ", kn: "ಬೆಲೆ ನಿಗದಿ",   ml: "വിലനിർണ്ണയം",  mr: "किंमत",        gu: "ભાવ",          pa: "ਕੀਮਤ",          or: "ମୂଲ୍ୟ"         },
  "nav.events":       { en: "Events",      hi: "इवेंट्स",         ta: "நிகழ்வுகள்",   te: "ఈవెంట్లు",     bn: "ইভেন্ট",       kn: "ಕಾರ್ಯಕ್ರಮಗಳು",  ml: "ഇവന്‍റ്",      mr: "कार्यक्रम",    gu: "ઇવેન્ટ્સ",    pa: "ਸਮਾਗਮ",         or: "ଇଭେଣ୍ଟ"       },
  "nav.signin":       { en: "Sign In",     hi: "साइन इन",        ta: "உள்நுழைவு",    te: "సైన్ ఇన్",     bn: "সাইন ইন",      kn: "ಸೈನ್ ಇನ್",     ml: "സൈൻ ഇൻ",     mr: "साइन इन",      gu: "સાઇન ઇન",     pa: "ਸਾਈਨ ਇਨ",      or: "ସାଇନ ଇନ"       },
  "nav.getStarted":   { en: "Get Started", hi: "शुरू करें",       ta: "தொடங்குங்கள்", te: "ప్రారంభించండి",  bn: "শুরু করুন",    kn: "ಪ್ರಾರಂಭಿಸಿ",    ml: "ആരംഭിക്കൂ",   mr: "सुरू करा",     gu: "શરૂ કરો",      pa: "ਸ਼ੁਰੂ ਕਰੋ",     or: "ଆରମ୍ଭ କର"     },

  // ── Hero Section ───────────────────────────────────────────────────
  "hero.badge":       { en: "India's #1 AI-Powered EdTech Platform", hi: "भारत का #1 AI-संचालित EdTech प्लेटफॉर्म", ta: "இந்தியாவின் #1 AI EdTech", te: "భారత్ #1 AI EdTech", bn: "ভারতের #1 AI EdTech", kn: "ಭಾರತದ #1 AI EdTech", ml: "ഇന്ത്യയുടെ #1 AI EdTech", mr: "भारताचे #1 AI EdTech", gu: "ભારતનું #1 AI EdTech", pa: "ਭਾਰਤ ਦਾ #1 AI EdTech", or: "ଭାରତ #1 AI EdTech" },
  "hero.headline":    { en: "Learn Smarter,\nFrom Class 9 to Graduation", hi: "स्मार्ट तरीके से सीखें,\nकक्षा 9 से स्नातक तक", ta: "புத்திசாலியாக கற்றுக்கொள்,\n9ம் வகுப்பு முதல் பட்டம் வரை", te: "స్మార్ట్‌గా నేర్చుకోండి,\n9వ తరగతి నుండి పట్టభద్రం వరకు", bn: "স্মার্টলি শিখুন,\nক্লাস ৯ থেকে স্নাতক পর্যন্ত", kn: "ಸ್ಮಾರ್ಟ್ ಆಗಿ ಕಲಿಯಿರಿ,\n9ನೇ ತರಗತಿಯಿಂದ ಪದವಿ ತನಕ", ml: "സ്മാർട്ടായി പഠിക്കൂ,\n9ആം ക്ലാസ് മുതൽ ബിരുദം വരെ", mr: "हुशारीने शिका,\nइयत्ता 9 ते पदवी पर्यंत", gu: "સ્માર્ટ રીતે શીખો,\nધોરણ 9 થી ગ્રેજ્યુએશન સુધી", pa: "ਸਮਾਰਟ ਤਰੀਕੇ ਨਾਲ ਸਿੱਖੋ,\nਕਲਾਸ 9 ਤੋਂ ਗ੍ਰੈਜੂਏਸ਼ਨ ਤੱਕ", or: "ସ୍ମାର୍ଟ ଭାବରେ ଶିଖ,\nଶ୍ରେଣୀ ୯ ଠୁ ସ୍ନାତକ ପର୍ଯ୍ୟନ୍ତ" },
  "hero.subtext":     { en: "AI-powered lessons, live battles, 140+ simulations and expert-curated content for CBSE, JEE, NEET, and Engineering.", hi: "AI-संचालित पाठ, लाइव बैटल, 140+ सिमुलेशन और CBSE, JEE, NEET, इंजीनियरिंग के लिए विशेषज्ञ-क्यूरेटेड सामग्री।", ta: "AI-ஆல் இயக்கப்படும் பாடங்கள், நேரடி போட்டிகள், 140+ தொலைநோக்கிகள்.", te: "AI-ఆధారిత పాఠాలు, లైవ్ బ్యాటిల్స్, 140+ సిమ్యులేషన్లు.", bn: "AI-চালিত পাঠ, লাইভ ব্যাটেল, ১৪০+ সিমুলেশন।", kn: "AI-ಚಾಲಿತ ಪಾಠಗಳು, ಲೈವ್ ಬ್ಯಾಟಲ್ಸ್, 140+ ಸಿಮ್ಯುಲೇಶನ್ಸ್.", ml: "AI-ചാലിത പഠനം, ലൈവ് ബാറ്റിലുകൾ, 140+ സിമ്യുലേഷനുകൾ.", mr: "AI-चालित धडे, लाइव्ह बॅटल, 140+ सिम्युलेशन.", gu: "AI-સંચાલિત પાઠ, લાઇવ બૅટલ, 140+ સિમ્યુલેશન.", pa: "AI-ਚਾਲਿਤ ਪਾਠ, ਲਾਈਵ ਬੈਟਲ, 140+ ਸਿਮੂਲੇਸ਼ਨ।", or: "AI-ଚାଳିତ ପାଠ, ଲାଇଭ ବ୍ୟାଟଲ, 140+ ସିମ୍ୟୁଲେସ଼ନ।" },
  "hero.startFree":   { en: "Start Free Today", hi: "आज मुफ़्त शुरू करें", ta: "இன்று இலவசமாக தொடங்குங்கள்", te: "ఈరోజు ఉచితంగా ప్రారంభించండి", bn: "আজই বিনামূল্যে শুরু করুন", kn: "ಇಂದೇ ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ", ml: "ഇന്ന് സൗജന്യമായി ആരംഭിക്കൂ", mr: "आजच मोफत सुरू करा", gu: "આજે મફતમાં શરૂ કરો", pa: "ਅੱਜ ਮੁਫ਼ਤ ਸ਼ੁਰੂ ਕਰੋ", or: "ଆଜି ମୁଫ୍ତ ଆରଂଭ କର" },
  "hero.watchDemo":   { en: "Watch Demo",     hi: "डेमो देखें",    ta: "டெமோவைப் பாருங்கள்", te: "డెమో చూడండి", bn: "ডেমো দেখুন", kn: "ಡೆಮೋ ನೋಡಿ", ml: "ഡെമോ കാണൂ", mr: "डेमो पाहा", gu: "ડેમો જુઓ", pa: "ਡੈਮੋ ਦੇਖੋ", or: "ଡେମୋ ଦେଖ" },

  // ── Dashboard ──────────────────────────────────────────────────────
  "dashboard.welcome":   { en: "Welcome back", hi: "वापस स्वागत है", ta: "மீண்டும் வரவேற்கிறோம்", te: "తిరిగి స్వాగతం", bn: "ফিরে এসেছেন", kn: "ಮರಳಿ ಸ್ವಾಗತ", ml: "തിരിച്ചു സ്വാഗതം", mr: "परत स्वागत आहे", gu: "પાછા સ્વાગત છે", pa: "ਵਾਪਸ ਸੁਆਗਤ ਹੈ", or: "ପୁଣି ସ୍ୱାଗତ" },
  "dashboard.streak":    { en: "Day Streak",   hi: "दिन की स्ट्रीक", ta: "நாள் தொடர்",            te: "రోజు స్ట్రీక్",   bn: "দিনের স্ট্রিক",  kn: "ದಿನದ ಸ್ಟ್ರೀಕ್",  ml: "ദിവസ സ്ട്രീക്",  mr: "दिवसाची स्ट्रीक", gu: "દિવસ સ્ટ્રીક",  pa: "ਦਿਨ ਦੀ ਸਟ੍ਰੀਕ",  or: "ଦିନ ସ୍ଟ୍ରୀକ" },
  "dashboard.xp":        { en: "Total XP",     hi: "कुल XP",         ta: "மொத்த XP",               te: "మొత్తం XP",       bn: "মোট XP",         kn: "ಒಟ್ಟು XP",        ml: "ആകെ XP",         mr: "एकूण XP",         gu: "કુલ XP",         pa: "ਕੁੱਲ XP",          or: "ମୋଟ XP" },
  "dashboard.continue":  { en: "Continue Learning", hi: "सीखना जारी रखें", ta: "கற்றலை தொடரவும்",  te: "నేర్చుకోవడం కొనసాగించండి", bn: "শেখা চালিয়ে যান", kn: "ಕಲಿಯುವುದನ್ನು ಮುಂದುವರಿಸಿ", ml: "പഠനം തുടരൂ", mr: "शिकणे सुरू ठेवा", gu: "શીખવાનું ચાલુ રાખો", pa: "ਸਿੱਖਣਾ ਜਾਰੀ ਰੱਖੋ", or: "ଶିଖିବା ଜାରି ରଖ" },

  // ── Learn sections ─────────────────────────────────────────────────
  "learn.class9":        { en: "Class 9",      hi: "कक्षा 9",       ta: "9ம் வகுப்பு",              te: "9వ తరగతి",        bn: "ক্লাস ৯",        kn: "9ನೇ ತರಗತಿ",      ml: "ക്ലാസ്സ് 9",      mr: "इयत्ता 9",        gu: "ધોરણ 9",         pa: "ਕਲਾਸ 9",           or: "ଶ୍ରେଣୀ ୯" },
  "learn.class10":       { en: "Class 10",     hi: "कक्षा 10",      ta: "10ம் வகுப்பு",             te: "10వ తరగతి",       bn: "ক্লাস ১০",       kn: "10ನೇ ತರಗತಿ",     ml: "ക്ലാസ്സ് 10",     mr: "इयत्ता 10",       gu: "ધોરણ 10",        pa: "ਕਲਾਸ 10",          or: "ଶ୍ରେଣୀ ୧୦" },
  "learn.class11":       { en: "Class 11",     hi: "कक्षा 11",      ta: "11ம் வகுப்பு",             te: "11వ తరగతి",       bn: "ক্লাস ১১",       kn: "11ನೇ ತರಗತಿ",     ml: "ക്ലാസ്സ് 11",     mr: "इयत्ता 11",       gu: "ધોરણ 11",        pa: "ਕਲਾਸ 11",          or: "ଶ୍ରେଣୀ ୧୧" },
  "learn.class12":       { en: "Class 12",     hi: "कक्षा 12",      ta: "12ம் வகுப்பு",             te: "12వ తరగతి",       bn: "ক্লাস ১২",       kn: "12ನೇ ತರಗತಿ",     ml: "ക്ലാസ്സ് 12",     mr: "इयत्ता 12",       gu: "ધોરણ 12",        pa: "ਕਲਾਸ 12",          or: "ଶ୍ରେଣୀ ୧୨" },
  "learn.engineering":   { en: "Engineering",  hi: "इंजीनियरिंग",   ta: "பொறியியல்",                te: "ఇంజినీరింగ్",     bn: "ইঞ্জিনিয়ারিং",  kn: "ಇಂಜಿನಿಯರಿಂಗ್",  ml: "എൻജിനീയറിങ്",   mr: "अभियांत्रिकी",    gu: "ઈજનેરી",        pa: "ਇੰਜੀਨੀਅਰਿੰਗ",     or: "ଇଞ୍ଜିନିୟରିଂ" },
  "learn.programming":   { en: "Programming",  hi: "प्रोग्रामिंग",   ta: "நிரலாக்கம்",               te: "ప్రోగ్రామింగ్",    bn: "প্রোগ্রামিং",    kn: "ಪ್ರೋಗ್ರಾಮಿಂಗ್",  ml: "പ്രോഗ്രാമിങ്",   mr: "प्रोग्रामिंग",    gu: "પ્રોગ્રામિંગ",   pa: "ਪ੍ਰੋਗਰਾਮਿੰਗ",     or: "ପ୍ରୋଗ୍ରାମିଂ" },

  // ── Common UI ──────────────────────────────────────────────────────
  "ui.loading":          { en: "Loading...",   hi: "लोड हो रहा है...", ta: "ஏற்றுகிறது...", te: "లోడ్ అవుతోంది...", bn: "লোড হচ্ছে...", kn: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...", ml: "ലോഡ്...", mr: "लोड होत आहे...", gu: "લોડ...", pa: "ਲੋਡ...", or: "ଲୋଡ..." },
  "ui.search":           { en: "Search",       hi: "खोजें",           ta: "தேடல்",         te: "వెతుకు",          bn: "খুঁজুন",       kn: "ಹುಡುಕಿ",          ml: "തിരയൂ",  mr: "शोधा",          gu: "શોધ",    pa: "ਖੋਜੋ",   or: "ଖୋଜ" },
  "ui.submit":           { en: "Submit",       hi: "जमा करें",        ta: "சமர்ப்பி",       te: "సమర్పించు",       bn: "জমা দিন",      kn: "ಸಲ್ಲಿಸಿ",         ml: "സമർപ്പിക്കൂ", mr: "सबमिट करा", gu: "સબમિટ", pa: "ਸਬਮਿਟ", or: "ଦାଖଲ" },
  "ui.next":             { en: "Next",         hi: "अगला",            ta: "அடுத்த",         te: "తదుపరి",          bn: "পরবর্তী",      kn: "ಮುಂದೆ",            ml: "അടുത്ത",     mr: "पुढे",       gu: "આગળ",   pa: "ਅਗਲਾ",  or: "ପରବର୍ତ୍ତୀ" },
  "ui.prev":             { en: "Previous",     hi: "पिछला",            ta: "முந்தைய",        te: "మునుపటి",         bn: "আগের",         kn: "ಹಿಂದಿನ",           ml: "മുൻ",        mr: "मागील",      gu: "પહેલા",  pa: "ਪਿਛਲਾ", or: "ପୂର୍ବ" },
  "ui.cancel":           { en: "Cancel",       hi: "रद्द करें",        ta: "ரத்துசெய்",      te: "రద్దు చేయి",      bn: "বাতিল",        kn: "ರದ್ದು ಮಾಡಿ",      ml: "റദ്ദാക്കൂ",  mr: "रद्द करा",  gu: "રદ",    pa: "ਰੱਦ",   or: "ବାତିଲ" },
  "ui.save":             { en: "Save",         hi: "सहेजें",           ta: "சேமி",           te: "సేవ్",            bn: "সেভ",          kn: "ಉಳಿಸಿ",            ml: "സേവ് ചെയ്യൂ", mr: "जतन करा", gu: "સેવ",  pa: "ਸੇਵ",   or: "ସংରକ୍ଷଣ" },
  "ui.share":            { en: "Share",        hi: "शेयर करें",        ta: "பகிர்",          te: "పంచుకో",          bn: "শেয়ার",        kn: "ಶೇರ್ ಮಾಡಿ",      ml: "ഷെയർ ചെയ്യൂ", mr: "शेअर करा", gu: "શેર",  pa: "ਸ਼ੇਅਰ",  or: "ଶେୟାର" },

  // ── Test Center ────────────────────────────────────────────────────
  "test.start":          { en: "Start Test",   hi: "परीक्षा शुरू करें", ta: "தேர்வு தொடங்கு", te: "పరీక్ష ప్రారంభించు", bn: "পরীক্ষা শুরু", kn: "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ", ml: "പരീക്ഷ ആരംഭിക്കൂ", mr: "परीक्षा सुरू करा", gu: "પરીક્ષા શરૂ કરો", pa: "ਪਰੀਖਿਆ ਸ਼ੁਰੂ ਕਰੋ", or: "ପରୀକ୍ଷା ଆରମ୍ଭ" },
  "test.submit":         { en: "Submit Test",  hi: "परीक्षा जमा करें", ta: "தேர்வை சமர்பி",   te: "పరీక్ష సమర్పించు",  bn: "পরীক্ষা জমা", kn: "ಪರೀಕ್ಷೆ ಸಲ್ಲಿಸಿ", ml: "പരീക്ഷ സമർപ്പിക്കൂ", mr: "परीक्षा सबमिट करा", gu: "પરીક્ષા સબમિટ", pa: "ਪਰੀਖਿਆ ਸਬਮਿਟ", or: "ପରୀକ୍ଷା ଦାଖଲ" },
  "test.timeLeft":       { en: "Time Left",    hi: "बचा हुआ समय",      ta: "மீதமுள்ள நேரம்",  te: "మిగిలిన సమయం",     bn: "বাকি সময়",    kn: "ಉಳಿದ ಸಮಯ",        ml: "ബാക്കി സമയം",   mr: "उरलेला वेळ",    gu: "બાકી સમય", pa: "ਬਾਕੀ ਸਮਾਂ",  or: "ବଳିଥିବା ସମୟ" },
  "test.correct":        { en: "Correct",      hi: "सही",              ta: "சரியான",           te: "సరైన",             bn: "সঠিক",         kn: "ಸರಿ",              ml: "ശരിയായ",        mr: "बरोबर",         gu: "સાચો",     pa: "ਸਹੀ",      or: "ସଠିକ" },
  "test.wrong":          { en: "Wrong",        hi: "गलत",              ta: "தவறான",            te: "తప్పు",            bn: "ভুল",           kn: "ತಪ್ಪು",            ml: "തെറ്റ്",         mr: "चुकीचे",        gu: "ખોટો",     pa: "ਗਲਤ",      or: "ଭୁଲ" },
  "test.score":          { en: "Your Score",   hi: "आपका स्कोर",       ta: "உங்கள் மதிப்பெண்", te: "మీ స్కోర్",        bn: "আপনার স্কোর",  kn: "ನಿಮ್ಮ ಸ್ಕೋರ್",     ml: "നിങ്ങളുടെ സ്കോർ", mr: "तुमचे गुण", gu: "તમારો સ્કોર", pa: "ਤੁਹਾਡਾ ਸਕੋਰ", or: "ତୁମ ସ୍କୋର" },

  // ── Gamification ───────────────────────────────────────────────────
  "game.levelUp":        { en: "Level Up!",    hi: "लेवल अप!",        ta: "நிலை உயர்வு!",    te: "లెవల్ అప్!",       bn: "লেভেল আপ!",    kn: "ಲೆವೆಲ್ ಅಪ್!",    ml: "ലെവൽ അപ്!",     mr: "लेव्हल अप!",    gu: "લેવલ અપ!",   pa: "ਲੈਵਲ ਅੱਪ!",    or: "ଲେଭଲ ଅପ!" },
  "game.xpEarned":       { en: "XP Earned",   hi: "XP अर्जित",       ta: "XP சம்பாதித்தது", te: "XP సంపాదించారు",   bn: "XP অর্জিত",    kn: "XP ಗಳಿಸಲಾಯಿತು", ml: "XP നേടി",       mr: "XP मिळवले",     gu: "XP મેળવ્યો",  pa: "XP ਕਮਾਇਆ",     or: "XP ଅର୍ଜନ" },
  "game.streak":         { en: "Streak",       hi: "स्ट्रीक",          ta: "தொடர்",            te: "స్ట్రీక్",         bn: "স্ট্রিক",       kn: "ಸ್ಟ್ರೀಕ್",        ml: "സ്ട്രീക്",      mr: "स्ट्रीक",       gu: "સ્ટ્રીક",    pa: "ਸਟ੍ਰੀਕ",       or: "ସ୍ଟ୍ରୀକ" },
  "game.achievement":    { en: "Achievement",  hi: "उपलब्धि",          ta: "சாதனை",            te: "సాధన",             bn: "অর্জন",         kn: "ಸಾಧನೆ",           ml: "നേട്ടം",        mr: "कामगिरी",       gu: "સિદ્ધિ",      pa: "ਪ੍ਰਾਪਤੀ",      or: "ସଫଳତା" },
  "game.battle":         { en: "Battle",       hi: "बैटल",             ta: "போர்",             te: "యుద్ధం",           bn: "ব্যাটেল",       kn: "ಯುದ್ಧ",           ml: "യുദ്ധം",        mr: "लढाई",          gu: "યુદ્ધ",       pa: "ਲੜਾਈ",         or: "ଯୁଦ୍ଧ" },

  // ── Footer ─────────────────────────────────────────────────────────
  "footer.rights":       { en: "All rights reserved", hi: "सर्वाधिकार सुरक्षित", ta: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டது", te: "అన్ని హక్కులు సురక్షితం", bn: "সমস্ত অধিকার সংরক্ষিত", kn: "ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ", ml: "എല്ലാ അവകാശങ്ങളും", mr: "सर्व हक्क राखीव", gu: "સર્વ અધિકાર", pa: "ਸਾਰੇ ਅਧਿਕਾਰ", or: "ସମସ୍ତ ଅଧିକାର" },
  "footer.privacy":      { en: "Privacy Policy", hi: "गोपनीयता नीति", ta: "தனியுரிமை கொள்கை", te: "గోప్యతా విధానం", bn: "গোপনীয়তা নীতি", kn: "ಗೌಪ್ಯತಾ ನೀತಿ", ml: "സ്വകാര്യതാ നയം", mr: "गोपनीयता धोरण", gu: "ગોપનીયતા નીતિ", pa: "ਗੋਪਨੀਯਤਾ ਨੀਤੀ", or: "ଗୋପନୀୟତା ନୀତି" },
  "footer.terms":        { en: "Terms of Service", hi: "सेवा की शर्तें", ta: "சேவை விதிமுறைகள்", te: "సేవా నిబంధనలు", bn: "সেবার শর্তাবলী", kn: "ಸೇವಾ ನಿಯಮಗಳು", ml: "സേവന നിബന്ധനകൾ", mr: "सेवा अटी", gu: "સેવા શرتો", pa: "ਸੇਵਾ ਸ਼ਰਤਾਂ", or: "ସେବା ସର୍ତ" },
};

/* ─── Get Translation ────────────────────────────────────────────────────── */
/**
 * Returns the translated string for a given key and language.
 * Falls back to English if the key or language is not found.
 *
 * @param key  - Translation key (e.g. "hero.headline")
 * @param lang - Target language code
 * @returns Translated string or English fallback
 */
export function t(key: string, lang: Language): string {
  const entry = TRANSLATIONS[key];
  if (!entry) {
    console.warn(`[i18n] Missing translation key: "${key}"`);
    return key;                                 // Return key itself as fallback
  }
  return entry[lang] ?? entry.en ?? key;        // Target → English → key fallback
}

/* ─── Default language ───────────────────────────────────────────────────── */
export const DEFAULT_LANGUAGE: Language = "en"; // English is the default
