import { Check, Rocket } from 'lucide-react'


function Finalcta() {
  return (
    <div>
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
    </div>
  )
}

export default Finalcta
