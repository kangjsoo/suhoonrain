import React from 'react';
import { Star } from 'lucide-react';

const Reviews: React.FC = () => {
  const reviews = [
    { name: "강남구 논현동 식당", text: "영업 중에 하수구가 역류해서 정말 난감했는데, 30분 만에 오셔서 시원하게 뚫어주셨습니다. 장사 망칠 뻔 했는데 구해주셨어요.", tag: "긴급출동" },
    { name: "서초구 반포 자이", text: "아이 방 에어컨에서 냄새가 나서 불렀는데, 분해해서 보여주신 곰팡이에 경악했습니다. 친환경 세제로 꼼꼼하게 해주셔서 안심되네요.", tag: "에어컨청소" },
    { name: "송파구 문정동 사무실", text: "여러 업체 불렀지만 못 뚫었던 변기를 10분 만에 해결해주셨어요. 장비부터 다르시네요. 정기 관리도 맡기기로 했습니다.", tag: "변기막힘" },
  ];

  return (
    <section id="reviews" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">고객이 증명하는 실력</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 flex flex-col justify-between h-full">
              <div>
                <div className="flex space-x-1 text-[#00d2d3] mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">"{review.text}"</p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                <span className="text-sm font-bold text-slate-900">{review.name}</span>
                <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-medium">{review.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;