import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCategories from './components/ProductCategories';
import ProductDetails from './components/ProductDetails';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import { ProductProvider } from './context/ProductContext';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <ProductProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          currentView={currentView} 
          onViewChange={setCurrentView}
        />
        
        {currentView === 'home' && (
          <>
            <Hero />
            <ProductCategories 
              onProductSelect={(product) => {
                setSelectedProduct(product);
                setCurrentView('product');
              }}
            />
            <ContactSection />
          </>
        )}
        
        {currentView === 'product' && selectedProduct && (
          <ProductDetails 
            product={selectedProduct}
            onBack={() => setCurrentView('home')}
          />
        )}
        
        {currentView === 'admin' && (
          <AdminPanel onBack={() => setCurrentView('home')} />
        )}
      </div>
    </ProductProvider>
  );
}

export default App;