import React, { useState } from 'react';
import { Droplets, Wind, CheckCircle2 } from 'lucide-react';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plumbing' | 'ac'>('plumbing');

  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#0056b3] font-bold tracking-widest text-xs uppercase mb-3 block">Premium Services</span>
          <h2 className="text-4xl font-bold text-slate-900">문제 해결, 그 이상의 케어</h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex relative">
            <button
              onClick={() => setActiveTab('plumbing')}
              className={`relative z-10 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'plumbing' ? 'text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              하수구/배관
            </button>
            <button
              onClick={() => setActiveTab('ac')}
              className={`relative z-10 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'ac' ? 'text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              에어컨 케어
            </button>

            {/* Tab Background Animation */}
            <div className={`absolute top-1.5 bottom-1.5 rounded-xl shadow-sm transition-all duration-300 ease-in-out ${
              activeTab === 'plumbing' ? 'left-1.5 w-[calc(50%-6px)] bg-[#0056b3]' : 'left-[50%] w-[calc(50%-6px)] bg-[#00d2d3]'
            }`}></div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[500px]">
          {/* Text Content */}
          <div className="space-y-8 animate-fadeIn">
             <div className={`inline-block p-4 rounded-2xl mb-4 transition-colors duration-300 ${activeTab === 'plumbing' ? 'bg-blue-50 text-[#0056b3]' : 'bg-teal-50 text-teal-600'}`}>
               {activeTab === 'plumbing' ? <Droplets className="w-8 h-8" /> : <Wind className="w-8 h-8" />}
             </div>

             {activeTab === 'plumbing' ? (
                <>
                  <h3 className="text-3xl font-bold text-slate-900">아파트 배관 구조를 꿰뚫는<br/>프리미엄 고압 세척.</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    아파트마다 동일한 배관 구조를 완벽하게 이해하고 접근합니다. 엘리베이터가 있는 곳이라면 어디든 <strong>리지드(RIDGID) 실내용 고압세척기</strong>를 투입하여, 배관 내벽에 굳어버린 기름 슬러지를 완벽하게 파쇄하고 세척합니다.
                  </p>
                  <ul className="space-y-5">
                    {[
                      "아파트 공용/세대 배관 구조 완벽 분석",
                      "리지드(RIDGID) 실내용 고압세척기 투입",
                      "엘리베이터 보유 건물 특화 프리미엄 서비스"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-slate-800 font-medium">
                        <CheckCircle2 className="w-6 h-6 text-blue-500 mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
             ) : (
                <>
                  <h3 className="text-3xl font-bold text-slate-900">가족의 호흡기 건강,<br/>타협하지 않습니다.</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    에어컨 내부의 곰팡이와 세균은 호흡기 질환의 주범입니다. 완전 분해 세척을 통해 보이지 않는 냉각핀 뒷면의 오염까지 완벽하게 제거하여 상쾌한 공기를 선사합니다.
                  </p>
                  <ul className="space-y-5">
                    {[
                      "전 기종 완전 분해 정밀 세척",
                      "친환경 인증 세제 사용 (아이/반려동물 안전)",
                      "고압 세척 및 피톤치드 살균 마무리"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-slate-800 font-medium">
                        <CheckCircle2 className="w-6 h-6 text-teal-500 mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
             )}
          </div>

          {/* Image Content */}
          <div className="relative h-full min-h-[400px]">
            {/* Plumbing Image */}
            <div className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
              activeTab === 'plumbing' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 z-0'
            }`}>
               <div 
                 className="w-full h-full bg-cover bg-center bg-slate-200 transition-transform duration-700 hover:scale-105"
                 style={{ 
                   /* Professional plumber working with tools */
                   backgroundImage: 'url("https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=2000")' 
                 }}
                 role="img"
                 aria-label="싱크대 배관 스케일링 작업 이미지"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                 <div className="text-white">
                   <p className="font-bold text-lg">싱크대 배관 스케일링 작업</p>
                   <p className="text-white/80 text-sm">최신 리지드 장비 사용 현장</p>
                 </div>
               </div>
            </div>

            {/* AC Image */}
            <div className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
              activeTab === 'ac' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 z-0'
            }`}>
               <div 
                 className="w-full h-full bg-cover bg-center bg-slate-200 transition-transform duration-700 hover:scale-105"
                 style={{ 
                   /* Update to user provided CEO image */
                   backgroundImage: 'url("/ceo.png")' 
                 }}
                 role="img"
                 aria-label="시스템 에어컨 분해 세척 이미지"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                 <div className="text-white">
                   <p className="font-bold text-lg">시스템 에어컨 분해 세척</p>
                   <p className="text-white/80 text-sm">전문가 완전 분해 케어</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;