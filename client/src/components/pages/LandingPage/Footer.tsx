import { Stars } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-4">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          
          {/* Logo + Year */}
          <div className="flex items-center gap-3">
            <Stars className="h-4 w-4" />
            <span>© {new Date().getFullYear()} CodeNarrator App</span>
          </div>

          {/* Small description */}
          <p className="text-center md:text-left">
            AI-powered explanation & narration tool for developers.
          </p>

          {/* Static Info (Not links) */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-purple-400">Terms & Use</span>
            <span className="text-purple-400">Privacy Policy</span>
            <span className="text-purple-400">Security</span>
          </div>
        </div>

        {/* Contact or note */}
        <div className="mt-3 text-center text-xs text-white/40">
          Built for developers who want clarity and speed. Contact: support@codenarrator.dev
        </div>
      </div>
    </footer>
  )
}

export default Footer
