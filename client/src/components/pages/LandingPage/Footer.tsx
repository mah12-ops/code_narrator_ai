import { Stars } from 'lucide-react'


const Footer = () => {
  return (
    <div>
         <footer className="border-t border-white/10 py-4">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-evenly gap-4 text-sm text-white/60">
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
  )
}

export default Footer
