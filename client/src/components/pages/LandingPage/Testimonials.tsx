import { motion} from "framer-motion";

function Testimonials() {
  return (
    <div>
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
                <div className="mt-4 text-sm text-white/60">— Engineers</div>
              </motion.blockquote>
            ))}
          </div>
        </section>

    </div>
  )
}

export default Testimonials
