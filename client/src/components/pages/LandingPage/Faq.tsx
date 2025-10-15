import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight} from "lucide-react";


function Faq() {
const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = [
    { q: "Does CodeNarrator read my private code?", a: "Your code stays yours. Processing happens via your configured providers or our secured runtime with strict encryption and zero retention." },
    { q: "Will it change my code without review?", a: "Never. It proposes PRs with diffs, tests, and explanations. You merge when ready." },
    { q: "Can I self-host?", a: "Yes. Docker images and Helm charts are available for private VPC deployments." },
    { q: "What languages are supported?", a: "JavaScript/TypeScript, Python, Go, Java, C#, PHP, and more. The explainer is language-agnostic." },
  ];

  return (
    <div>
       {/* FAQ */}
        <section id="faq" className="mx-auto max-w-5xl px-24 py-16 md:py-24">
          <h3 className="text-3xl font-bold text-center">Frequently asked questions</h3>
          <div className="mt-8 divide-y divide-purple-300 border border-white/10 rounded-2xl overflow-hidden">
            {faqs.map((f, idx) => (
              <div key={f.q} className="bg-black">
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

    </div>
  )
}

export default Faq
