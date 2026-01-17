import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, NavLink } from "react-router";

// 🔥 Firebase
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak"),
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  // ✅ EMAIL SIGNUP + VERIFICATION ONLY
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const { firstName, emailId, password } = data;

      // 1️⃣ Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailId,
        password
      );

      // 2️⃣ Send email verification
      await sendEmailVerification(userCredential.user);

      alert("Verification email sent. Please verify your email.");

      // 3️⃣ Wait for email verification
      const interval = setInterval(async () => {
        await auth.currentUser.reload();

        if (auth.currentUser.emailVerified) {
          clearInterval(interval);

          // 🔥 DO NOT CALL BACKEND HERE
          // Move to phone verification
          navigate("/verify-phone", {
            state: {
              firstName,
            },
          });
        }
      }, 3000);

    } catch (err) {
      console.error(err);
      alert(err.message || "Signup failed");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(to bottom right, #fff7ed, #fffbeb, #fefce8)",
      }}
    >
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-2"
            style={{
              background: "linear-gradient(to right, #ea580c, #d97706)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create Account
          </h1>
          <p className="text-gray-600 text-sm">
            Verify your email to continue
          </p>
        </div>

        {/* Card */}
        <div className="bg-blue/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-xl bg-amber-600"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-yellow-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border rounded-xl bg-amber-400"
                {...register("emailId")}
              />
              {errors.emailId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.emailId.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-xl bg-amber-500"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Toggle password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-orange-600"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white font-semibold rounded-xl shadow-md bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <NavLink to="/login" className="text-orange-600 font-semibold">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
