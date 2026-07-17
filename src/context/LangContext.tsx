import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'bn' | 'gu' | 'mr' | 'pa' | 'ta' | 'te' | 'kn' | 'ml' | 'as' | 'ur' | 'or' | 'sa';

interface LangContextProps {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    healthPrograms: "Health Programs",
    educationPrograms: "Education Programs",
    employmentPrograms: "Employment Programs",
    projects: "Projects",
    womenEmpowerment: "Women Empowerment",
    campaigns: "Campaigns",
    donate: "Donate",
    about: "About",
    media: "Media",
    contact: "Contact",
    login: "Login",
    register: "Register",
    donateNow: "Donate Now",
    becomeVolunteer: "Become Volunteer",
    
    // Helpline/Top Bar
    helpline: "Helpline",
    officeTiming: "Mon - Sat: 9:00 AM - 6:00 PM",
    selectLanguage: "Select Language",

    // General CTAs
    learnMore: "Learn More",
    knowMore: "Know More",
    applyNow: "Apply Now",
    submit: "Submit",
    loading: "Loading...",

    // Slider Texts
    slider1Title: "Empowering Every Woman Through Health & Dignity",
    slider1Text: "Join India's growing women-led healthcare movement by promoting menstrual hygiene, affordable sanitary pads, and community awareness.",
    slider2Title: "Education Can Change Every Life",
    slider2Text: "Supporting quality education, scholarships, digital learning, and career guidance for underprivileged children.",
    slider3Title: "Healthcare for Every Family",
    slider3Text: "Medical camps, health awareness, free consultations, nutrition support, and preventive healthcare programs.",
    slider4Title: "Creating Employment for Women",
    slider4Text: "More than 2,000 women are already working with us to improve healthcare access and earn sustainable income.",
    slider5Title: "Life Sakhi - Har Mahila Ki Sehat Ka Saathi",
    slider5Text: "Affordable sanitary pads for every woman with menstrual health awareness, dignity, and economic empowerment.",
    
