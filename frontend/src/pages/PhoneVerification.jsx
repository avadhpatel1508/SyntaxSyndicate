import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";
import axiosClient from "../utils/axiosClient";

function PhoneVerification() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const recaptchaRef = useRef(null);
  const confirmationRef = useRef(null);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { firstName } = state || {};

  if (!firstName) navigate("/signup");

  // ✅ Correct reCAPTCHA init
const initRecaptcha = async () => {
  if (!recaptchaRef.current) {
    recaptchaRef.current = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    await recaptchaRef.current.render(); // 🔥 REQUIRED
  }
};

  // 🔹 SEND OTP
  const sendOtp = async () => {
  try {
    setLoading(true);
    await initRecaptcha();

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      "+91" + mobile,
      recaptchaRef.current
    );

    confirmationRef.current = confirmationResult;
    setStep(2);
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
};


  // 🔹 VERIFY OTP + REGISTER USER
  const verifyOtp = async () => {
    try {
      setLoading(true);

      const result = await confirmationRef.current.confirm(otp);
      const firebaseIdToken = await result.user.getIdToken();

      await axiosClient.post("/user/register", {
        firebaseIdToken,
        firstName,
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 space-y-4">

        <h2 className="text-xl font-bold text-center">Verify Mobile</h2>

        {step === 1 && (
          <div className="flex gap-2">
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number"
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              onClick={sendOtp}
              disabled={loading || mobile.length !== 10}
              className="bg-orange-600 text-white px-4 rounded"
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border px-3 py-2 rounded"
            />
            <button
              onClick={verifyOtp}
              disabled={otp.length !== 6}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* 🔥 MUST ALWAYS EXIST */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}

export default PhoneVerification;
