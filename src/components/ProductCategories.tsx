import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { Lightbulb, Fan, Circle, Sparkles, Sun, Send as Sensor, Plug, Zap } from 'lucide-react';

interface ProductCategoriesProps {
  onProductSelect: (product: any) => void;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({ onProductSelect }) => {
  const { products } = useProductContext();

  const categoryIcons = {
    'Tavan Lambası': Lightbulb,
    'Fanli Tavan Lambası': Fan,
    'Gömme Tavan Armatürü': Circle,
    'Avize': Sparkles,
    'Güneş Enerjili Lamba': Sun,
    'Sensörler': Sensor,
    'AC-DC Adaptör': Plug,
    'DC-DC Adaptör': Plug,
    'LED\'ler': Zap
  };

  const categories = Object.keys(products);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ürün Kategorilerimiz
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Profesyonel standartları karşılamak ve beklentileri aşmak için tasarlanmış 
            kapsamlı aydınlatma ve elektrik ürünleri yelpazemizi keşfedin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = categoryIcons[category] || Lightbulb;
            const categoryProducts = products[category] || [];
            
            return (
              <div
                key={category}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 rounded-lg p-3 mr-4 group-hover:bg-blue-700 transition-colors">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {categoryProducts.length} ürün mevcut
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  {categoryProducts.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => onProductSelect(product)}
                      className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                        <span className="text-blue-600 font-semibold text-sm">${product.price}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {product.power && `${product.power}W`}
                          {product.voltage && ` • ${product.voltage}V`}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                          Detayları Gör →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {categoryProducts.length > 3 && (
                  <div className="mt-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Tüm {categoryProducts.length} Ürünü Gör
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;