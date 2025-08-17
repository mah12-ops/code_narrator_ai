import { useState } from "react";
import ill from "../assets/undraw_vibe-coding_mjme.svg"

function LandingPage() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDark);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
     
        {/* Navbar */}
      <nav className=" flex items-center justify-between px-36 py-2  bg-white dark:bg-gray-800">
        <div className="text-2xl font-bold text-accent">CodeNarrator</div>
        <ul className="flex gap-4 text-md list-none ">
          <li><a href="#features" className="hover:text-accent dark:text-white no-underline  text-gray-700">Features</a></li>
          <li><a href="#demo" className="hover:text-accent no-underline dark:text-white text-gray-700">See in Action</a></li>
          <li><a href="#contact" className="hover:text-accent no-underline dark:text-white text-gray-700">Contact</a></li>
          <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full transition"
          aria-label="Toggle dark mode"
        >
          {isDark ? "🌞" : "🌙"}
        </button>
        </ul>
      </nav>

      {/* Hero Section */}
     <main className="flex flex-col md:flex-row items-center justify-between px-40 py-12 max-w-7xl mx-auto">
  {/* Text Section */}
  <div className="flex-1 text-center md:text-left">
    <h2 className="text-4xl font-extrabold mb-4 leading-tight max-w-3xl">
      Let AI Refactor, Explain & Elevate Your Code
    </h2>
    <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300 mb-8">
      Say goodbye to tech debt. CodeNarrator simplifies, documents, and upgrades your code — automatically.
    </p>
    <div className="flex gap-4 justify-center md:justify-start">
      <a
        href="/dashboard"
        className="px-4 py-3 rounded-xl bg-primary dark:bg-accent text-white font-medium no-underline shadow-lg shadow-black hover:opacity-90 transition"
      >
        Try It Now →
      </a>
      <a
        href="/contact"
        className="px-6 py-3 rounded-xl border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        Contact Us
      </a>
    </div>
  </div>

  {/* Illustration Section */}
  <div className="flex-1 mt-12 md:mt-0 md:ml-12">
    <img
      src={ill} // or use a custom illustration
      alt="Hero Illustration"
      className="w-full h-auto max-w-md mx-auto"
    />
  </div>
</main>
  {/* "See in Action" Section */}
      <section id="demo" className="bg-gray-50 dark:bg-gray-800 py-12 px-6 text-center">
        <h3 className="text-3xl font-bold mb-4">See CodeNarrator in Action</h3>
        <p className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-10">
          Watch how CodeNarrator can instantly refactor and explain your messy code into clean, understandable logic.
        </p>
        <div className="max-w-4xl mx-auto px-36 py-8 aspect-video">
          <iframe
            className="w-full h-80 rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      
      {/* Benefits Section */}
      <section className="px-6 py-16 max-w-5xl mx-auto grid gap-12 text-center">
        <h3 className="text-3xl font-bold">Why Use CodeNarrator?</h3>
        <div className="grid md:grid-cols-2 gap-10 text-left">
          <div>
            <h4 className="text-xl font-semibold mb-2">🔧 Smart Code Maintenance</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Automatically detect and fix issues in your codebase. Receive clean, production-ready PRs with minimal effort.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">📈 Higher Code Quality</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Adheres to industry standards and project-specific rules like linters and style guides.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">👥 Easier Onboarding</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Help new developers understand your codebase quickly through AI-generated explanations and summaries.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">⏱️ Save Time & Boost Focus</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Spend less time searching and more time building. CodeNarrator speeds up your dev workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 text-center px-6">
        <h3 className="text-3xl font-bold mb-4">Your AI Code Communicator</h3>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300 mb-6">
          CodeNarrator translates complex code into plain English — perfect for documentation, reviews, or quick understanding.
        </p>
        <a
          href="/dashboard"
          className="px-4 py-3 no-underline bg-primary dark:bg-accent text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
        >
          Start Refactoring →
        </a>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-6 text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} CodeNarrator. Built with ❤️ by Mercy.
      </footer>
    </div>
  );
}

export default LandingPage;
