import NavBar from "./LandingPage/NavBar";
import Hero from "./LandingPage/Hero";
import { Showcase } from "./LandingPage/Showcase";
import Features from "./LandingPage/Features";
import Demo from "./LandingPage/Demo";
import Testimonials from "./LandingPage/Testimonials";
import Faq from "./LandingPage/Faq";
import Footer from "./LandingPage/Footer";
import Finalcta from "./LandingPage/Finalcta";

export default function LandingPage() {
  
  
 
  return (
    <div className="relative min-h-screen bg-black text-white antialiased overflow-x-hidden">
     {/* Ambient gradient glows */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.18),transparent_60%)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_60%)]" />

           <NavBar />

              <main>
           <Hero />
           <Showcase />
           <Features />
           <Demo />
           <Testimonials />
           <Faq />
           <Finalcta />
              </main>
            <Footer />
     
   
    </div>
  );
}
