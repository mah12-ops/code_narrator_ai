import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {  Play } from "lucide-react";

const glow = "before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(60%_60%_at_20%_10%,rgba(20,184,166,0.15),rgba(0,0,0,0))]";

const Hero = () => {
  return (
    <div>
      <main id="main" className="pt-28 md:pt-36">
        <section className={`relative mx-auto max-w-7xl px-6 pb-14 md:pb-24 ${glow}`}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            {/* ...other content... */}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/login"
                className="group no-underline inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-5 py-3 text-sm md:text-base font-semibold hover:bg-white/90 transition shadow-[0_0_0_2px_rgba(255,255,255,0.1)]"
              >
                Try it Free <Play className="h-4 w-4" />
              </Link>

              <button
                onClick={() => {
                  const el = document.getElementById("demo");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border no-underline border-white/15 bg-white/10 text-purple-500 px-5 py-3 text-sm md:text-base hover:bg-white/10 transition"
              >
                Watch Demo
              </button>
            </div>

            {/* ...rest of code... */}
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Hero;
