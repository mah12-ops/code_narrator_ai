import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

function ContactPage() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDark);
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6 md:px-20">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="bg-gray-800 p-2 rounded-full absolute top-6 right-6 hover:bg-gray-700 transition"
        aria-label="Toggle dark mode"
      >
        {isDark ? "🌞" : "🌙"}
      </button>

      <div className="max-w-7xl mx-auto text-center">
        {/* Hero Section */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-teal-400 via-emerald-500 to-cyan-400 text-transparent bg-clip-text"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-16"
        >
          Have questions about <span className="text-teal-400">Code Narrator</span>?  
          Let’s talk — we’d love to hear from you.
        </motion.p>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-left"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">
                Contact Information
              </h2>
              <p className="flex items-center gap-3 text-gray-300">
                <Mail className="text-teal-400" size={20} />
                <a
                  href="mailto:mihretyirga7@gmail.com"
                  className="hover:text-cyan-400 transition"
                >
                  mihretyirga7@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-3 text-gray-300">
                <Phone className="text-teal-400" size={20} />
                <a
                  href="tel:+251943630079"
                  className="hover:text-cyan-400 transition"
                >
                  +251 943630079
                </a>
              </p>
              <p className="flex items-center gap-3 text-gray-300">
                <MapPin className="text-teal-400" size={20} />
                Addis Ababa, Ethiopia
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">
                Business Hours
              </h2>
              <p className="text-gray-400">Mon - Fri: 9:00 AM – 5:00 PM</p>
              <p className="text-gray-400">Sunday: Closed</p>
            </div>

            {/* CTA */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:mihretyirga7@gmail.com"
              className="inline-block px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-black font-semibold rounded-xl shadow-md hover:shadow-lg transition"
            >
              📩 Send Us an Email
            </motion.a>
          </motion.div>

          {/* Right: Calendly Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-teal-400">
              <Calendar size={22} /> Book a Meeting
            </h2>
            <div className="w-full h-[530px] bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800">
              <iframe
                src="https://calendly.com/mihretyirga7"
                className="w-full h-full border-none"
                title="Calendly Booking"
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
