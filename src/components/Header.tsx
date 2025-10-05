import React from 'react';
import { Zap, Home, Settings, Phone } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-2">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">GlobalLed</h1>
              <p className="text-xs text-gray-600">Profesyonel Aydınlatma Çözümleri</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onViewChange('home')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'home' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Ana Sayfa</span>
            </button>
            
            <button
              onClick={() => onViewChange('admin')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'admin' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Yönetim</span>
            </button>
            
            <a
              href="#contact"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>İletişim</span>
            </a>
          </nav>
          
          <div className="md:hidden">
            <button
              onClick={() => onViewChange(currentView === 'home' ? 'admin' : 'home')}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              {currentView === 'home' ? <Settings className="h-6 w-6" /> : <Home className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;