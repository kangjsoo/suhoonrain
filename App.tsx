import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AIDiagnosis from './components/AIDiagnosis';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import LocationTracker from './components/LocationTracker';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        <Hero />
        <Services />
        <LocationTracker />
        <AIDiagnosis />
        <Reviews />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default App;