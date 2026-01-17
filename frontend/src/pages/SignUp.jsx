import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';

/* ================== SCHEMA WITH ADDRESS ================== */
const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak"),
  address: z.object({
    line1: z.string().min(3, "Address is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "District is required"),
    pincode: z.string().length(6, "Pincode must be 6 digits"),
  }),
});

/* ================== STATE → DISTRICT MAPPING ================== */
const STATE_DISTRICT_MAP = {
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
};

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('en');
  const [selectedState, setSelectedState] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    const resultAction = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };

  const translations = {
    en: {
      createAccount: "Create Account",
      subtitle: "Join SmartSetu and access all services",
      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      email: "Email Address",
      emailPlaceholder: "citizen@example.com",
      password: "Create Password",
      passwordPlaceholder: "Minimum 8 characters",
      passwordHint: "Use letters, numbers & special characters",
      addressLine: "Address Line",
      addressLinePlaceholder: "Enter your street address",
      state: "State",
      selectState: "Select State",
      district: "District",
      selectDistrict: "Select District",
      pincode: "Pincode",
      pincodePlaceholder: "Enter 6-digit pincode",
      terms: "I agree to SmartSetu's",
      termsLink: "Terms of Service",
      and: "and",
      privacyLink: "Privacy Policy",
      createBtn: "Create Citizen Account",
      creating: "Creating your account...",
      alreadyUser: "Already registered?",
      signIn: "Sign in to your account",
      brandTagline: "Join India's Digital Service Revolution",
      brandDesc: "Get instant access to healthcare, agriculture, and urban services - all in one secure platform.",
      healthcare: "Healthcare Services",
      healthcareSub: "Book appointments, medical records, telemedicine",
      agriculture: "Agriculture Support",
      agricultureSub: "Crop advisories, market prices, alerts",
      urban: "Urban Services",
      urbanSub: "File complaints, track utilities",
      citizens: "Citizens",
      services: "Services",
      uptime: "Uptime"
    },
    hi: {
      createAccount: "खाता बनाएं",
      subtitle: "SmartSetu में शामिल हों",
      fullName: "पूरा नाम",
      fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
      email: "ईमेल पता",
      emailPlaceholder: "citizen@example.com",
      password: "पासवर्ड बनाएं",
      passwordPlaceholder: "न्यूनतम 8 वर्ण",
      passwordHint: "अक्षर, संख्या का उपयोग करें",
      addressLine: "पता",
      addressLinePlaceholder: "अपना पता दर्ज करें",
      state: "राज्य",
      selectState: "राज्य चुनें",
      district: "जिला",
      selectDistrict: "जिला चुनें",
      pincode: "पिनकोड",
      pincodePlaceholder: "6 अंकों का पिनकोड दर्ज करें",
      terms: "मैं SmartSetu की",
      termsLink: "सेवा की शर्तों",
      and: "और",
      privacyLink: "गोपनीयता नीति",
      createBtn: "नागरिक खाता बनाएं",
      creating: "आपका खाता बनाया जा रहा है...",
      alreadyUser: "पहले से पंजीकृत हैं?",
      signIn: "साइन इन करें",
      brandTagline: "भारत की डिजिटल सेवा क्रांति",
      brandDesc: "स्वास्थ्य सेवा, कृषि और शहरी सेवाओं तक पहुंच।",
      healthcare: "स्वास्थ्य सेवाएं",
      healthcareSub: "अपॉइंटमेंट, मेडिकल रिकॉर्ड",
      agriculture: "कृषि सहायता",
      agricultureSub: "फसल सलाह, बाजार मूल्य",
      urban: "शहरी सेवाएं",
      urbanSub: "शिकायतें दर्ज करें",
      citizens: "नागरिक",
      services: "सेवाएं",
      uptime: "अपटाइम"
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #F5EFE6 0%, #FAF4ED 50%, #FFF8F0 100%)'}}>
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <div className="flex items-center gap-2 bg-white rounded-full shadow-lg border" style={{borderColor: '#E5E7EB'}}>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${language === 'en' ? 'text-white shadow-md' : 'text-gray-600'}`}
            style={language === 'en' ? {background: 'linear-gradient(135deg, #8B5A2B 0%, #A67C52 100%)'} : {}}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${language === 'hi' ? 'text-white shadow-md' : 'text-gray-600'}`}
            style={language === 'hi' ? {background: 'linear-gradient(135deg, #8B5A2B 0%, #A67C52 100%)'} : {}}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg className="absolute top-0 left-0 w-full h-full">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#8B5A2B"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Ashoka Chakra - Rotating */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 opacity-5 pointer-events-none animate-spin-slow">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="95" stroke="#8B5A2B" strokeWidth="3"/>
          <circle cx="100" cy="100" r="15" fill="#8B5A2B"/>
          {[...Array(24)].map((_, i) => (
            <line key={i} x1="100" y1="100" x2={100 + 80 * Math.cos((i * 15 * Math.PI) / 180)} y2={100 + 80 * Math.sin((i * 15 * Math.PI) / 180)} stroke="#8B5A2B" strokeWidth="2"/>
          ))}
        </svg>
      </div>

      <div className="relative w-full max-w-6xl flex flex-col lg:flex-row-reverse items-center gap-12 z-10">
        {/* Right Side - Branding */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl" style={{background: 'linear-gradient(135deg, #8B5A2B 0%, #A67C52 100%)'}}>
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-5xl font-bold" style={{color: '#8B5A2B'}}>SmartSetu</h1>
              <p className="text-sm mt-1" style={{color: '#6B7280'}}>Digital Public Infrastructure</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold" style={{color: '#8B5A2B'}}>{t.brandTagline}</h2>
            <p className="text-lg max-w-md mx-auto lg:mx-0" style={{color: '#6B7280'}}>{t.brandDesc}</p>
          </div>

          {/* Service Benefits */}
          <div className="space-y-4 pt-6">
            <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md" style={{borderLeft: '4px solid #2E7D32'}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background: 'rgba(46, 125, 50, 0.1)'}}>
                <svg className="w-7 h-7" style={{color: '#2E7D32'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg mb-1" style={{color: '#8B5A2B'}}>{t.healthcare}</h3>
                <p className="text-sm" style={{color: '#6B7280'}}>{t.healthcareSub}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md" style={{borderLeft: '4px solid #8B5A2B'}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background: 'rgba(139, 90, 43, 0.1)'}}>
                <svg className="w-7 h-7" style={{color: '#8B5A2B'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg mb-1" style={{color: '#8B5A2B'}}>{t.agriculture}</h3>
                <p className="text-sm" style={{color: '#6B7280'}}>{t.agricultureSub}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md" style={{borderLeft: '4px solid #2E7D32'}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background: 'rgba(46, 125, 50, 0.1)'}}>
                <svg className="w-7 h-7" style={{color: '#2E7D32'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg mb-1" style={{color: '#8B5A2B'}}>{t.urban}</h3>
                <p className="text-sm" style={{color: '#6B7280'}}>{t.urbanSub}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="text-center bg-white rounded-xl p-4 shadow-md">
              <div className="text-3xl font-bold" style={{color: '#8B5A2B'}}>50M+</div>
              <div className="text-sm" style={{color: '#6B7280'}}>{t.citizens}</div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-md">
              <div className="text-3xl font-bold" style={{color: '#8B5A2B'}}>15+</div>
              <div className="text-sm" style={{color: '#6B7280'}}>{t.services}</div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-md">
              <div className="text-3xl font-bold" style={{color: '#2E7D32'}}>99.9%</div>
              <div className="text-sm" style={{color: '#6B7280'}}>{t.uptime}</div>
            </div>
          </div>
        </div>

        {/* Left Side - Signup Form */}
        <div className="w-full lg:w-auto lg:min-w-[480px]">
          <div className="bg-white rounded-2xl shadow-2xl p-8" style={{border: '1px solid #E5E7EB'}}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{background: 'linear-gradient(135deg, #8B5A2B 0%, #A67C52 100%)'}}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-2" style={{color: '#8B5A2B'}}>{t.createAccount}</h2>
              <p style={{color: '#6B7280'}}>{t.subtitle}</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{color: '#8B5A2B'}}>{t.fullName}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{color: errors.firstName ? '#DC2626' : '#6B7280'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input type="text" placeholder={t.fullNamePlaceholder} className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all" style={{borderColor: errors.firstName ? '#DC2626' : '#E5E7EB', background: errors.firstName ? '#FEE2E2' : '#F9FAFB'}} onFocus={(e) => !errors.firstName && (e.target.style.borderColor = '#8B5A2B', e.target.style.background = '#FFF')} onBlur={(e) => !errors.firstName && (e.target.style.borderColor = '#E5E7EB', e.target.style.background = '#F9FAFB')} {...register('firstName')} />
                </div>
                {errors.firstName && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.firstName.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{color: '#8B5A2B'}}>{t.email}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{color: errors.emailId ? '#DC2626' : '#6B7280'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input type="email" placeholder={t.emailPlaceholder} className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all" style={{borderColor: errors.emailId ? '#DC2626' : '#E5E7EB', background: errors.emailId ? '#FEE2E2' : '#F9FAFB'}} onFocus={(e) => !errors.emailId && (e.target.style.borderColor = '#8B5A2B', e.target.style.background = '#FFF')} onBlur={(e) => !errors.emailId && (e.target.style.borderColor = '#E5E7EB', e.target.style.background = '#F9FAFB')} {...register('emailId')} />
                </div>
                {errors.emailId && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.emailId.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{color: '#8B5A2B'}}>{t.password}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{color: errors.password ? '#DC2626' : '#6B7280'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input type={showPassword ? "text" : "password"} placeholder={t.passwordPlaceholder} className="w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:outline-none transition-all" style={{borderColor: errors.password ? '#DC2626' : '#E5E7EB', background: errors.password ? '#FEE2E2' : '#F9FAFB'}} onFocus={(e) => !errors.password && (e.target.style.borderColor = '#8B5A2B', e.target.style.background = '#FFF')} onBlur={(e) => !errors.password && (e.target.style.borderColor = '#E5E7EB', e.target.style.background = '#F9FAFB')} {...register('password')} />
                  <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center" style={{color: '#6B7280'}} onClick={() => setShowPassword(!showPassword)} onMouseEnter={(e) => e.currentTarget.style.color = '#8B5A2B'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                    {showPassword ? <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg> : <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                  </button>
                </div>
                {errors.password && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.password.message}</p>}
                <p className="text-xs" style={{color: '#6B7280'}}>{t.passwordHint}</p>
              </div>

              {/* Address Line */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{color: '#8B5A2B'}}>{t.addressLine}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{color: errors.address?.line1 ? '#DC2626' : '#6B7280'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input type="text" placeholder={t.addressLinePlaceholder} className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all" style={{borderColor: errors.address?.line1 ? '#DC2626' : '#E5E7EB', background: errors.address?.line1 ? '#FEE2E2' : '#F9FAFB'}} onFocus={(e) => !errors.address?.line1 && (e.target.style.borderColor = '#8B5A2B', e.target.style.background = '#FFF')} onBlur={(e) => !errors.address?.line1 && (e.target.style.borderColor = '#E5E7EB', e.target.style.background = '#F9FAFB')} {...register('address.line1')} />
                </div>
                {errors.address?.line1 && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.address.line1.message}</p>}
              </div>

              {/* State */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{color: '#8B5A2B'}}>{t.state}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{color: errors.address?.state ? '#DC2626' : '#6B7280'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <select className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all appearance-none" style={{borderColor: errors.address?.state ? '#DC2626' : '#E5E7EB', background: errors.address?.state ? '#FEE2E2' : '#F9FAFB'}} onFocus={(e) => !errors.address?.state && (e.target.style.borderColor = '#8B5A2B', e.target.style.background = '#FFF')} onBlur={(e) => !errors.address?.state && (e.target.style.borderColor = '#E5E7EB', e.target.style.background = '#F9FAFB')} {...register('address.state')} onChange={(e) => { register('address.state').onChange(e); setSelectedState(e.target.value); }}>
                    <option value="">{t.selectState}</option>
                    {Object.keys(STATE_DISTRICT_MAP).map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{color: '#6B7280'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.address?.state && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.address.state.message}</p>}
              </div>

              {/* District */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{color: '#8B5A2B'}}>{t.district}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{color: errors.address?.city ? '#DC2626' : '#6B7280'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <select className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all appearance-none" style={{borderColor: errors.address?.city ? '#DC2626' : '#E5E7EB', background: errors.address?.city ? '#FEE2E2' : '#F9FAFB'}} onFocus={(e) => !errors.address?.city && (e.target.style.borderColor = '#8B5A2B', e.target.style.background = '#FFF')} onBlur={(e) => !errors.address?.city && (e.target.style.borderColor = '#E5E7EB', e.target.style.background = '#F9FAFB')} {...register('address.city')} disabled={!selectedState}>
                    <option value="">{t.selectDistrict}</option>
                    {(STATE_DISTRICT_MAP[selectedState] || []).map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{color: '#6B7280'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.address?.city && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.address.city.message}</p>}
              </div>

              {/* Pincode */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{color: '#8B5A2B'}}>{t.pincode}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{color: errors.address?.pincode ? '#DC2626' : '#6B7280'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input type="text" placeholder={t.pincodePlaceholder} maxLength={6} className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all" style={{borderColor: errors.address?.pincode ? '#DC2626' : '#E5E7EB', background: errors.address?.pincode ? '#FEE2E2' : '#F9FAFB'}} onFocus={(e) => !errors.address?.pincode && (e.target.style.borderColor = '#8B5A2B', e.target.style.background = '#FFF')} onBlur={(e) => !errors.address?.pincode && (e.target.style.borderColor = '#E5E7EB', e.target.style.background = '#F9FAFB')} {...register('address.pincode')} />
                </div>
                {errors.address?.pincode && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.address.pincode.message}</p>}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-2">
                <input type="checkbox" id="terms" required className="w-5 h-5 mt-0.5 rounded cursor-pointer" style={{accentColor: '#8B5A2B'}} />
                <label htmlFor="terms" className="text-sm cursor-pointer" style={{color: '#6B7280'}}>
                  {t.terms} <span className="font-medium" style={{color: '#8B5A2B'}}>{t.termsLink}</span> {t.and} <span className="font-medium" style={{color: '#8B5A2B'}}>{t.privacyLink}</span>
                </label>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} className="w-full mt-6 py-4 px-6 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2" style={{background: 'linear-gradient(135deg, #8B5A2B 0%, #A67C52 100%)'}}>
                {loading ? (<><svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg><span>{t.creating}</span></>) : <span>{t.createBtn}</span>}
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t" style={{borderColor: '#E5E7EB'}}/></div>
                <div className="relative flex justify-center text-sm"><span className="px-4 bg-white font-medium" style={{color: '#6B7280'}}>{t.alreadyUser}</span></div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <NavLink to="/login" className="inline-flex items-center gap-2 font-semibold transition-colors group" style={{color: '#8B5A2B'}}>
                  <span>{t.signIn}</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 60s linear infinite; }
      `}</style>
    </div>
  );
}

export default Signup;