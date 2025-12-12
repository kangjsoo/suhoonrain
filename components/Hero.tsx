import React from 'react';
import { Phone, Calendar } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full object-cover scale-105 opacity-80"
          poster="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80"
        >
          <source src="https://videos.pexels.com/video-files/3205626/3205626-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeIn pt-20">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#00d2d3] mr-2 animate-pulse"></span>
          <span className="text-sm font-medium tracking-wide">서울/경기 전 지역 30분 내 긴급 출동</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
          막힌 곳은 <span className="text-[#00d2d3]">시원하게,</span><br />
          공기는 <span className="text-[#64b5f6]">상쾌하게.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
          <span className="font-semibold text-white">아파트 배관 구조 완벽 분석!</span><br/>
          엘리베이터가 있는 곳이라면 어디든, <strong className="text-[#00d2d3]">실내용 고압세척기</strong>를 투입하여<br className="hidden md:block"/>
          신축 아파트 배관 컨디션으로 되돌려 드립니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative px-8 py-4 bg-[#0056b3] hover:bg-[#004494] text-white rounded-full font-bold text-lg transition-all shadow-[0_0_40px_-10px_rgba(0,86,179,0.5)] hover:shadow-[0_0_60px_-15px_rgba(0,86,179,0.6)] overflow-hidden">
            <span className="relative z-10 flex items-center">
              <Phone className="w-5 h-5 mr-2" /> 긴급 출동 요청
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </button>

          <button className="px-8 py-4 bg-white/5 hover:bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-full font-bold text-lg transition-all flex items-center">
            <Calendar className="w-5 h-5 mr-2" /> 온라인 예약
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-20 animate-bounce-slow">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2 backdrop-blur-sm">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;