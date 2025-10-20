import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Stars, Menu, X } from "lucide-react";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
    { name: "Get Started", href: "#cta" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20 py-4 flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 grid place-items-center rounded-lg bg-white/5 border border-white/10">
            <Stars className="h-4 w-4" />
          </div>
          <span className="text-xl font-semibold tracking-tight">CodeNarrator</span>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="hover:text-white text-purple-500">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/mah12-ops/code_narrator_ai.git"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-white text-sm hover:bg-white/5 transition"
          >
            <Github className="h-4 w-4" /> Star
          </a>

          <Link
            to="/login"
            className="hidden md:inline-flex group no-underline items-center gap-2 rounded-lg bg-purple-300 text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
          >
            Try Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/90 border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-purple-500 hover:text-white text-base font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://github.com/mah12-ops/code_narrator_ai.git"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-white text-sm hover:bg-white/5 transition"
          >
            <Github className="h-4 w-4" /> Star
          </a>
          <Link
            to="/login"
            className="group no-underline inline-flex items-center gap-2 rounded-lg bg-purple-300 text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
          >
            Try Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
