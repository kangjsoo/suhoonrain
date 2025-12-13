import React from 'react';

const PipeLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="footerLogoBlue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1565C0" />
        <stop offset="100%" stopColor="#0D47A1" />
      </linearGradient>
      <linearGradient id="footerLogoCyan" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#29B6F6" />
        <stop offset="100%" stopColor="#0288D1" />
      </linearGradient>
    </defs>
    
    <path 
      d="M28 18 V82" 
      stroke="url(#footerLogoBlue)" 
      strokeWidth="15" 
      strokeLinecap="round" 
    />
    <path 
      d="M28 50 C28 28 50 28 50 53" 
      stroke="url(#footerLogoBlue)" 
      strokeWidth="15" 
      strokeLinecap="round" 
    />
    
    <path 
      d="M50 47 C50 72 72 72 72 50 V18" 
      stroke="url(#footerLogoCyan)" 
      strokeWidth="15" 
      strokeLinecap="round" 
    />
    
    <path d="M19 18 H37" stroke="#0D47A1" strokeWidth="4" strokeLinecap="round" />
    <path d="M19 82 H37" stroke="#0D47A1" strokeWidth="4" strokeLinecap="round" />
    <path d="M63 18 H81" stroke="#0288D1" strokeWidth="4" strokeLinecap="round" />
    
    <rect x="41" y="46" width="18" height="8" rx="2" fill="#0277BD" fillOpacity="0.2" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-2">
              <PipeLogo className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xl text-slate-900">수훈라인</h4>
          </div>
          <p className="text-slate-500 leading-relaxed">
            대표: 강정수 | 사업자등록번호: 123-45-67890<br />
            서울시 중랑구 면목동 127-8 B02
          </p>
          <p className="text-slate-400 mt-4 text-xs">© 2024 Soohoon Line. All rights reserved.</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-[#0288D1] font-bold text-3xl mb-1 tracking-tight">010-4647-0990</p>
          <p className="text-slate-400 font-medium">365일 24시간 상담 환영</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;