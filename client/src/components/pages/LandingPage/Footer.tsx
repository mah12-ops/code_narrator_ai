import { Stars } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-28">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
         
          <div className="flex items-center gap-3">
            <Stars className="h-4 w-4" />
            <span>© {new Date().getFullYear()} CodeNarrator App</span>
          </div>

          {/* Small description */}
          <p className="text-center md:text-left">
            AI-powered code narration and explanation tool.
          </p>

          {/* Replaced block */}
          <div className="flex flex-col mr-12 md:flex-col items-center gap-2 md:gap-4">
            <span className="text-purple-300">Version 1.0.0</span>
            <span className="text-purple-300">Made with ❤️ by Devs</span>
            <span className="text-purple-300">All rights reserved</span>
          </div>
        </div>

        {/* Contact */}
    <div className="mt-4 text-center text-xs text-white/40">
  Contact:{' '}
  <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=mihretyirga7@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-purple-300 hover:text-white no-underline"
  >
    CodeNarrator developer
  </a>
</div>



      </div>
    </footer>
  )
}

export default Footer
