import { motion } from "framer-motion";

const testimonialData = [
  {
    name: "Samuel Getachew",
    role: "Frontend Developer",
    comment: "Cut our review time by ~40%. The narrated diffs are *chef's kiss* and new hires grok the codebase in days."
  },
  {
    name: "Sara Bekele",
    role: "Backend Developer",
    comment: "CodeNarrator explains complex logic in seconds. It’s like having a senior dev beside you at all times."
  },
  {
    name: "Daniel Tekle",
    role: "Fullstack Engineer",
    comment: "Absolutely love how the AI summarizes pull requests. Our onboarding speed improved dramatically."
  }
];

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-10 md:px-32 py-16">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold">Loved by pragmatic teams</h3>
        <p className="mt-2 text-white/70">What engineers say after shipping with CodeNarrator</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonialData.map((t, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="relative rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col items-start gap-4"
          >
            {/* Pseudo avatar */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                {t.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="text-white/80 font-semibold">{t.name}</div>
                <div className="text-xs text-white/50">{t.role}</div>
              </div>
            </div>
            <p className="text-white/80 text-sm">“{t.comment}”</p>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
