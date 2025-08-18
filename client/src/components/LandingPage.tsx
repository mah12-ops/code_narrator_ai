import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ArrowRight, Play, Github, ShieldCheck, Zap, Wand2, Stars, TerminalSquare, Lock, Rocket, TimerReset, BarChart3, Cpu, CreditCard } from "lucide-react";

// ======= PRODUCTION-READY BLACK-ONLY SAAS LANDING =======
// Tailwind + Framer Motion + Lucide Icons
// Assumes Tailwind is configured. Uses only black background variants with subtle grays.
// Accessible, responsive, animated, and polished.
type BillingCycle = "monthly" | "yearly";
type Plan = "starter" | "pro" | "scale";

const prices = {
  monthly: {
    starter: 9,
    pro: 29,
    scale: 79,
  },
  yearly: {
    starter: 7,
    pro: 24,
    scale: 64,
  },
} as const;

function getPrice(billingCycle: BillingCycle, plan: Plan) {
  return prices[billingCycle][plan];
}

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' | 'yearly'
  const [openFaq, setOpenFaq] = useState<number | null>(0);


   const plans: { name: string; key: Plan; features: string[] }[] = [
    {
      name: "Starter",
      key: "starter",
      features: ["1 Project", "5 GB Storage", "Basic Support"],
    },
    {
      name: "Pro",
      key: "pro",
      features: ["5 Projects", "50 GB Storage", "Priority Support"],
    },
    {
      name: "Scale",
      key: "scale",
      features: ["Unlimited Projects", "1 TB Storage", "Dedicated Support"],
    },
  ];
  const features = [
    { icon: <Wand2 className="w-5 h-5" />, title: "Explain & Narrate", desc: "Turn complex functions into clean, human-friendly explanations." },
    { icon: <TerminalSquare className="w-5 h-5" />, title: "Refactor Safely", desc: "Automated PRs that pass tests and respect your style guides." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Security First", desc: "Never trains on your code. Encryption in transit & at rest." },
    { icon: <Zap className="w-5 h-5" />, title: "Fast by Default", desc: "GPU-accelerated inference and smart caching for snappy UX." },
    { icon: <BarChart3 className="w-5 h-5" />, title: "Insights", desc: "Hotspots, churn, and readability scores across repos." },
    { icon: <Cpu className="w-5 h-5" />, title: "Multi-Provider", desc: "Bring your own keys (OpenAI, Anthropic, Qwen, local)." },
  ];

  const faqs = [
    { q: "Does CodeNarrator read my private code?", a: "Your code stays yours. Processing happens via your configured providers or our secured runtime with strict encryption and zero retention." },
    { q: "Will it change my code without review?", a: "Never. It proposes PRs with diffs, tests, and explanations. You merge when ready." },
    { q: "Can I self-host?", a: "Yes. Docker images and Helm charts are available for private VPC deployments." },
    { q: "What languages are supported?", a: "JavaScript/TypeScript, Python, Go, Java, C#, PHP, and more. The explainer is language-agnostic." },
  ];

  const glow = "before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(60%_60%_at_20%_10%,rgba(20,184,166,0.15),rgba(0,0,0,0))]";

  return (
    <div className="relative min-h-screen bg-black text-white antialiased overflow-x-hidden">
      {/* Skip link */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 bg-white text-white px-3 py-2 rounded-md">Skip to content</a>

      {/* Ambient gradient glows */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.18),transparent_60%)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_60%)]" />

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 grid place-items-center rounded-lg bg-white/5 border border-white/10">
              <Stars className="h-4 w-4" />
            </div>
            <span className="text-xl font-semibold tracking-tight">CodeNarrator</span>
          </div>
          <ul className="hidden list-none md:flex items-center gap-8 text-sm ">
            <li><a className="hover:text-white no-underline text-purple-500 transition " href="#features">Features</a></li>
            <li><a className="hover:text-white no-underline text-purple-500 transition" href="#pricing">Pricing</a></li>
            <li><a className="hover:text-white no-underline text-purple-500 transition" href="#faq">FAQ</a></li>
            <li><a className="hover:text-white no-underline text-purple-500 transition" href="#cta">Get Started</a></li>
          </ul>
          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-white no-underline text-sm hover:bg-white/5 transition">
              <Github className="h-4 w-4" /> Star
            </a>
            <a href="/dashboard" className="group no-underline inline-flex items-center gap-2 rounded-lg bg-purple-300 text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition">
              Launch App <ArrowRight className="h-4 w-4 transition -translate-x-0 group-hover:translate-x-0.5" />
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <main id="main" className="pt-28 md:pt-36">
        <section className={`relative mx-auto max-w-7xl px-6 pb-14 md:pb-24 ${glow}`}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <Sparkles className="h-3.5 w-3.5" /> New: Repo-wide Narration & PR Explains
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Explain, Refactor & <span className="text-purple-400
              ">Elevate</span> Your Code — Instantly
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/70">
              CodeNarrator is your AI assistant that transforms complex code into clear prose, proposes safe refactors, and documents your repo with confidence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/dashboard" className="group no-underline inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-5 py-3 text-sm md:text-base font-semibold hover:bg-white/90 transition shadow-[0_0_0_2px_rgba(255,255,255,0.1)]">
                Try it Free <Play className="h-4 w-4" />
              </a>
              <a href="#demo" className="inline-flex items-center justify-center gap-2 rounded-xl border no-underline border-white/15 bg-white/10 text-purple-500 px-5 py-3 text-sm md:text-base hover:bg-white/10 transition">
                Watch Demo
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              {[
                { icon: <Lock className="h-4 w-4" />, label: "Private by design" },
                { icon: <TimerReset className="h-4 w-4" />, label: "Setup in minutes" },
                { icon: <Rocket className="h-4 w-4" />, label: "Productivity boost" },
                { icon: <ShieldCheck className="h-4 w-4" />, label: "Policy compliant" },
              ].map((i, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }} className="flex items-center gap-2 text-white/70">
                  <div className="rounded-md bg-white/5 p-2 border border-white/10">{i.icon}</div>
                  <span className="text-sm">{i.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Showcase Card */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-12 md:mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-1">
            <div className="rounded-2xl bg-black/80 p-6 md:p-8">
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
                    <a href="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 no-underline transition">Open Playground <ArrowRight className="h-4 w-4" /></a>
                    <a href="#pricing" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 no-underline text-purple-500 transition">See Pricing</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Built for Teams that Ship</h2>
            <p className="mt-3 text-white/70 max-w-2xl mx-auto">Everything you need to explain confusing code, reduce tech debt, and keep the repo healthy without slowing down delivery.</p>
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

        {/* DEMO */}
        <section id="demo" className="relative mx-auto max-w-7xl px-6 py-16">
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

        {/* PRICING */}
        <section id="pricing" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
           <div className="flex items-center bg-gray-900 rounded-full px-2 py-1 mb-12">
        <button
          className={`px-4 py-2 rounded-full text-sm transition ${
            billingCycle === "monthly"
              ? "bg-emerald-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setBillingCycle("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm transition ${
            billingCycle === "yearly"
              ? "bg-emerald-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setBillingCycle("yearly")}
        >
          Yearly <span className="ml-1 text-xs text-emerald-400">-20%</span>
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800 hover:border-emerald-600 transition"
          >
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-4xl font-bold mb-6">
              {/* ${getPrice(billingCycle, plan.key)} */}
              <span className="text-gray-400 text-lg font-normal">
                /{billingCycle === "monthly" ? "mo" : "yr"}
              </span>
            </p>
            <ul className="space-y-3 mb-8 text-gray-300">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-emerald-500">✔</span> {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-medium transition">
              Get Started
            </button>
          </div>
        ))}
      </div>

        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-7xl px-6 py-16">
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
        <section id="faq" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
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
        <section id="cta" className="relative mx-auto max-w-6xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-8 md:p-12">
            <div aria-hidden className="absolute -top-24 -right-12 h-64 w-64 rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.5),transparent_60%)]" />
            <div className="grid md:grid-cols-2 gap-8 items-center">
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
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
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
