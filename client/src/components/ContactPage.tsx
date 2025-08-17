import { useState } from "react";


function ContactPage() {
     const [isDark, setIsDark] = useState(true);
    
      const toggleTheme = () => {
        setIsDark((prev) => !prev);
        document.documentElement.classList.toggle("dark", !isDark);
      };
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-40 text-gray-900 dark:text-white py-12">
        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full transition"
          aria-label="Toggle dark mode"
        >
          {isDark ? "🌞" : "🌙"}
        </button>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-accent">Get in Touch</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
          Have questions or want to learn more about Code Narrator? Let's talk!
        </p>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-400">Email: <a href="mailto:your@email.com" className="text-accent font-medium">mihretyirga7@gmail.com</a></p>
              <p className="text-gray-600 dark:text-gray-400">Phone: <a href="tel:+251 943630079" className="text-accent font-medium">+251 943630079</a></p>
              <p className="text-gray-600 dark:text-gray-400">Location: Addis Ababa, Ethiopia</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Business Hours</h2>
              <p className="text-gray-600 dark:text-gray-400">Mon - Fri: 9:00 AM – 5:00 PM</p>
              <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
            </div>
          </div>

          {/* Calendly Embed */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Book a Meeting</h2>
            <div className="w-full h-[530px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://calendly.com/mihretyirga7" // Replace with your link
                className="w-full h-full border-none"
                title="Calendly Booking"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
