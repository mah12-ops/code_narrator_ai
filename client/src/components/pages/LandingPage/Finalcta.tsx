import { Check, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

function Finalcta() {
  return (
    <section
      id="cta"
      className="relative mx-auto max-w-6xl px-6 sm:px-8 md:px-12 pb-24"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-6 md:p-12">
        <div
          aria-hidden
          className="absolute -top-24 -right-12 h-64 w-64 rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.5),transparent_60%)]"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Text + CTA */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl md:text-4xl text-purple-100 font-bold">
              Ready to narrate your codebase?
            </h3>
            <p className="text-white/80 text-sm md:text-base">
              Spin up CodeNarrator, connect your repos, and let AI generate explains, PR summaries and docs — without changing your workflow.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-300 text-black px-4 md:px-5 py-2 md:py-3 text-sm font-semibold hover:bg-purple-400 no-underline transition"
              >
                Start Free <Rocket className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 md:px-5 py-2 md:py-3 text-sm hover:bg-white/10 no-underline text-purple-300 transition"
              >
                Talk to Devs
              </Link>
            </div>
          </div>

          {/* Features list */}
          <div className="flex flex-col gap-2 md:gap-3">
            {[
              "No credit card required",
              "Granular repo permissions",
              "Bring your own model keys",
              "Self-host or SaaS",
            ].map((x) => (
              <div
                key={x}
                className="flex items-start gap-2 text-sm md:text-base"
              >
                <Check className="mt-0.5 h-4 w-4 text-teal-400" />
                <span className="text-white/80">{x}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Finalcta;
