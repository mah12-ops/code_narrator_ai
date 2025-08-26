import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ArrowRight, Play, Github, ShieldCheck, Zap, Wand2, Stars, TerminalSquare, Lock, Rocket, TimerReset, BarChart3, Cpu, CreditCard } from "lucide-react";
import NavBar from "./LandingPage/NavBar";
import Hero from "./LandingPage/Hero";
import { Showcase } from "./LandingPage/Showcase";
import Features from "./LandingPage/Features";
import Demo from "./LandingPage/Demo";

export default function LandingPage() {
  
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = [
    { q: "Does CodeNarrator read my private code?", a: "Your code stays yours. Processing happens via your configured providers or our secured runtime with strict encryption and zero retention." },
    { q: "Will it change my code without review?", a: "Never. It proposes PRs with diffs, tests, and explanations. You merge when ready." },
    { q: "Can I self-host?", a: "Yes. Docker images and Helm charts are available for private VPC deployments." },
    { q: "What languages are supported?", a: "JavaScript/TypeScript, Python, Go, Java, C#, PHP, and more. The explainer is language-agnostic." },
  ];

  const glow = "before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(60%_60%_at_20%_10%,rgba(20,184,166,0.15),rgba(0,0,0,0))]";

  return (
    <div className="relative min-h-screen bg-black text-white antialiased overflow-x-hidden">
     {/* Ambient gradient glows */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.18),transparent_60%)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_60%)]" />

           <NavBar />
              <main>
           <Hero />
           <Showcase />
           <Features />
           <Demo />
       

       
    

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-7xl px-32 py-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold">Loved by pragmatic teams</h3>
            <p className="mt-2 text-white/70">What engineers say after shipping with CodeNarrator</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <motion.blockquote key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-white/80">
                  “Cut our review time by ~40%. The narrated diffs are *chef's kiss* and new hires grok the codebase in days.”
                </p>
                <div className="mt-4 text-sm text-white/60">— Senior Engineer, Fintech</div>
              </motion.blockquote>
            ))}
          </div>
        </section>



        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-5xl px-24 py-16 md:py-24">
          <h3 className="text-3xl font-bold text-center">Frequently asked questions</h3>
          <div className="mt-8 divide-y divide-purple-300 border border-white/10 rounded-2xl overflow-hidden">
            {faqs.map((f, idx) => (
              <div key={f.q} className="bg-purple-300">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="font-medium">{f.q}</span>
                  <AnimatePresence initial={false}>
                    {openFaq === idx ? (
                      <motion.span initial={{ rotate: 0 }} animate={{ rotate: 180 }} exit={{ rotate: 0 }}><ArrowRight className="h-4 w-4"/></motion.span>
                    ) : (
                      <motion.span initial={{ rotate: 180 }} animate={{ rotate: 0 }} exit={{ rotate: 180 }}><ArrowRight className="h-4 w-4"/></motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 pb-4 text-white/80">
                      {f.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>



        {/* FINAL CTA */}
        <section id="cta" className="relative mx-auto max-w-6xl px-28 pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-8 md:p-12">
            <div aria-hidden className="absolute -top-24 -right-12 h-64 w-64 rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.5),transparent_60%)]" />
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold">Ready to narrate your codebase?</h3>
                <p className="mt-3 text-white/80">Spin up CodeNarrator, connect your repos, and let AI generate explains, PR summaries and docs — without changing your workflow.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 no-underline transition">Start Free <Rocket className="h-4 w-4"/></a>
                  <a href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm hover:bg-white/10 no-underline text-purple-500 transition">Talk to Sales</a>
                </div>
              </div>
              <div className="md:justify-self-end">
                <ul className="grid gap-3 text-sm">
                  {[
                    "No credit card required",
                    "Granular repo permissions",
                    "Bring your own model keys",
                    "Self-host or SaaS",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-teal-400"/> <span className="text-white/80">{x}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-4">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-evenly gap-4 text-sm text-white/60">
            <div className="flex items-center gap-3">
              <Stars className="h-4 w-4" />
              <span>© {new Date().getFullYear()} CodeNarrator — Built with ❤ by Mercy</span>
            </div>
            <div className="flex items-center  gap-6">
              <a className="hover:text-white text-purple-500 no-underline " href="#">Terms</a>
              <a className="hover:text-white text-purple-500 no-underline " href="#">Privacy</a>
              <a className="hover:text-white text-purple-500 no-underline " href="#">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
