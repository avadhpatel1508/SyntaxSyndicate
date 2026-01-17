import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router";
import { loginUser } from "../authSlice";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const loginSchema = z.object({
  emailId: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("en");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  // 🔐 Firebase → Backend login
  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.emailId,
        data.password
      );

      const firebaseIdToken = await userCredential.user.getIdToken();

      dispatch(loginUser({ firebaseIdToken }));
    } catch (err) {
      console.error("Firebase login failed", err);
    }
  };

  const t = {
    title: language === "en" ? "Welcome Back" : "वापसी पर स्वागत है",
    subtitle:
      language === "en"
        ? "Sign in to access your services"
        : "अपनी सेवाओं तक पहुंचने के लिए साइन इन करें",
    email: language === "en" ? "Email Address" : "ईमेल पता",
    password: language === "en" ? "Password" : "पासवर्ड",
    signIn: language === "en" ? "Sign In Securely" : "सुरक्षित रूप से साइन इन करें",
    signingIn:
      language === "en" ? "Authenticating..." : "प्रमाणीकरण हो रहा है...",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5EFE6] via-[#FAF4ED] to-[#FFF8F0] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">

        {/* Language Toggle */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-full text-sm ${
              language === "en"
                ? "bg-[#8B5A2B] text-white"
                : "text-gray-600"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("hi")}
            className={`px-3 py-1 rounded-full text-sm ${
              language === "hi"
                ? "bg-[#8B5A2B] text-white"
                : "text-gray-600"
            }`}
          >
            हिंदी
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-[#8B5A2B]">
          {t.title}
        </h2>
        <p className="text-center text-gray-600 mb-6">{t.subtitle}</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#8B5A2B]">
              {t.email}
            </label>
            <input
              type="email"
              {...register("emailId")}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 
                         bg-white text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]"
              placeholder="citizen@example.com"
            />
            {errors.emailId && (
              <p className="text-xs text-red-600 mt-1">
                {errors.emailId.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#8B5A2B]">
              {t.password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 
                           bg-white text-gray-900 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold
                       bg-gradient-to-r from-[#8B5A2B] to-[#A67C52]
                       hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? t.signingIn : t.signIn}
          </button>
        </form>

        {/* Signup */}
        <p className="text-center text-sm text-gray-600 mt-6">
          New to SmartSetu?{" "}
          <NavLink to="/signup" className="text-[#8B5A2B] font-semibold">
            Create Account
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
