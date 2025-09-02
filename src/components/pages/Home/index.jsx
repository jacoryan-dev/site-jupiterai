import Navbar from "../../Navbar";
import Hero from "../../Hero";
import Features from "../../Features";
import Documentation from "../../Documentation";
import Footer from "../../Footer";

const Home = () => {
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
  );
};

export default Home;
