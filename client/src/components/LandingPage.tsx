import { useState } from "react";
import { motion } from "framer-motion";
import ill from "../assets/undraw_vibe-coding_mjme.svg";

function LandingPage() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDark);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-500 font-inter">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 px-6 md:px-36 py-3 flex items-center justify-between">
        <div className="text-2xl font-extrabold text-accent">CodeNarrator</div>
        <ul className="flex items-center gap-6 text-md">
          <li>
            <a href="#features" className="hover:text-accent transition-colors">
              Features
            </a>
          </li>
          <li>
            <a href="#demo" className="hover:text-accent transition-colors">
              See in Action
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-accent transition-colors">
              Contact
            </a>
          </li>
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-transform hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {isDark ? "🌞" : "🌙"}
          </button>
        </ul>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 flex flex-col md:flex-row items-center justify-between px-6 md:px-40 py-12 max-w-7xl mx-auto">
        {/* Text Section */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Let AI Refactor, Explain & <span className="text-accent">Elevate</span> Your Code
          </h2>
          <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300 mb-10">
            Say goodbye to tech debt. CodeNarrator simplifies, documents, and upgrades your code — automatically.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-primary dark:bg-accent text-white font-semibold no-underline shadow-lg shadow-black/20 hover:shadow-xl transition"
            >
              Try It Now →
            </motion.a>
            <a
              href="/contact"
              className="px-6 py-3 rounded-xl border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Contact Us
            </a>
          </div>
        </motion.div>

        {/* Illustration Section */}
        <motion.div
          className="flex-1 mt-12 md:mt-0 md:ml-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={ill}
            alt="Hero Illustration"
            className="w-full h-auto max-w-md mx-auto"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>
      </main>

      {/* "See in Action" Section */}
      <section id="demo" className="bg-gray-50 dark:bg-gray-800 py-20 px-6 text-center">
        <motion.h3
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          See CodeNarrator in Action
        </motion.h3>
        <p className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-10">
          Watch how CodeNarrator can instantly refactor and explain your messy code into clean, understandable logic.
        </p>
        <div className="max-w-4xl mx-auto aspect-video">
          <iframe
            className="w-full h-96 rounded-2xl shadow-xl"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24 max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-12">Why Use CodeNarrator?</h3>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            { title: "🔧 Smart Code Maintenance", desc: "Automatically detect and fix issues in your codebase with production-ready PRs." },
            { title: "📈 Higher Code Quality", desc: "Adheres to industry standards and rules like linters and style guides." },
            { title: "👥 Easier Onboarding", desc: "AI-generated explanations help new devs understand the codebase quickly." },
            { title: "⏱️ Save Time & Boost Focus", desc: "Spend less time debugging, more time building." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="bg-gradient-to-r from-primary to-accent py-20 text-center text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-4xl font-bold mb-4">Your AI Code Communicator</h3>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          CodeNarrator translates complex code into plain English — perfect for documentation, reviews, or quick understanding.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="/dashboard"
          className="px-6 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-gray-100 transition"
        >
          Start Refactoring →
        </motion.a>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-sm py-8 text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} CodeNarrator. Built with ❤️ by Mercy.
      </footer>
    </div>
  );
}

export default LandingPage;
