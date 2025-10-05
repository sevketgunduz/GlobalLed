import React from 'react';
import { Lightbulb, Zap, Shield, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Dünyanızı 
            <span className="text-amber-400"> GlobalLed</span> ile Aydınlatın
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Dünya çapında konut ve ticari uygulamalar için profesyonel aydınlatma çözümleri, 
            LED teknolojisi ve elektrik bileşenleri.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Ürünleri İncele
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Fiyat Teklifi Al
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-blue-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Lightbulb className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">LED Teknolojisi</h3>
            <p className="text-blue-200">Enerji verimli aydınlatma çözümleri</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Güneş Enerjisi</h3>
            <p className="text-blue-200">Sürdürülebilir enerji çözümleri</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Kalite Güvencesi</h3>
            <p className="text-blue-200">Sertifikalı ve test edilmiş ürünler</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Award className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Küresel Erişim</h3>
            <p className="text-blue-200">Dünya çapında dağıtım ağı</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;