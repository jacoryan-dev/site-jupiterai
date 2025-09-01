import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              JupiterAI
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="text-gray-700 hover:text-cyan-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('funcionalidades')}
                className="text-gray-700 hover:text-cyan-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Funcionalidades
              </button>
              <button 
                onClick={() => scrollToSection('documentacao')}
                className="text-gray-700 hover:text-cyan-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Documentação
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a 
              href="https://t.me/JupiTheBot" target="_blank" rel="noopener noreferrer"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Acessar o Bot
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-cyan-600"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="text-gray-700 hover:text-cyan-600 block px-3 py-2 text-base font-medium w-full text-left"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('funcionalidades')}
                className="text-gray-700 hover:text-cyan-600 block px-3 py-2 text-base font-medium w-full text-left"
              >
                Funcionalidades
              </button>
              <button 
                onClick={() => scrollToSection('documentacao')}
                className="text-gray-700 hover:text-cyan-600 block px-3 py-2 text-base font-medium w-full text-left"
              >
                Documentação
              </button>
              <a 
                href="#"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white block px-3 py-2 text-base font-medium rounded-lg mt-2 text-center"
              >
                Acessar o Bot
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;