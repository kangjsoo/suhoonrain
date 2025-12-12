import React, { useState } from 'react';
import { MapPin, Search, Navigation, User, PhoneCall, Clock, Loader2 } from 'lucide-react';

const PipeLogo = ({ className }: { className?: string }) => (
  <img 
    src="/logo.png" 
    alt="수훈라인 로고" 
    className={`${className} object-contain`} 
  />
);

const LocationTracker: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'active'>('idle');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('active');
    }, 1500);
  };

  return (
    <section id="location" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">실시간 기사 위치 확인</h2>
          <p className="text-slate-500">예약하신 전화번호를 입력하시면 담당 기사의 현재 위치를 확인하실 수 있습니다.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid md:grid-cols-3 min-h-[500px]">
            
            {/* Left Panel: Search & Info */}
            <div className="p-8 md:border-r border-slate-100 flex flex-col z-10 bg-white relative">
              <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center">
                <Search className="w-5 h-5 mr-2 text-slate-400" /> 조회하기
              </h3>
              
              <form onSubmit={handleSearch} className="mb-8">
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-500 mb-1 ml-1 uppercase">전화번호 뒷자리</label>
                  <input
                    type="text"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="예) 1234"
                    maxLength={4}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-0 focus:ring-2 focus:ring-[#0056b3] text-slate-900 font-bold text-lg tracking-widest placeholder:text-slate-300 placeholder:font-normal placeholder:tracking-normal transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={!phoneNumber || status === 'loading'}
                  className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : '위치 확인'}
                </button>
              </form>

              {status === 'active' && (
                <div className="animate-fadeIn mt-auto">
                  <div className="bg-blue-50 p-4 rounded-2xl mb-4 border border-blue-100">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mr-3 border border-blue-100">
                        <User className="w-5 h-5 text-[#0056b3]" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-bold">담당 엔지니어</p>
                        <p className="text-slate-900 font-bold">강정수 대표</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                       <a href="tel:010-4647-0990" className="flex-1 bg-white py-2 rounded-lg text-xs font-bold text-slate-700 shadow-sm flex items-center justify-center hover:bg-blue-100 transition-colors border border-blue-100">
                         <PhoneCall className="w-3 h-3 mr-1" /> 전화 연결
                       </a>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center"><Navigation className="w-4 h-4 mr-2" /> 현재 거리</span>
                      <span className="font-bold text-[#0056b3]">2.3km</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center"><Clock className="w-4 h-4 mr-2" /> 도착 예정</span>
                      <span className="font-bold text-[#0056b3]">약 12분 후</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel: Map Visualization */}
            <div className="md:col-span-2 relative bg-slate-100 overflow-hidden">
              {status === 'active' ? (
                <div className="absolute inset-0 animate-fadeIn">
                   {/* Simulated Map Background with CSS Grid Pattern */}
                   <div className="absolute inset-0 bg-slate-50 opacity-60" style={{
                     backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(to right, #cbd5e1 1px, #f1f5f9 1px)',
                     backgroundSize: '40px 40px'
                   }}></div>
                   
                   {/* Map Overlay Elements */}
                   <div className="absolute inset-0 bg-blue-900/5"></div>
                   
                   {/* Road Network Simulation */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                      <path d="M -50 200 L 800 250" stroke="white" strokeWidth="12" fill="none" />
                      <path d="M 200 -50 L 250 800" stroke="white" strokeWidth="12" fill="none" />
                      <path d="M 100 100 L 500 500" stroke="white" strokeWidth="8" fill="none" />
                    </svg>
                   
                   {/* Route Line (Simulated) */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.3))' }}>
                     <path d="M 200 400 Q 300 300 450 250 T 600 150" stroke="#0056b3" strokeWidth="4" fill="none" strokeDasharray="10 5" className="animate-pulse" />
                   </svg>

                   {/* User Pin */}
                   <div className="absolute bottom-[20%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                     <div className="bg-white px-3 py-1.5 rounded-full shadow-lg mb-2 text-xs font-bold text-slate-800 whitespace-nowrap">고객님 위치</div>
                     <div className="w-4 h-4 bg-slate-900 rounded-full border-4 border-white shadow-xl relative">
                        <div className="absolute inset-0 bg-slate-900 rounded-full animate-ping opacity-20"></div>
                     </div>
                   </div>

                   {/* Technician Pin (Animated - Suhoon Line Logo) */}
                   <div className="absolute top-[30%] right-[20%] transform -translate-x-1/2 -translate-y-1/2 z-20 animate-bounce-slow">
                      <div className="relative">
                        <div className="w-16 h-16 bg-[#0056b3]/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                        <div className="w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-[#0056b3] relative z-10">
                           <PipeLogo className="w-8 h-8" />
                        </div>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0056b3] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#0056b3]">
                          수훈라인 이동중
                        </div>
                      </div>
                   </div>
                   
                   {/* Watermark Logo */}
                   <div className="absolute top-6 right-6 opacity-80 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-white/50 flex items-center space-x-2">
                     <PipeLogo className="w-4 h-4" />
                     <span className="text-xs font-bold text-[#0056b3] tracking-tight">수훈라인 관제중</span>
                   </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100" style={{
                    backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}>
                  <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-100 max-w-xs">
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <PipeLogo className="w-10 h-10" />
                    </div>
                    <h4 className="text-slate-900 font-bold mb-1 text-lg">수훈라인 관제 시스템</h4>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed">
                      조회 버튼을 누르시면<br/>
                      기사님 위치가 지도에 표시됩니다.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationTracker;