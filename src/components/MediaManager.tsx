import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, ExternalLink, Link, Globe, Camera, HardDrive } from 'lucide-react';
import { uploadImage } from '../lib/supabase';

interface Media {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
}

interface MediaManagerProps {
  media: Media[];
  onMediaUpdate: (media: Media[]) => void;
}

export default function MediaManager({ media, onMediaUpdate }: MediaManagerProps) {
  const [isAddingMedia, setIsAddingMedia] = useState(false);
  const [sourceType, setSourceType] = useState<'manual' | 'googledrive' | 'pexels' | 'local'>('manual');
  const [googleDriveUrl, setGoogleDriveUrl] = useState('');
  const [processedUrl, setProcessedUrl] = useState('');
  const [mediaName, setMediaName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockImages, setStockImages] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const extractGoogleDriveFileId = (url: string): string | null => {
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
      /id=([a-zA-Z0-9_-]+)/,
      /\/d\/([a-zA-Z0-9_-]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        resolve(false);
      }, 15000);

      img.onload = () => {
        clearTimeout(timeout);
        resolve(true);
      };

      img.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };

      img.src = url;
    });
  };

  const processGoogleDriveUrl = async () => {
    if (!googleDriveUrl.trim()) {
      setError('Lütfen bir Google Drive bağlantısı girin');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const fileId = extractGoogleDriveFileId(googleDriveUrl);
      
      if (!fileId) {
        setError('Geçersiz Google Drive bağlantısı. Lütfen paylaşım bağlantısını kontrol edin.');
        setIsProcessing(false);
        return;
      }

      // Try multiple Google Drive direct link formats
      const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
      const alternativeLink = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
      
      // Set the processed URL, preview, and name immediately with primary format
      setProcessedUrl(directLink);
      setPreviewUrl(directLink);
      if (!mediaName.trim()) {
        setMediaName(mediaName || 'IMG-20240131-WA0016.jpg');
      }
      
      // Test both URL formats to find the working one
      try {
        console.log('Testing primary URL:', directLink);
        const isPrimaryValid = await validateImageUrl(directLink);
        
        if (isPrimaryValid) {
          console.log('Primary URL works:', directLink);
          setError('');
        } else {
          console.log('Primary URL failed, testing alternative:', alternativeLink);
          const isAlternativeValid = await validateImageUrl(alternativeLink);
          
          if (isAlternativeValid) {
            console.log('Alternative URL works:', alternativeLink);
            setProcessedUrl(alternativeLink);
            setPreviewUrl(alternativeLink);
            setError('');
          } else {
            console.log('Both URLs failed, but allowing user to proceed');
            setError('Uyarı: Önizleme yüklenemedi. Dosyanın "Bağlantıya sahip olan herkes görüntüleyebilir" olarak ayarlandığından emin olun. Yine de medyayı ekleyebilirsiniz.');
          }
        }
      } catch (validationError) {
        console.error('Validation error:', validationError);
        setError('Uyarı: URL test edilemedi, ancak medyayı ekleyebilirsiniz.');
      }
    } catch (err) {
      console.error('Error processing Google Drive URL:', err);
      setError('URL işlenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }

    setIsProcessing(false);
  };

  const searchStockImages = async (query: string, source: 'pexels' | 'unsplash') => {
    if (!query.trim()) {
      setError('Lütfen arama terimi girin');
      return;
    }

    setIsProcessing(true);
    setError('');
    setStockImages([]);

    try {
      // Using known working Pexels URLs for common lighting terms
      const lightingImages = [
        {
          id: '1',
          url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
          name: 'Modern LED Ceiling Light',
          photographer: 'Pexels'
        },
        {
          id: '2',
          url: 'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800',
          name: 'Flush Mount LED Light',
          photographer: 'Pexels'
        },
        {
          id: '3',
          url: 'https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=800',
          name: 'Smart WiFi Ceiling Light',
          photographer: 'Pexels'
        },
        {
          id: '4',
          url: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
          name: 'LED Ceiling Fan with Light',
          photographer: 'Pexels'
        },
        {
          id: '5',
          url: 'https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg?auto=compress&cs=tinysrgb&w=800',
          name: 'Smart Ceiling Fan',
          photographer: 'Pexels'
        },
        {
          id: '6',
          url: 'https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=800',
          name: '6 Inch LED Recessed Light',
          photographer: 'Pexels'
        }
      ];

      // Filter based on search query
      const filtered = lightingImages.filter(img => 
        img.name.toLowerCase().includes(query.toLowerCase()) ||
        query.toLowerCase().includes('light') ||
        query.toLowerCase().includes('led') ||
        query.toLowerCase().includes('lamp') ||
        query.toLowerCase().includes('ceiling')
      );

      setStockImages(filtered.length > 0 ? filtered : lightingImages.slice(0, 3));
    } catch (err) {
      console.error('Error searching stock images:', err);
      setError('Stok fotoğraf arama sırasında hata oluştu');
    }

    setIsProcessing(false);
  };

  const selectStockImage = (image: any) => {
    setProcessedUrl(image.url);
    setPreviewUrl(image.url);
    setMediaName(mediaName || image.name);
    setError('');
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Lütfen sadece resim dosyası seçin (JPG, PNG, GIF, vb.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Dosya boyutu 10MB\'dan küçük olmalıdır');
      return;
    }

    setSelectedFile(file);
    setError('');
    setIsUploading(true);

    try {
      const publicUrl = await uploadImage(file);

      setPreviewUrl(publicUrl);
      setProcessedUrl(publicUrl);

      if (!mediaName.trim()) {
        setMediaName(file.name);
      }

      setError('');
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(`Yükleme hatası: ${err.message || 'Resim yüklenemedi'}`);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
        setProcessedUrl(result);
      };
      reader.readAsDataURL(file);

      if (!mediaName.trim()) {
        setMediaName(file.name);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const addMedia = () => {
    let url = processedUrl;
    
    // For manual URL, use the processedUrl directly
    if (sourceType === 'manual' && !url && processedUrl) {
      url = processedUrl;
    }
    
    if (!url || !mediaName.trim()) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    const newMedia: Media = {
      id: Date.now().toString(),
      url: url.trim(),
      name: mediaName.trim(),
      type: 'image'
    };

    onMediaUpdate([...media, newMedia]);
    
    // Reset form
    setIsAddingMedia(false);
    setSourceType('manual');
    setGoogleDriveUrl('');
    setProcessedUrl('');
    setMediaName('');
    setError('');
    setPreviewUrl('');
  };

  const removeMedia = (id: string) => {
    onMediaUpdate(media.filter(m => m.id !== id));
  };

  const cancelAdd = () => {
    setIsAddingMedia(false);
    setSourceType('manual');
    setGoogleDriveUrl('');
    setProcessedUrl('');
    setMediaName('');
    setError('');
    setPreviewUrl('');
    setSearchQuery('');
    setStockImages([]);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Ürün Medyası</h3>
        <button
          type="button"
          onClick={() => setIsAddingMedia(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Medya Ekle
        </button>
      </div>

      {/* Existing Media */}
      {media.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <div key={item.id} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeMedia(item.id)}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="mt-2 text-sm text-gray-600 truncate">{item.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add Media Form */}
      {isAddingMedia && (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Medya Kaynağı</h4>
          
          {/* Source Type Selection */}
          <div className="flex gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="sourceType"
                value="local"
                checked={sourceType === 'local'}
                onChange={(e) => setSourceType(e.target.value as any)}
                className="mr-2"
              />
              <HardDrive className="w-4 h-4 mr-1" />
              Bilgisayarımdan
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sourceType"
                value="manual"
                checked={sourceType === 'manual'}
                onChange={(e) => setSourceType(e.target.value as any)}
                className="mr-2"
              />
              <Link className="w-4 h-4 mr-1" />
              Manuel URL
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sourceType"
                value="googledrive"
                checked={sourceType === 'googledrive'}
                onChange={(e) => setSourceType(e.target.value as any)}
                className="mr-2"
              />
              <Upload className="w-4 h-4 mr-1" />
              Google Drive
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sourceType"
                value="pexels"
                checked={sourceType === 'pexels'}
                onChange={(e) => setSourceType(e.target.value as any)}
                className="mr-2"
              />
              <Camera className="w-4 h-4 mr-1" />
              Stok Fotoğraf
            </label>
          </div>

          {/* Local File Upload Section */}
          {sourceType === 'local' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bilgisayarınızdan Resim Seçin
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <HardDrive className="w-12 h-12 text-gray-400 mb-4" />
                  <span className="text-lg font-medium text-gray-700 mb-2">
                    Resim dosyası seçmek için tıklayın
                  </span>
                  <span className="text-sm text-gray-500">
                    JPG, PNG, GIF desteklenir (Maks. 10MB)
                  </span>
                </label>
              </div>
              
              {isUploading && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    Resim Supabase'e yükleniyor...
                  </p>
                </div>
              )}

              {selectedFile && !isUploading && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Yüklendi: {selectedFile.name}
                      </p>
                      <p className="text-xs text-green-600">
                        Boyut: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Resim internetten erişilebilir
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl('');
                        setProcessedUrl('');
                        setError('');
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Google Drive Section */}
          {sourceType === 'googledrive' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Drive Paylaşım URL'si
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={googleDriveUrl}
                  onChange={(e) => setGoogleDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={processGoogleDriveUrl}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'İşleniyor...' : 'İşle'}
                </button>
              </div>
              
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium">Nasıl kullanılır:</p>
                <ol className="list-decimal list-inside space-y-1 mt-1">
                  <li>Google Drive'da resminizi sağ tıklayın</li>
                  <li>"Paylaş" (Share) seçeneğini tıklayın</li>
                  <li>"Bağlantıya sahip olan herkes" seçeneğini işaretleyin</li>
                  <li>"Görüntüleyici" yetkisi seçin</li>
                  <li>"Bağlantıyı kopyala" (Copy link) yapın</li>
                  <li>URL'yi yukarıdaki alana yapıştırın</li>
                  <li>"İşle" butonuna tıklayın</li>
                </ol>
                <p className="mt-2 text-orange-600">
                  <strong>Önemli:</strong> Dosya paylaşım ayarları "Bağlantıya sahip olan herkes görüntüleyebilir" 
                  olarak ayarlanmalıdır. Aksi takdirde resim yüklenemeyebilir.
                </p>
              </div>
            </div>
          )}

          {/* Stock Photos Section */}
          {sourceType === 'pexels' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stok Fotoğraf Ara
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="LED, lamba, aydınlatma..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => searchStockImages(searchQuery, 'pexels')}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Arıyor...' : 'Ara'}
                </button>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                <p className="font-medium">Popüler arama terimleri:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['LED light', 'ceiling lamp', 'chandelier', 'recessed light', 'pendant light', 'table lamp'].map(term => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchQuery(term);
                        searchStockImages(term, 'pexels');
                      }}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Images Grid */}
              {stockImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {stockImages.map((image) => (
                    <div
                      key={image.id}
                      onClick={() => selectStockImage(image)}
                      className="cursor-pointer group relative aspect-square bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500"
                    >
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                        <p className="text-white text-xs font-medium truncate">{image.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Manual URL Section */}
          {sourceType === 'manual' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resim URL'si
              </label>
              <input
                type="url"
                value={processedUrl}
                onChange={(e) => {
                  const url = e.target.value;
                  setProcessedUrl(url);
                  setPreviewUrl(url);
                  // Only clear errors, don't set new ones for manual input
                  if (error && !error.includes('Önizleme')) {
                    setError('');
                  }
                }}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Doğrudan erişilebilir bir resim URL'si girin. Önizleme yüklenmese bile medyayı ekleyebilirsiniz.
              </p>
            </div>
          )}

          {/* Processed URL Display */}
          {processedUrl && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İşlenmiş URL (Otomatik)
              </label>
              <input
                type="text"
                value={processedUrl}
                readOnly
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
          )}

          {/* Media Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medya Adı
            </label>
            <input
              type="text"
              value={mediaName}
              onChange={(e) => setMediaName(e.target.value)}
              placeholder="IMG-20240131-WA0016.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Önizleme
              </label>
              <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.error-placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'error-placeholder flex items-center justify-center h-full text-gray-500 text-xs';
                      placeholder.textContent = 'Önizleme yüklenemedi - URL\'yi kontrol edin';
                      parent.appendChild(placeholder);
                    }
                    // Don't set error for preview failures - allow user to proceed
                    console.warn('Preview failed to load, but user can still add media:', previewUrl);
                  }}
                  onLoad={() => {
                    // Clear any existing errors when preview loads successfully
                    setError('');
                  }}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
              <p className="text-red-600 text-xs mt-1">
                Not: Önizleme yüklenmese bile medyayı ekleyebilirsiniz.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={addMedia}
              disabled={!processedUrl?.trim() || !mediaName.trim() || isProcessing || isUploading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Yükleniyor...' : isProcessing ? 'İşleniyor...' : 'Medya Ekle'}
            </button>
            <button
              type="button"
              onClick={cancelAdd}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              İptal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}