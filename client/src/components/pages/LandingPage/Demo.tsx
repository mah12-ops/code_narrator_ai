import { motion} from "framer-motion";
import {  ShieldCheck, Lock, CreditCard } from "lucide-react";

function Demo() {
  return (
    <div>
       {/* DEMO */}
        <section id="demo" className="relative mx-auto max-w-7xl px-28 py-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-semibold">Watch it work on real code</h3>
              <p className="mt-3 text-white/70">Refactor explanations, PR summaries, and documentation pages are generated in seconds. No secrets leave your control.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/60">
                <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1"><Lock className="h-3.5 w-3.5"/> SOC2-ready</span>
                <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1"><CreditCard className="h-3.5 w-3.5"/> BYO Keys</span>
                <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1"><ShieldCheck className="h-3.5 w-3.5"/> Role-aware</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 md:order-2">
              <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] p-3 shadow-2xl">
                <div className="aspect-video w-full rounded-xl overflow-hidden">
                  <iframe className="h-full w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="CodeNarrator Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="pointer-events-none absolute -inset-px rounded-2xl ring-1 ring-white/10" />
              </div>
            </motion.div>
          </div>
        </section>

    </div>
  )
}

export default Demo
