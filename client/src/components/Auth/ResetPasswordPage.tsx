import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Extract token from URL
  const { token } = useParams<{ token: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/auth/reset-password`, {
        token,
        newPassword: password,
      });
      setMessage("✅ Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-xl text-white"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-emerald-400">
          Reset Password
        </h1>

        {message && (
          <p className="mb-4 text-center text-sm text-yellow-400">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition disabled:opacity-50 font-semibold"
          >
            {loading ? "⏳ Resetting..." : "Reset Password"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default ResetPasswordPage;
