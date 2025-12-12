import React from 'react';
import { Phone, Clock, Wrench, ShieldCheck } from 'lucide-react';

const Process: React.FC = () => {
  const steps = [
    { icon: Phone, title: "01. 문의", desc: "증상 확인 및 일정 조율" },
    { icon: Clock, title: "02. 출동", desc: "30분 내 현장 도착" },
    { icon: Wrench, title: "03. 케어", desc: "원인 진단 및 해결" },
    { icon: ShieldCheck, title: "04. 보장", desc: "작업 후 1년 무상 AS" },
  ];

  return (
    <section id="process" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#0056b3] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#00d2d3] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-4">군더더기 없는 프로세스</h2>
          <p className="text-slate-400 max-w-xl mx-auto">복잡한 절차 없이 빠르고 정확하게 해결해 드립니다. 고객님의 시간은 소중하니까요.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0056b3] to-[#00d2d3] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/50">
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;