import { useState } from "react";

function LandingPage() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDark);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-primary dark:text-accent">CodeNarrator</h1>
        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full transition"
          aria-label="Toggle dark mode"
        >
          {isDark ? "🌞" : "🌙"}
        </button>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-4xl font-extrabold mb-4 leading-tight">
          Understand Code Instantly with <span className="text-primary dark:text-accent">AI</span>
        </h2>
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300 mb-8">
          Paste any code snippet and let AI explain it line by line. Supports multiple languages and designed for fast clarity.
        </p>
        <a
          href="/dashboard"
          className="px-6 py-3 rounded-xl bg-primary dark:bg-accent text-white font-medium shadow-md hover:opacity-90 transition"
        >
          Try It Now →
        </a>
      </main>

      <footer className="text-center text-sm py-6 text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} CodeNarrator AI. Built with ❤️ by Mercy.
      </footer>
    </div>
  );
}

export default LandingPage;
