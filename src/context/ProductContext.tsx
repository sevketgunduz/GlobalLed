import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  description: string;
  power?: number;
  voltage?: number;
  efficiency?: number;
  lifespan?: number;
  color?: string;
  material?: string;
  media?: MediaItem[];
}

interface ProductContextType {
  products: Record<string, Product[]>;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Record<string, Product[]> = {
  'Tavan Lambası': [
    {
      id: '1',
      name: 'Modern LED Tavan Lambası',
      code: 'GLB-01-01',
      category: 'Tavan Lambası',
      price: 45,
      description: 'Ayarlanabilir parlaklık ve sıcak beyaz renk sıcaklığına sahip şık modern LED tavan lambası.',
      power: 24,
      voltage: 120,
      efficiency: 85,
      lifespan: 50000,
      color: 'Beyaz',
      material: 'Alüminyum',
      media: [
        {
          id: '1',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
          name: 'Ön görünüm'
        },
        {
          id: '2',
          type: 'image',
          url: 'https://drive.google.com/file/d/1TwilM-Eo3L-8sN95s3Ol5bT222nDeYpq/view?usp=sharing',
          name: 'Yan görünüm'
        }
      ]
    },
    {
      id: '2',
      name: 'Sıva Altı LED Tavan Lambası',
      code: 'GLB-01-02',
      category: 'Tavan Lambası',
      price: 65.99,
      description: 'Alçak tavanlı odalar için mükemmel olan düşük profilli sıva altı LED tavan lambası.',
      power: 18,
      voltage: 120,
      efficiency: 80,
      lifespan: 40000,
      color: 'Beyaz',
      material: 'Plastik',
      media: [
        {
          id: '3',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg',
          name: 'Kurulu görünüm'
        }
      ]
    },
    {
      id: '3',
      name: 'Akıllı WiFi Tavan Lambası',
      code: 'GLB-01-03',
      category: 'Tavan Lambası',
      price: 129.99,
      description: 'WiFi bağlantısı, sesli kontrol ve renk değiştirme özelliklerine sahip akıllı tavan lambası.',
      power: 36,
      voltage: 120,
      efficiency: 90,
      lifespan: 60000,
      color: 'RGB',
      material: 'Alüminyum',
      media: [
        {
          id: '4',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg',
          name: 'Akıllı özellikler'
        },
        {
          id: '5',
          type: 'video',
          url: 'https://example.com/smart-light-demo.mp4',
          name: 'Kurulum rehberi'
        }
      ]
    }
  ],
  'Fanli Tavan Lambası': [
    {
      id: '4',
      name: 'LED\'li Tavan Vantilatörü',
      code: 'GLB-02-01',
      category: 'Fanli Tavan Lambası',
      price: 199.99,
      description: 'Entegre LED aydınlatma ve uzaktan kumanda ile enerji verimli tavan vantilatörü.',
      power: 45,
      voltage: 120,
      efficiency: 75,
      lifespan: 30000,
      color: 'Beyaz',
      material: 'Çelik',
      media: [
        {
          id: '6',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
          name: 'Tam görünüm'
        }
      ]
    },
    {
      id: '5',
      name: 'Akıllı Tavan Vantilatörü',
      code: 'GLB-02-02',
      category: 'Fanli Tavan Lambası',
      price: 299.99,
      description: 'LED ışık, uygulama kontrolü ve değişken hız ayarları ile akıllı tavan vantilatörü.',
      power: 60,
      voltage: 120,
      efficiency: 80,
      lifespan: 35000,
      color: 'Bronz',
      material: 'Çelik',
      media: [
        {
          id: '7',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg',
          name: 'Bronz kaplama'
        }
      ]
    }
  ],
  'Gömme Tavan Armatürü': [
    {
      id: '6',
      name: '6 İnç LED Gömme Spot',
      code: 'GLB-03-01',
      category: 'Gömme Tavan Armatürü',
      price: 34.99,
      description: 'Dimmerli özelliğe sahip yüksek verimli 6 inç LED gömme downlight.',
      power: 12,
      voltage: 120,
      efficiency: 90,
      lifespan: 50000,
      color: 'Beyaz',
      material: 'Alüminyum',
      media: [
        {
          id: '8',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg',
          name: 'Gömme kurulum'
        }
      ]
    },
    {
      id: '7',
      name: '4 İnç Ayarlanabilir Gömme Spot',
      code: 'GLB-03-02',
      category: 'Gömme Tavan Armatürü',
      price: 42.99,
      description: 'Vurgu aydınlatması için eğim özelliği olan ayarlanabilir 4 inç gömme spot.',
      power: 8,
      voltage: 120,
      efficiency: 85,
      lifespan: 45000,
      color: 'Beyaz',
      material: 'Alüminyum',
      media: [
        {
          id: '9',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571466/pexels-photo-1571466.jpeg',
          name: 'Ayarlanabilir açı'
        }
      ]
    }
  ],
  'Avize': [
    {
      id: '8',
      name: 'Kristal LED Avize',
      code: 'GLB-04-01',
      category: 'Avize',
      price: 449.99,
      description: 'LED ampuller ve dimmer özelliği ile zarif kristal avize.',
      power: 72,
      voltage: 120,
      efficiency: 75,
      lifespan: 40000,
      color: 'Krom',
      material: 'Kristal',
      media: [
        {
          id: '10',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg',
          name: 'Kristal detaylar'
        }
      ]
    },
    {
      id: '9',
      name: 'Modern Geometrik Avize',
      code: 'GLB-04-02',
      category: 'Avize',
      price: 329.99,
      description: 'Entegre LED şeritler ile çağdaş geometrik avize.',
      power: 48,
      voltage: 120,
      efficiency: 80,
      lifespan: 45000,
      color: 'Siyah',
      material: 'Çelik',
      media: [
        {
          id: '11',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
          name: 'Geometrik tasarım'
        }
      ]
    }
  ],
  'Güneş Enerjili Lamba': [
    {
      id: '10',
      name: 'Güneş Enerjili Yol Lambası',
      code: 'GLB-05-01',
      category: 'Güneş Enerjili Lamba',
      price: 24.99,
      description: 'Otomatik açma/kapama özelliği ile hava koşullarına dayanıklı güneş enerjili yol lambası.',
      power: 3,
      voltage: 3,
      efficiency: 70,
      lifespan: 25000,
      color: 'Siyah',
      material: 'Plastik',
      media: [
        {
          id: '12',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg',
          name: 'Yol kurulumu'
        }
      ]
    },
    {
      id: '11',
      name: 'Güneş Enerjili Projektör',
      code: 'GLB-05-02',
      category: 'Güneş Enerjili Lamba',
      price: 79.99,
      description: 'Hareket sensörü ve uzaktan kumanda ile yüksek güçlü güneş enerjili projektör.',
      power: 20,
      voltage: 12,
      efficiency: 75,
      lifespan: 30000,
      color: 'Siyah',
      material: 'Alüminyum',
      media: [
        {
          id: '13',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg',
          name: 'Monte edilmiş projektör'
        }
      ]
    }
  ],
  'Sensörler': [
    {
      id: '12',
      name: 'Hareket Sensörlü Anahtar',
      code: 'GLB-06-01',
      category: 'Sensörler',
      price: 19.99,
      description: 'Otomatik aydınlatma kontrolü için PIR hareket sensörlü anahtar.',
      voltage: 120,
      material: 'Plastik',
      media: [
        {
          id: '14',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg',
          name: 'Duvara monte sensör'
        }
      ]
    },
    {
      id: '13',
      name: 'Gün Işığı Sensörü',
      code: 'GLB-06-02',
      category: 'Sensörler',
      price: 29.99,
      description: 'Otomatik dış mekan aydınlatma kontrolü için fotohücre gün ışığı sensörü.',
      voltage: 120,
      material: 'Plastik',
      media: [
        {
          id: '15',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg',
          name: 'Gün ışığı sensörü'
        }
      ]
    }
  ],
  'AC-DC Adaptör': [
    {
      id: '14',
      name: '12V 5A AC-DC Adaptör',
      code: 'GLB-07-01',
      category: 'AC-DC Adaptör',
      price: 15.99,
      description: 'Çoklu fiş türleri ile evrensel 12V 5A AC\'den DC\'ye güç adaptörü.',
      power: 60,
      voltage: 12,
      efficiency: 85,
      material: 'Plastik',
      media: [
        {
          id: '16',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571473/pexels-photo-1571473.jpeg',
          name: 'AC-DC adaptör'
        }
      ]
    },
    {
      id: '15',
      name: '24V 3A AC-DC Adaptör',
      code: 'GLB-07-02',
      category: 'AC-DC Adaptör',
      price: 22.99,
      description: 'Aşırı voltaj koruması ile yüksek verimli 24V 3A AC\'den DC\'ye güç adaptörü.',
      power: 72,
      voltage: 24,
      efficiency: 90,
      material: 'Plastik',
      media: [
        {
          id: '17',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571474/pexels-photo-1571474.jpeg',
          name: '24V adaptör'
        }
      ]
    }
  ],
  'DC-DC Adaptör': [
    {
      id: '16',
      name: '12V\'den 5V\'ye DC-DC Dönüştürücü',
      code: 'GLB-08-01',
      category: 'DC-DC Adaptör',
      price: 12.99,
      description: '3A çıkış kapasitesi ile 12V\'den 5V\'ye düşürücü DC-DC dönüştürücü.',
      power: 15,
      voltage: 5,
      efficiency: 95,
      material: 'Plastik',
      media: [
        {
          id: '18',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571475/pexels-photo-1571475.jpeg',
          name: 'DC-DC dönüştürücü'
        }
      ]
    },
    {
      id: '17',
      name: '24V\'den 12V\'ye DC-DC Dönüştürücü',
      code: 'GLB-08-02',
      category: 'DC-DC Adaptör',
      price: 18.99,
      description: '10A çıkış ile yüksek verimli 24V\'den 12V\'ye DC-DC dönüştürücü.',
      power: 120,
      voltage: 12,
      efficiency: 92,
      material: 'Alüminyum',
      media: [
        {
          id: '19',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571476/pexels-photo-1571476.jpeg',
          name: 'Yüksek güç dönüştürücü'
        }
      ]
    }
  ],
  'LED\'ler': [
    {
      id: '18',
      name: 'LED Şerit Işık 5m',
      code: 'GLB-09-01',
      category: 'LED\'ler',
      price: 39.99,
      description: 'Yapışkan arka yüzey ve uzaktan kumanda ile 5 metre su geçirmez LED şerit ışık.',
      power: 36,
      voltage: 12,
      efficiency: 85,
      lifespan: 50000,
      color: 'RGB',
      material: 'Silikon',
      media: [
        {
          id: '20',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571477/pexels-photo-1571477.jpeg',
          name: 'LED şerit renkleri'
        },
        {
          id: '21',
          type: 'video',
          url: 'https://example.com/led-strip-demo.mp4',
          name: 'Renk değiştirme demosu'
        }
      ]
    },
    {
      id: '19',
      name: 'Yüksek Güçlü LED Ampul',
      code: 'GLB-09-02',
      category: 'LED\'ler',
      price: 8.99,
      description: 'E27 duy ve 2700K sıcak beyaz renk ile enerji verimli LED ampul.',
      power: 9,
      voltage: 120,
      efficiency: 90,
      lifespan: 25000,
      color: 'Sıcak Beyaz',
      material: 'Plastik',
      media: [
        {
          id: '22',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571478/pexels-photo-1571478.jpeg',
          name: 'LED ampul'
        }
      ]
    },
    {
      id: '20',
      name: 'LED Panel Işık',
      code: 'GLB-09-03',
      category: 'LED\'ler',
      price: 49.99,
      description: 'Ofis ve ticari uygulamalar için ultra ince LED panel ışık.',
      power: 40,
      voltage: 120,
      efficiency: 88,
      lifespan: 45000,
      color: 'Soğuk Beyaz',
      material: 'Alüminyum',
      media: [
        {
          id: '23',
          type: 'image',
          url: 'https://images.pexels.com/photos/1571479/pexels-photo-1571479.jpeg',
          name: 'Kurulu panel ışık'
        }
      ]
    }
  ]
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Record<string, Product[]>>(initialProducts);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString()
    };

    setProducts(prev => ({
      ...prev,
      [productData.category]: [...(prev[productData.category] || []), newProduct]
    }));
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts(prev => {
      const newProducts = { ...prev };
      
      // Find the product in all categories
      for (const category in newProducts) {
        const productIndex = newProducts[category].findIndex(p => p.id === id);
        if (productIndex !== -1) {
          const updatedProduct = { ...newProducts[category][productIndex], ...updatedData };
          
          // If category changed, move the product
          if (updatedData.category && updatedData.category !== category) {
            newProducts[category] = newProducts[category].filter(p => p.id !== id);
            newProducts[updatedData.category] = [...(newProducts[updatedData.category] || []), updatedProduct];
          } else {
            newProducts[category][productIndex] = updatedProduct;
          }
          break;
        }
      }
      
      return newProducts;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => {
      const newProducts = { ...prev };
      
      for (const category in newProducts) {
        newProducts[category] = newProducts[category].filter(p => p.id !== id);
      }
      
      return newProducts;
    });
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};