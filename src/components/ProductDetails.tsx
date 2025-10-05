import React, { useState } from 'react';
import { ArrowLeft, Star, Truck, Shield, Zap, Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
}

interface ProductDetailsProps {
  product: any;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const media = product.media || [];

  const nextMedia = () => {
    setSelectedMediaIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setSelectedMediaIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Ürünlere Geri Dön</span>
        </button>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8">
              {/* Main Media Display */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-96 mb-6 overflow-hidden">
                {media.length > 0 ? (
                  <>
                    {media[selectedMediaIndex]?.type === 'image' ? (
                      <img
                        src={media[selectedMediaIndex].url}
                        alt={media[selectedMediaIndex].name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWMTQwSDgwVjYwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Play className="h-16 w-16 mx-auto mb-2" />
                          <p className="text-sm">Video: {media[selectedMediaIndex].name}</p>
                          <a
                            href={media[selectedMediaIndex].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-100 text-sm underline"
                          >
                            Videoyu Aç
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {media.length > 1 && (
                      <>
                        <button
                          onClick={prevMedia}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={nextMedia}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Zap className="h-24 w-24 text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Media Thumbnails */}
              {media.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {media.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedMediaIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedMediaIndex === index 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWMTQwSDgwVjYwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Play className="h-6 w-6 text-gray-500" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {product.code}
                  </span>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.8 • 124 değerlendirme)</span>
                </div>
                <p className="text-4xl font-bold text-blue-600 mb-4">${product.price}</p>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Teknik Özellikler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Ürün Kodu</span>
                    <span className="font-medium">{product.code}</span>
                  </div>
                  {product.power && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Güç</span>
                      <span className="font-medium">{product.power}W</span>
                    </div>
                  )}
                  {product.voltage && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Voltaj</span>
                      <span className="font-medium">{product.voltage}V</span>
                    </div>
                  )}
                  {product.efficiency && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Verimlilik</span>
                      <span className="font-medium">{product.efficiency}%</span>
                    </div>
                  )}
                  {product.lifespan && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Ömür</span>
                      <span className="font-medium">{product.lifespan.toLocaleString()} saat</span>
                    </div>
                  )}
                  {product.color && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Renk</span>
                      <span className="font-medium">{product.color}</span>
                    </div>
                  )}
                  {product.material && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Malzeme</span>
                      <span className="font-medium">{product.material}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4" />
                    <span>Ücretsiz kargo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>2 yıl garanti</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Fiyat Teklifi İste
                </button>
                <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-semibold transition-colors">
                  Satış Ekibiyle İletişime Geç
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;