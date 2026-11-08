import React, { useState, useEffect, useRef } from 'react';
import { fabricServiceInstance } from '../../services/fabricService';
import { dbService } from '../../services/dbService';
import { STOCK_IMAGES } from '../../assets/stockImages';
import { StockImage } from '../../types/editor';
import { UploadCloud, Image as ImageIcon, Trash2, Search, ExternalLink } from 'lucide-react';

export const UploadsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'uploads' | 'stock'>('uploads');
  const [userUploads, setUserUploads] = useState<{ id: string; name: string; dataUrl: string; createdAt: number }[]>([]);
  const [stockCategory, setStockCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadUploads();
  }, []);

  const loadUploads = async () => {
    try {
      const list = await dbService.getAllUploads();
      setUserUploads(list);
    } catch (err) {
      console.error('Failed to load uploads:', err);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) return;

        const uploadItem = {
          id: 'up-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
          name: file.name,
          dataUrl,
          createdAt: Date.now(),
        };

        await dbService.saveUpload(uploadItem);
        await loadUploads();

        // Immediately add to canvas too
        fabricServiceInstance.addImage(dataUrl, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteUpload = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await dbService.deleteUpload(id);
    await loadUploads();
  };

  const filteredStock = STOCK_IMAGES.filter((item) => {
    const matchesCat = stockCategory === 'all' || item.category === stockCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#2d2d2d]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-blue-400" />
            <h2 className="text-sm font-semibold text-white">Media & Uploads</h2>
          </div>
        </div>

        {/* Sub-tabs: User Uploads vs Curated Stock */}
        <div className="grid grid-cols-2 p-1 bg-[#252525] rounded-xl border border-[#333333]">
          <button
            onClick={() => setActiveTab('uploads')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'uploads'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Uploads ({userUploads.length})
          </button>
          <button
            onClick={() => setActiveTab('stock')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'stock'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Stock Photos
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'uploads' ? (
          <>
            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFileUpload(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-[#3a3a3a] hover:border-blue-500/50 bg-[#252525]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2.5">
                <UploadCloud className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-white">Upload Media</span>
              <span className="text-[11px] text-gray-400 mt-1">
                Drag and drop files here, or browse (PNG, JPG, SVG)
              </span>
            </div>

            {/* Uploaded Items Grid */}
            {userUploads.length > 0 ? (
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2.5">
                  Uploaded Assets
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {userUploads.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => fabricServiceInstance.addImage(item.dataUrl, item.name)}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-[#181818] border border-[#333333] hover:border-blue-500 cursor-pointer shadow-sm transition-all"
                    >
                      <img
                        src={item.dataUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[11px] font-medium text-white px-2 py-1 rounded bg-blue-600/90">
                          Add
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleDeleteUpload(e, item.id)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/70 text-gray-400 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete upload"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-xs">
                No uploads yet. Drag an image above to start!
              </div>
            )}
          </>
        ) : (
          <>
            {/* Search Stock Photos */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search stock photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#252525] border border-[#383838] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['all', 'tech', 'nature', 'business', 'food', 'abstract', 'people'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setStockCategory(cat)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium capitalize whitespace-nowrap transition-all ${
                    stockCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#252525] text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Stock Photos Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {filteredStock.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => fabricServiceInstance.addImage(photo.url, photo.title)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-[#181818] border border-[#333333] hover:border-blue-500 cursor-pointer shadow-sm transition-all"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                    <span className="text-[11px] font-semibold text-white leading-tight">
                      {photo.title}
                    </span>
                    <span className="text-[9px] text-gray-400">Photo by {photo.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

