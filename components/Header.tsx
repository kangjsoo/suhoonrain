import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, MapPin } from 'lucide-react';

const PipeLogo = ({ className }: { className?: string }) => (
  <img 
    src="/logo.png" 
    alt="수훈라인 로고" 
    className={`${className} object-contain`} 
  />
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: '서비스 소개', href: '#services' },
    { label: '기사 위치', href: '#location', icon: <MapPin className="w-3 h-3 mr-1 text-green-400" /> },
    { label: 'AI 진단', href: '#ai-diagnosis', icon: <Sparkles className="w-3 h-3 mr-1 text-purple-400" /> },
    { label: '고객 후기', href: '#reviews' },
  ];

  const headerClass = isScrolled
    ? 'glass-nav border-b border-gray-200/50 h-16 shadow-sm'
    : 'bg-transparent h-20 md:h-24';

  const textClass = isScrolled ? 'text-slate-900' : 'text-white';
  const logoContainerClass = isScrolled ? 'bg-white shadow-md' : 'bg-white/10 backdrop-blur-sm border border-white/20';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo & Brand */}
          <div className="flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mr-3 transition-all duration-300 ${logoContainerClass}`}>
              <PipeLogo className="w-9 h-9" />
            </div>
            <div className="flex flex-col justify-center">
              <span className={`font-black text-2xl tracking-tighter leading-none transition-colors ${textClass}`}>
                수훈라인
              </span>
              <span className={`text-[0.65rem] font-bold tracking-[0.2em] uppercase opacity-70 ${textClass}`}>
                Premium Care
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-10">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-bold hover:-translate-y-0.5 transition-all duration-200 flex items-center ${
                  isScrolled ? 'text-slate-600 hover:text-[#0288D1]' : 'text-white/90 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <span className={`font-bold text-lg tracking-tight ${textClass}`}>010-4647-0990</span>
            <button
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:shadow-lg transform hover:-translate-y-0.5 ${
                isScrolled
                  ? 'bg-[#0288D1] text-white hover:bg-[#01579B]'
                  : 'bg-white text-[#0288D1] hover:bg-blue-50'
              }`}
            >
              무료 견적
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={textClass}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl animate-fadeIn">
          <div className="px-4 py-6 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-lg font-medium text-slate-800 hover:text-[#0288D1] flex items-center"
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-[#0288D1] font-bold text-xl mb-3">010-4647-0990</p>
              <a href="tel:010-4647-0990" className="block w-full text-center bg-[#0288D1] text-white py-3 rounded-xl font-bold shadow-md">
                전화 상담하기
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;