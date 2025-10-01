// // src/pages/SignupPage.tsx
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { signup } from "../../Api/userApi";
// import { useNavigate } from "react-router-dom";

// function SignupPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!name || !email || !password) return setError("All fields are required");
//     setLoading(true);

//     try {
//       const data = await signup({ name, email, password });
//       localStorage.setItem("token", data.token);
//       navigate("/login");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black px-4">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gray-900 rounded-2xl shadow-xl p-10 max-w-md w-full"
//       >
//         <h1 className="text-3xl font-bold text-emerald-500 mb-6 text-center">
//           Sign Up
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
//           />
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-semibold transition disabled:opacity-50"
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </motion.button>
//         </form>
//         <p className="text-gray-400 text-sm mt-4 text-center">
//           Already have an account?{" "}
//           <a href="/login" className="text-emerald-500 hover:underline">
//             Login
//           </a>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

// export default SignupPage;
