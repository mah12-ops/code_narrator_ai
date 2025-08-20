// src/pages/ForgotPasswordPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { forgotPassword } from "../../Api/userApi"; // Make sure this API exists
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) return setError("Please enter your email address.");
    setLoading(true);

    try {
      const res = await forgotPassword({ email });
      setMessage(res.message || "Check your email to reset your password.");
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-2xl shadow-xl p-10 max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-emerald-500 mb-6 text-center">
          Forgot Password
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Enter your email address below and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-emerald-500 text-sm">{message}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-semibold transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Remembered your password?{" "}
          <a href="/login" className="text-emerald-500 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default ForgotPasswordPage;
