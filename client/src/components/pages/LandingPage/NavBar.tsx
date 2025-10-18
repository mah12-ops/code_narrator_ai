import { Link } from "react-router-dom";
import { ArrowRight, Github, Stars } from "lucide-react";

const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 grid place-items-center rounded-lg bg-white/5 border border-white/10">
            <Stars className="h-4 w-4" />
          </div>
          <span className="text-xl font-semibold tracking-tight">CodeNarrator</span>
        </div>

        <ul className="hidden list-none md:flex items-center gap-8 text-sm">
          <li><a href="#features" className="hover:text-white text-purple-500">Features</a></li>
          <li><a href="#faq" className="hover:text-white text-purple-500">FAQ</a></li>
          <li><a href="#cta" className="hover:text-white text-purple-500">Get Started</a></li>
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/mah12-ops/code_narrator_ai.git"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-white text-sm hover:bg-white/5 transition"
          >
            <Github className="h-4 w-4" /> Star
          </a>

          {/* ✅ Use Link instead of <a> */}
          <Link
            to="/login"
            className="group no-underline inline-flex items-center gap-2 rounded-lg bg-purple-300 text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
          >
            Try Now
            <ArrowRight className="h-4 w-4 transition -translate-x-0 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
