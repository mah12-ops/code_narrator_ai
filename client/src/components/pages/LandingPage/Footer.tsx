import { Stars } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/80">
      <div className="mx-auto py-8 px-6 sm:px-8 lg:px-28 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-white/60">
          
          {/* Branding */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Stars className="h-5 w-5 text-purple-300" />
            <span>© {new Date().getFullYear()} CodeNarrator App</span>
          </div>

          {/* Small description */}
          <p className="text-center md:text-left text-white/70">
            AI-powered code narration and explanation tool.
          </p>

          {/* Info block */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <span className="text-white/80 font-medium">Version 1.0.0</span>
            <span className="text-white/80">Made with ❤️ by Devs</span>
            <span className="text-white/80">All rights reserved</span>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-6 text-center text-xs text-white/40">
          Contact:{' '}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mihretyirga7@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-white transition-colors"
          >
            CodeNarrator developer
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
