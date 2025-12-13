import React, { useState, useRef } from 'react';
import { Sparkles, CheckCircle, ShieldCheck, Phone, ArrowRight, Loader2, AlertTriangle, RotateCcw, Image as ImageIcon, X } from 'lucide-react';
import { diagnoseIssue } from '../services/geminiService';
import { DiagnosisResult } from '../types';

const AIDiagnosis: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("이미지는 10MB 이하만 가능합니다.");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data:image/...;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  };

  const handleDiagnosis = async () => {
    if (!input.trim() && !selectedFile) {
      alert("증상 설명이나 사진을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let imageBase64;
      let mimeType;

      if (selectedFile) {
        imageBase64 = await fileToBase64(selectedFile);
        mimeType = selectedFile.type;
      }

      const data = await diagnoseIssue(input, imageBase64, mimeType);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("AI 진단 서비스를 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetDiagnosis = () => {
    setResult(null);
    setInput('');
    clearFile();
    setError(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case '긴급': return 'bg-red-50 text-red-600 border border-red-100';
      case '보통': return 'bg-amber-50 text-amber-600 border border-amber-100';
      default: return 'bg-green-50 text-green-600 border border-green-100';
    }
  };

  return (
    <section id="ai-diagnosis" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-start">

          {/* Left Content */}
          <div className="md:w-1/3 pt-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3 h-3 mr-1" /> AI Smart Care
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              증상만 말씀해주세요,<br/>
              <span className="text-indigo-600">AI가 즉시 진단합니다.</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              수훈라인의 20년 노하우가 담긴 AI가 고객님의 불편사항을 분석하여 예상 원인과 응급 처치법을 무료로 알려드립니다.
            </p>
            <div className="flex flex-col space-y-3 text-sm font-medium text-slate-500">
              <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-indigo-500" /> 사진 업로드 분석 가능</div>
              <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-indigo-500" /> 즉시 결과 확인</div>
              <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-indigo-500" /> 24시간 무상 서비스</div>
            </div>
          </div>

          {/* Right Interaction Card */}
          <div className="md:w-2/3 w-full">
            <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100/50 p-2 md:p-4 border border-slate-100">
              <div className="bg-slate-50 rounded-2xl p-6 md:p-8 min-h-[400px] flex flex-col justify-center">

                {error ? (
                   <div className="text-center py-10 animate-fadeIn">
                     <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                     <h3 className="text-lg font-bold text-slate-800 mb-2">오류가 발생했습니다</h3>
                     <p className="text-slate-500 mb-6">{error}</p>
                     <button
                        onClick={resetDiagnosis}
                        className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-bold"
                     >
                       다시 시도하기
                     </button>
                   </div>
                ) : result ? (
                  <div className="animate-fadeIn w-full">
                    <div className="flex justify-between items-start mb-6 border-b border-slate-200 pb-4">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Diagnosis Result</span>
                        <h3 className="text-xl font-bold text-slate-800 mt-1">{result.diagnosis}</h3>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${getSeverityColor(result.severity)}`}>
                        {result.severity}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                        <h4 className="flex items-center text-sm font-bold text-indigo-600 mb-2">
                          <ShieldCheck className="w-4 h-4 mr-2" /> 전문가 팁 (Action Plan)
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{result.action_tips}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 bg-slate-100 p-4 rounded-xl">
                         <div className="text-sm text-slate-500">
                           전문가 작업 예상 소요 시간: <span className="font-bold text-slate-800 ml-1">{result.estimated_time}</span>
                         </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                           onClick={resetDiagnosis}
                           className="text-sm text-slate-400 hover:text-slate-600 flex items-center transition-colors"
                         >
                           <RotateCcw className="w-3 h-3 mr-1" /> 다른 증상 진단하기
                         </button>
                      </div>
                    </div>

                    <a 
                      href="tel:010-4647-0990"
                      className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                    >
                      <Phone className="w-4 h-4 mr-2" /> 이 결과로 긴급 출동 요청
                    </a>
                  </div>
                ) : (
                  /* Input View */
                  <div className="relative w-full h-full flex flex-col">
                    <label className="text-lg font-bold text-slate-700 mb-4 block">
                      어떤 문제가 발생했나요?
                    </label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="구체적으로 적어주실수록 정확합니다.&#13;&#10;예) 싱크대 물이 천천히 내려가고 악취가 나요.&#13;&#10;예) 에어컨을 켰는데 퀴퀴한 냄새가 나고 시원하지 않아요."
                      className="w-full flex-grow min-h-[160px] bg-transparent border-0 focus:ring-0 text-slate-700 placeholder-slate-400 text-lg leading-relaxed resize-none p-0 focus:outline-none mb-2"
                    />
                    
                    {previewUrl && (
                      <div className="mb-4 relative inline-block animate-fadeIn">
                        <img 
                          src={previewUrl} 
                          alt="Upload preview" 
                          className="h-24 w-24 object-cover rounded-xl border-2 border-slate-200 shadow-sm" 
                        />
                        <button 
                          onClick={clearFile}
                          className="absolute -top-2 -right-2 bg-slate-800 text-white rounded-full p-1 shadow-md hover:bg-black transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                       <div className="flex items-center gap-2 w-full sm:w-auto">
                         <input 
                           type="file" 
                           ref={fileInputRef} 
                           onChange={handleFileChange} 
                           accept="image/*" 
                           className="hidden" 
                         />
                         <button 
                           onClick={() => fileInputRef.current?.click()}
                           className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-indigo-50"
                         >
                           <ImageIcon className="w-5 h-5 mr-2" />
                           <span className="text-sm font-bold">사진 추가</span>
                         </button>
                         <span className="text-xs text-slate-400 hidden sm:inline">| Powered by Gemini 2.5 Flash</span>
                       </div>

                       <button
                        onClick={handleDiagnosis}
                        disabled={isLoading || (!input.trim() && !selectedFile)}
                        className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold flex items-center justify-center transition-all duration-300 ${
                          isLoading || (!input.trim() && !selectedFile)
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-900 text-white hover:bg-black shadow-lg transform hover:-translate-y-1 hover:shadow-xl'
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            분석중...
                          </>
                        ) : (
                          <>
                            무료 진단하기 <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDiagnosis;