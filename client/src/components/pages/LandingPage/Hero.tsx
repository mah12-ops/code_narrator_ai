
import { motion, } from "framer-motion";
import {  Sparkles,  Play,  ShieldCheck, Lock, Rocket, TimerReset } from "lucide-react";


const glow = "before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(60%_60%_at_20%_10%,rgba(20,184,166,0.15),rgba(0,0,0,0))]";

const Hero = () => {
  return (
    <div>
      <main id="main" className="pt-28 md:pt-36">
        <section className={`relative mx-auto max-w-7xl px-6 pb-14 md:pb-24 ${glow}`}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <Sparkles className="h-3.5 w-3.5" /> New: Repo-wide Narration & PR Explains
            </div>
            <h1 className="mt-6 text-4xl px-12 md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Explain, Refactor & <span className="text-purple-400
              ">Elevate</span> Your Code Instantly
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/70">
              CodeNarrator is your AI assistant that transforms complex code into clear prose, proposes safe refactors, and documents your repo with confidence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/login" className="group no-underline inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-5 py-3 text-sm md:text-base font-semibold hover:bg-white/90 transition shadow-[0_0_0_2px_rgba(255,255,255,0.1)]">
                Try it Free <Play className="h-4 w-4" />
              </a>
              <a href="#demo" className="inline-flex items-center justify-center gap-2 rounded-xl border no-underline border-white/15 bg-white/10 text-purple-500 px-5 py-3 text-sm md:text-base hover:bg-white/10 transition">
                Watch Demo
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 py-12 px-20  text-left">
              {[
                { icon: <Lock className="h-4 w-4" />, label: "Private by design" },
                { icon: <TimerReset className="h-4 w-4" />, label: "Setup in minutes" },
                { icon: <Rocket className="h-4 w-4" />, label: "Productivity boost" },
                { icon: <ShieldCheck className="h-4 w-4" />, label: "Policy compliant" },
              ].map((i, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }} className="flex items-center gap-2 text-white/70">
                  <div className="rounded-md bg-white/5  border border-white/10">{i.icon}</div>
                  <span className="text-sm">{i.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </section>
        </main>
    </div>
  )
}

export default Hero
