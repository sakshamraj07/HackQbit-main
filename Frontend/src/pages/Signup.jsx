import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import signupBg from "../assets/bg.png";
import { useAuth } from "../context/AuthContext.jsx";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await signup(name, username, email, password);
      setMessage({
        type: "success",
        text: "Signup successful! Redirecting to login...",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative text-black">
      <img
        src={signupBg}
        alt="abstract background"
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
      />

      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 backdrop-blur-xl bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/20 w-96 mt-12 flex flex-col justify-center"
      >
        <h2 className="text-4xl font-extrabold text-cyan-500/80 mb-6 text-center tracking-wide drop-shadow-lg">
          Create an Account
        </h2>
        <p className="text-center text-black mb-8">
          Join Healthcare to get started
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            className="px-5 py-3 rounded-xl bg-white text-black placeholder-gray-500 border border-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="px-5 py-3 rounded-xl bg-white text-black placeholder-gray-500 border border-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="px-5 py-3 rounded-xl bg-white text-black placeholder-gray-500 border border-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-5 py-3 rounded-xl bg-white text-black placeholder-gray-500 border border-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-cyan-500/80 hover:bg-cyan-600 text-white font-semibold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing up...
              </div>
            ) : (
              "Signup"
            )}
          </button>
        </form>

        {message.text && (
          <p
            className={`mt-6 text-center text-sm font-medium ${
              message.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message.text}
          </p>
        )}

        <p className="mt-8 text-center text-black text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-500/80 underline font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
