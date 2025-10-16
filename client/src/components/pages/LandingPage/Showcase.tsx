
import { motion, } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";



const glow = "before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(60%_60%_at_20%_10%,rgba(20,184,166,0.15),rgba(0,0,0,0))] before:pointer-events-none";
 export const Showcase = () => {
  return (
    <div>
      <main id="main" className="pt-28 md:pt-6">
        <section className={`relative mx-auto max-w-7xl px-6 pb-14 md:pb-24 ${glow}`}>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-12 md:mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-1">
            <div className="rounded-2xl bg-black/80 px-8 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Code Sample */}
                <div className="relative">
                  <div className="absolute -inset-2 -z-10 rounded-xl blur-2xl opacity-20 bg-[conic-gradient(at_bottom_left,_rgba(20,184,166,0.6),_transparent_40%)]" />
                  <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-4">
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span>utils/format.ts</span>
                      <span>TS • 84 lines</span>
                    </div>
                    <pre className="mt-3 text-[11px] leading-5 text-white/80 overflow-x-auto"><code>{`export function formatMoney(v: number) {
  const f = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' });
  return f.format(v);
}

// Anti-pattern: deeply nested conditions
export function canUserAccess(user, resource) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (resource?.ownerId && user.id === resource.ownerId) return true;
  return !!user?.permissions?.includes('read');
}`}</code></pre>
                  </div>
                </div>
                {/* Narration */}
                <div className="flex flex-col justify-center gap-4">
                  <h3 className="text-2xl font-semibold">Readable Narration & Safer Refactors</h3>
                  <p className="text-white/70">We parse complex functions and describe them like a senior dev would in a PR — then suggest smaller, tested changes you can merge with confidence.</p>
                  <ul className="grid gap-2 text-sm">
                    {[
                      "Explains intent, edge-cases and complexity",
                      "Proposes refactors with before/after diffs",
                      "Respects linters, tests, and CI",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-teal-400" />
                        <span className="text-white/80">{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex gap-3">
                    <Link to="/signup" className="inline-flex items-center gap-2 rounded-lg bg-purple-300 text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 no-underline transition">Open Playground </Link>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        </main>
    </div>
  )
}


