import React, { useState } from 'react';
import { ArrowLeft, Plus, CreditCard as Edit2, Trash2, Save, X } from 'lucide-react';
import { useProductContext } from '../context/ProductContext';
import MediaManager from './MediaManager';

interface AdminPanelProps {
  onBack: () => void;
}

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const { products, addProduct, updateProduct, deleteProduct } = useProductContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: '',
    price: '',
    description: '',
    power: '',
    voltage: '',
    efficiency: '',
    lifespan: '',
    color: '',
    material: '',
    media: [] as MediaItem[]
  });

  const categories = [
    'Tavan Lambası',
    'Fanli Tavan Lambası',
    'Gömme Tavan Armatürü',
    'Avize',
    'Güneş Enerjili Lamba',
    'Sensörler',
    'AC-DC Adaptör',
    'DC-DC Adaptör',
    'LED\'ler'
  ];

  const generateProductCode = (category: string) => {
    const categoryMap = {
      'Tavan Lambası': '01',
      'Fanli Tavan Lambası': '02',
      'Gömme Tavan Armatürü': '03',
      'Avize': '04',
      'Güneş Enerjili Lamba': '05',
      'Sensörler': '06',
      'AC-DC Adaptör': '07',
      'DC-DC Adaptör': '08',
      'LED\'ler': '09'
    };

    const groupNumber = categoryMap[category] || '01';
    const categoryProducts = products[category] || [];
    const nextSequence = (categoryProducts.length + 1).toString().padStart(2, '0');
    
    return `GLB-${groupNumber}-${nextSequence}`;
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      code: product.code,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      power: product.power?.toString() || '',
      voltage: product.voltage?.toString() || '',
      efficiency: product.efficiency?.toString() || '',
      lifespan: product.lifespan?.toString() || '',
      color: product.color || '',
      material: product.material || '',
      media: product.media || []
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    const productData = {
      ...formData,
      code: formData.code || generateProductCode(formData.category),
      price: parseFloat(formData.price),
      power: formData.power ? parseInt(formData.power) : undefined,
      voltage: formData.voltage ? parseInt(formData.voltage) : undefined,
      efficiency: formData.efficiency ? parseInt(formData.efficiency) : undefined,
      lifespan: formData.lifespan ? parseInt(formData.lifespan) : undefined,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    handleCancel();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      code: '',
      category: '',
      price: '',
      description: '',
      power: '',
      voltage: '',
      efficiency: '',
      lifespan: '',
      color: '',
      material: '',
      media: []
    });
  };

  const handleCategoryChange = (category: string) => {
    setFormData({
      ...formData,
      category,
      code: editingProduct ? formData.code : generateProductCode(category)
    });
  };

  const filteredProducts = selectedCategory 
    ? products[selectedCategory] || []
    : Object.values(products).flat();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Ana Sayfaya Dön</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">Ürün Yönetimi</h1>
          
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Ürün Ekle</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Form */}
          {isEditing && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 max-h-screen overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ürün Adı
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Kategori Seçin</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ürün Kodu
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                      placeholder="GLB-01-01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format: GLB-[Grup]-[Sıra] (boş bırakılırsa otomatik oluşturulur)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fiyat ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Açıklama
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Güç (W)
                      </label>
                      <input
                        type="number"
                        value={formData.power}
                        onChange={(e) => setFormData({...formData, power: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Voltaj (V)
                      </label>
                      <input
                        type="number"
                        value={formData.voltage}
                        onChange={(e) => setFormData({...formData, voltage: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Verimlilik (%)
                      </label>
                      <input
                        type="number"
                        value={formData.efficiency}
                        onChange={(e) => setFormData({...formData, efficiency: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ömür (saat)
                      </label>
                      <input
                        type="number"
                        value={formData.lifespan}
                        onChange={(e) => setFormData({...formData, lifespan: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Renk
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Malzeme
                    </label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) => setFormData({...formData, material: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <MediaManager
                    media={formData.media}
                    onMediaUpdate={(media) => setFormData({...formData, media})}
                  />

                  <button
                    type="button"
                    onClick={handleSave}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Ürünü Kaydet</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Product List */}
          <div className={isEditing ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Ürünler</h2>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Tüm Kategoriler</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ürün
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kod
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fiyat
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Medya
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-gray-900">{product.code}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.media?.length || 0} öğe
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;