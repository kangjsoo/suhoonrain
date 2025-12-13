import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const StickyCTA: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 md:hidden animate-bounce-slow">
      <div className="bg-white/90 backdrop-blur-md rounded-full shadow-2xl p-1.5 flex border border-white/50 ring-1 ring-black/5">
        <a href="tel:010-4647-0990" className="flex-1 bg-[#0056b3] text-white rounded-full py-3.5 flex items-center justify-center font-bold text-sm shadow-md transition-transform active:scale-95">
          <Phone className="w-4 h-4 mr-2" /> 전화 상담
        </a>
        <a href="sms:010-4647-0990?body=상담 문의드립니다." className="flex-1 text-slate-800 rounded-full py-3.5 flex items-center justify-center font-bold text-sm transition-colors hover:bg-slate-50">
          <MessageCircle className="w-4 h-4 mr-2" /> 문자 예약
        </a>
      </div>
    </div>
  );
};

export default StickyCTA;