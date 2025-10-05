import React from 'react';
import { Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">İletişime Geçin</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Alanınızı aydınlatmaya hazır mısınız? Kişiselleştirilmiş çözümler ve 
            dünya çapında profesyonel danışmanlık için aydınlatma uzmanlarımızla iletişime geçin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">İletişim Bilgileri</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 rounded-lg p-3">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Telefon</h4>
                  <p className="text-gray-300">+90 (212) 123-4567</p>
                  <p className="text-gray-300">+90 (212) 987-6543</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 rounded-lg p-3">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">E-posta</h4>
                  <p className="text-gray-300">satis@globalled.com</p>
                  <p className="text-gray-300">destek@globalled.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 rounded-lg p-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Merkez Ofis</h4>
                  <p className="text-gray-300">
                    GlobalLed Uluslararası<br />
                    Teknoloji Caddesi No: 1234<br />
                    Maslak, İstanbul 34485<br />
                    Türkiye
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 rounded-lg p-3">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Küresel Ofisler</h4>
                  <p className="text-gray-300">
                    Avrupa: Londra, Berlin, Milano<br />
                    Asya: Tokyo, Singapur, Mumbai<br />
                    Amerika: Toronto, São Paulo
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 rounded-lg p-3">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Çalışma Saatleri</h4>
                  <p className="text-gray-300">
                    Pazartesi - Cuma: 08:00 - 18:00<br />
                    Cumartesi: 09:00 - 16:00<br />
                    Pazar: Kapalı
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Bize Mesaj Gönderin</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ad</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ahmet"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Soyad</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Yılmaz"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">E-posta</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ahmet@ornek.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Şirket</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Şirket Adınız"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Konu</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Aydınlatma danışmanlığı"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Mesaj</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Aydınlatma ihtiyaçlarınız hakkında bize bilgi verin..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Mesaj Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;