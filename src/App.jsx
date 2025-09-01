import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Documentation from "./components/Documentation"
import Footer from "./components/Footer"


const App = () => {
  return (
    <>
    <div className="min-h-screen">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
     <Navbar />
     <Hero />
     <Features />
     <Documentation />
     <Footer />
    </div>
    </>
  )
}

export default App;