    // Stats
    statYears: "4+ Years Experience",
    statWomen: "2000+ Women Working",
    statDistricts: "100+ Districts Covered",
    statBeneficiaries: "Thousands of Beneficiaries"
  },
  hi: {
    // Navigation
    home: "गृह",
    healthPrograms: "स्वास्थ्य कार्यक्रम",
    educationPrograms: "शिक्षा कार्यक्रम",
    employmentPrograms: "रोजगार कार्यक्रम",
    projects: "परियोजनाएं",
    womenEmpowerment: "महिला सशक्तिकरण",
    campaigns: "अभियान",
    donate: "दान करें",
    about: "हमारे बारे में",
    media: "मीडिया",
    contact: "संपर्क",
    login: "लॉगिन",
    register: "पंजीकरण",
    donateNow: "अभी दान करें",
    becomeVolunteer: "स्वयंसेवक बनें",
    
    // Helpline/Top Bar
    helpline: "हेल्पलाइन",
    officeTiming: "सोम - शनि: सुबह 9:00 - शाम 6:00",
    selectLanguage: "भाषा चुनें",

    // General CTAs
    learnMore: "अधिक जानें",
    knowMore: "विस्तार से जानें",
    applyNow: "अभी आवेदन करें",
    submit: "जमा करें",
    loading: "लोड हो रहा है...",

    // Slider Texts
    slider1Title: "स्वास्थ्य और सम्मान से हर महिला का सशक्तिकरण",
    slider1Text: "मासिक धर्म स्वच्छता, किफायती सैनिटरी पैड और सामुदायिक जागरूकता को बढ़ावा देकर भारत के बढ़ते महिला-नेतृत्व वाले स्वास्थ्य आंदोलन में शामिल हों।",
    slider2Title: "शिक्षा हर जीवन बदल सकती है",
    slider2Text: "वंचित बच्चों के लिए गुणवत्तापूर्ण शिक्षा, छात्रवृत्ति, डिजिटल शिक्षा और करियर मार्गदर्शन का समर्थन।",
    slider3Title: "हर परिवार के लिए स्वास्थ्य सेवा",
    slider3Text: "चिकित्सा शिविर, स्वास्थ्य जागरूकता, मुफ्त परामर्श, पोषण सहायता और निवारक स्वास्थ्य कार्यक्रम।",
    slider4Title: "महिलाओं के लिए रोजगार सृजन",
    slider4Text: "स्वास्थ्य सेवाओं तक पहुंच में सुधार करने और स्थायी आय अर्जित करने के लिए 2,000 से अधिक महिलाएं पहले से ही हमारे साथ काम कर रही हैं।",
    slider5Title: "लाइफ सखी - हर महिला की सेहत का साथी",
    slider5Text: "मासिक धर्म स्वास्थ्य जागरूकता, सम्मान और आर्थिक सशक्तिकरण के साथ हर महिला के लिए किफायती सैनिटरी पैड।",

    // Stats
    statYears: "4+ वर्षों का अनुभव",
    statWomen: "2000+ कामकाजी महिलाएं",
    statDistricts: "100+ जिले कवर किए गए",
    statBeneficiaries: "हजारों लाभार्थी"
  },
  // Fallbacks or placeholders for other Indian languages (Google Translate Widget handles dynamic conversion, but UI dropdown supports choices)
  bn: { home: "হোম", donate: "দান করুন", login: "লগইন", register: "নিবন্ধন" },
  gu: { home: "હોમ", donate: "દાન કરો", login: "લોગિન", register: "નોંધણી" },
  mr: { home: "होम", donate: "दान करा", login: "लॉगिन", register: "नोंदणी" },
  pa: { home: "ਹੋਮ", donate: "ਦਾਨ ਕਰੋ", login: "ਲੌਗਇਨ", register: "ਰਜਿਸਟਰ" },
  ta: { home: "முகப்பு", donate: "தானம் செய்", login: "உள்நுழை", register: "பதிவு" },
  te: { home: "హోమ్", donate: "దానం చేయండి", login: "లాగిన్", register: "నమోదు" },
  kn: { home: "ಮುಖಪುಟ", donate: "ದಾನ ಮಾಡಿ", login: "ಲಾಗಿನ್", register: "ನೊಂದಣಿ" },
  ml: { home: "ഹോം", donate: "സംഭാവന ചെയ്യുക", login: "ലോഗിൻ", register: "രജിസ്റ്റർ" },
  as: { home: "হোম", donate: "দান কৰক", login: "লগইন", register: "পঞ্জীয়ন" },
  ur: { home: "ہوم", donate: "عطیہ کریں", login: "لاگ ان", register: "رجسٹر" },
  or: { home: "ହୋମ", donate: "ଦାନ କରନ୍ତୁ", login: "ଲଗଇନ", register: "ପଞ୍ଜୀକରଣ" },
  sa: { home: "मुख्यपृष्ठम्", donate: "दानं कुरुत", login: "प्रवेशः", register: "पंजीकरणम्" }
};

const LangContext = createContext<LangContextProps | undefined>(undefined);

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('life_sakhi_lang') as Language;
    if (saved && translations[saved]) {
      setCurrentLangState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLangState(lang);
    localStorage.setItem('life_sakhi_lang', lang);

    // Integrate with standard Google Translate Element if loaded
    const translateSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (translateSelect) {
      translateSelect.value = lang;
      translateSelect.dispatchEvent(new Event('change'));
    }
  };

  const t = (key: string): string => {
    // Return translation if exists, otherwise fallback to English, otherwise return key
    return translations[currentLang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LangContext.Provider value={{ currentLang, setLanguage, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
};

export const languagesList = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'mr', name: 'मराठी' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'as', name: 'অসমীয়া' },
  { code: 'ur', name: 'اردو' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'sa', name: 'संस्कृत' }
] as const;
