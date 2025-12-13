import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Navigation, User, PhoneCall, Clock, Loader2, Map as MapIcon, ExternalLink, AlertTriangle } from 'lucide-react';
import L from 'leaflet';

const PipeLogo = ({ className }: { className?: string }) => (
  <img 
    src="/logo.png" 
    alt="수훈라인 로고" 
    className={`${className} object-contain`} 
  />
);

interface LocationState {
  lat: number;
  lng: number;
}

const LocationTracker: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'active' | 'error'>('idle');
  const [userLocation, setUserLocation] = useState<LocationState | null>(null);
  const [techLocation, setTechLocation] = useState<LocationState | null>(null);
  const [distanceInfo, setDistanceInfo] = useState({ km: '0', time: '0' });
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const techMarkerRef = useRef<L.Marker | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    
    setStatus('loading');
    
    if (!navigator.geolocation) {
      setStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        
        // Initial tech location: Random offset approx 1.5km away
        // 0.01 degrees is roughly 1.1km
        const offsetLat = (Math.random() > 0.5 ? 1 : -1) * (0.01 + Math.random() * 0.005);
        const offsetLng = (Math.random() > 0.5 ? 1 : -1) * (0.01 + Math.random() * 0.005);
        
        setTechLocation({
          lat: latitude + offsetLat,
          lng: longitude + offsetLng
        });

        setStatus('active');
      },
      (error) => {
        console.error("Location error:", error);
        setStatus('error');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Simulation of technician movement
  useEffect(() => {
    if (status !== 'active' || !userLocation) return;

    const interval = setInterval(() => {
      setTechLocation(prev => {
        if (!prev) return null;
        
        // Move towards user
        const latDiff = userLocation.lat - prev.lat;
        const lngDiff = userLocation.lng - prev.lng;
        
        // Stop if arrived (very close)
        if (Math.abs(latDiff) < 0.00005 && Math.abs(lngDiff) < 0.00005) {
          return prev;
        }

        // Move 2% of the remaining distance per tick (smooth deceleration/approach)
        // or constant speed. Let's do constantish speed for realism, but simplified.
        const speedFactor = 0.05; 
        
        return {
          lat: prev.lat + latDiff * speedFactor,
          lng: prev.lng + lngDiff * speedFactor
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, userLocation]);

  // Map Initialization and Updates
  useEffect(() => {
    // 1. Initialize Map
    if (status === 'active' && mapContainerRef.current && !mapInstanceRef.current && userLocation) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView([userLocation.lat, userLocation.lng], 14);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      
      mapInstanceRef.current = map;
    }

    // 2. Update Markers & Info
    if (status === 'active' && mapInstanceRef.current && userLocation && techLocation) {
      const map = mapInstanceRef.current;

      // User Marker
      const userIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="relative w-4 h-4">
            <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
            <div class="relative w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap">고객님</div>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      if (!userMarkerRef.current) {
        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map);
      } else {
        userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
      }

      // Tech Marker
      const techIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="relative w-14 h-14 -mt-7 -ml-7 transition-all duration-300">
            <div class="absolute inset-0 bg-sky-500/20 rounded-full animate-pulse"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-2 border-[#0056b3] flex items-center justify-center shadow-lg overflow-hidden">
               <img src="/ceo.png" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/logo.png'" />
            </div>
             <div class="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#0056b3] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-50">강정수 대표</div>
          </div>
        `,
        iconSize: [56, 56],
        iconAnchor: [28, 28]
      });

      if (!techMarkerRef.current) {
        techMarkerRef.current = L.marker([techLocation.lat, techLocation.lng], { icon: techIcon }).addTo(map);
        // Initial bounds fit
        const bounds = L.latLngBounds(
          [userLocation.lat, userLocation.lng],
          [techLocation.lat, techLocation.lng]
        );
        map.fitBounds(bounds, { padding: [100, 100], maxZoom: 16 });
      } else {
        techMarkerRef.current.setLatLng([techLocation.lat, techLocation.lng]);
        techMarkerRef.current.setIcon(techIcon); // Update icon to ensure clean render
      }

      // Calculate Distance & Time
      const distMeters = map.distance(
        [userLocation.lat, userLocation.lng],
        [techLocation.lat, techLocation.lng]
      );
      
      // Calculate eta: assume 30km/h average speed in city = 500m/min
      const speedMetersPerMin = 400; 
      const etaMins = Math.ceil(distMeters / speedMetersPerMin);
      
      setDistanceInfo({
        km: (distMeters / 1000).toFixed(1),
        time: etaMins.toString()
      });
    }

    // Cleanup when component unmounts or status changes away from active
    return () => {
      if (status !== 'active' && mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        userMarkerRef.current = null;
        techMarkerRef.current = null;
      }
    };
  }, [status, userLocation, techLocation]);

  return (
    <section id="location" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">실시간 기사 위치 확인</h2>
          <p className="text-slate-500">예약하신 전화번호를 입력하시면 고객님의 현재 위치와 담당 기사의 위치를 확인하실 수 있습니다.</p>
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

              {status === 'active' && userLocation && (
                <div className="animate-fadeIn mt-auto">
                  <div className="bg-blue-50 p-4 rounded-2xl mb-4 border border-blue-100">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mr-3 border border-blue-100 overflow-hidden relative">
                        <img 
                          src="/ceo.png" 
                          alt="강정수 대표" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display='none';
                            e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                          }} 
                        />
                        <User className="fallback-icon hidden w-6 h-6 text-[#0056b3] absolute" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-bold">담당 엔지니어</p>
                        <p className="text-slate-900 font-bold">강정수 대표</p>
                      </div>
                    </div>
                    
                    <a 
                      href={`https://m.map.naver.com/map.naver?lat=${userLocation.lat}&lng=${userLocation.lng}&dlevel=12`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#03C75A] hover:bg-[#02b351] text-white py-2.5 rounded-lg text-sm font-bold shadow-sm flex items-center justify-center transition-colors mb-2"
                    >
                      <span className="mr-1 font-extrabold">N</span> 네이버 지도로 보기
                    </a>
                    
                    <a href="tel:010-4647-0990" className="w-full bg-white py-2.5 rounded-lg text-sm font-bold text-slate-700 shadow-sm flex items-center justify-center hover:bg-blue-50 transition-colors border border-blue-100">
                       <PhoneCall className="w-4 h-4 mr-2" /> 전화 연결
                    </a>
                  </div>
                  
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center"><Navigation className="w-4 h-4 mr-2" /> 현재 거리</span>
                      <span className="font-bold text-[#0056b3]">약 {distanceInfo.km}km</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center"><Clock className="w-4 h-4 mr-2" /> 도착 예정</span>
                      <span className="font-bold text-[#0056b3]">약 {distanceInfo.time}분 후</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel: Map Visualization */}
            <div className="md:col-span-2 relative bg-slate-100 overflow-hidden min-h-[400px]">
              {status === 'active' ? (
                <div className="w-full h-full animate-fadeIn relative">
                   {/* Leaflet Map Container */}
                   <div ref={mapContainerRef} className="w-full h-full z-0" />
                   
                   {/* Overlay Watermark */}
                   <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-slate-100 flex items-center space-x-2 pointer-events-none">
                     <PipeLogo className="w-4 h-4" />
                     <span className="text-xs font-bold text-[#0056b3]">실시간 관제중</span>
                   </div>
                </div>
              ) : status === 'error' ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                  <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-red-100 max-w-xs animate-fadeIn">
                    <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>
                    <h4 className="text-slate-900 font-bold mb-2 text-lg">위치 확인 실패</h4>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 break-keep">
                      위치 정보를 가져올 수 없습니다.<br/>
                      브라우저 설정에서 위치 권한을 허용해주세요.
                    </p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-black transition-colors"
                    >
                      다시 시도하기
                    </button>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50" style={{
                    backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}>
                  <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-100 max-w-xs">
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <MapIcon className="w-10 h-10 text-[#0056b3] opacity-80" />
                    </div>
                    <h4 className="text-slate-900 font-bold mb-1 text-lg">위치 조회 대기중</h4>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-4">
                      전화번호 뒷자리를 입력하고<br/>
                      위치 권한을 허용해주세요.
                    </p>
                    <div className="text-xs text-slate-400 bg-slate-100 py-2 px-3 rounded-lg">
                      * 고객님의 현재 위치 기반으로<br/>가장 가까운 기사를 찾습니다.
                    </div>
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