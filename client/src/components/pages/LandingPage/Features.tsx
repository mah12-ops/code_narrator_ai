import { motion } from "framer-motion";
import {  ShieldCheck, Zap, Wand2, TerminalSquare,BarChart3, Cpu} from "lucide-react";

 const features = [
    { icon: <Wand2 className="w-5 h-5" />, title: "Explain & Narrate", desc: "Turn complex functions into clean, human-friendly explanations." },
    { icon: <TerminalSquare className="w-5 h-5" />, title: "Refactor Safely", desc: "Automated PRs that pass tests and respect your style guides." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Security First", desc: "Never trains on your code. Encryption in transit & at rest." },
    { icon: <Zap className="w-5 h-5" />, title: "Fast by Default", desc: "GPU-accelerated inference and smart caching for snappy UX." },
    { icon: <BarChart3 className="w-5 h-5" />, title: "Insights", desc: "Hotspots, churn, and readability scores across repos." },
    { icon: <Cpu className="w-5 h-5" />, title: "Multi-Provider", desc: "Bring your own keys (OpenAI, Anthropic, Qwen, local)." },
  ];

function Features() {
  return (
    <div>
       {/* FEATURES */}
        <section id="features" className="mx-auto max-w-7xl px-20 py-4 md:py-8">
          <div className="mb-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Built for Teams that Ship</h2>
            <p className=" text-white/70 max-w-2xl mx-auto">Everything you need to explain confusing code, reduce tech debt, and keep the repo healthy without slowing down delivery.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.07] transition">
                <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/60 px-3 py-1 text-xs text-white/70">
                  {f.icon} <span>{f.title}</span>
                </div>
                <p className="text-white/80 leading-relaxed">{f.desc}</p>
                <div aria-hidden className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition" />
              </motion.div>
            ))}
          </div>
        </section>
    </div>
  )
}

export default Features
