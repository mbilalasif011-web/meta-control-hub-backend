import React, { useState } from 'react';
import { Play, Pause, Settings, TrendingUp, Users, FileText } from 'lucide-react';

interface Page {
  id: string;
  name: string;
  sourcePage: string;
  status: 'active' | 'paused';
  postsToday: number;
  totalPosts: number;
  followers: number;
}

const demoPages: Page[] = [
  { id: '1', name: 'XTREM FUNN', sourcePage: 'Funny Videos Daily', status: 'active', postsToday: 3, totalPosts: 45, followers: 12500 },
  { id: '2', name: 'Viral Clips', sourcePage: 'Viral Hub', status: 'active', postsToday: 5, totalPosts: 89, followers: 8700 },
  { id: '3', name: 'Meme World', sourcePage: 'Meme Central', status: 'paused', postsToday: 0, totalPosts: 22, followers: 3400 },
];

export const AutoDownloadUpload: React.FC = () => {
  const [pages, setPages] = useState<Page[]>(demoPages);

  const toggleStatus = (id: string) => {
    setPages(pages.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'paused' : 'active' } : p));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Auto Download/Upload</h1>
          <p className="text-sm text-gray-500 mt-1">Automatically download and upload content to your pages</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Settings size={16} />
          Configure
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {pages.map((page) => (
          <div key={page.id} className="card p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(page.name)}&background=random`}
                  alt={page.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{page.name}</h3>
                  <p className="text-xs text-gray-500">from {page.sourcePage}</p>
                </div>
              </div>
              <button
                onClick={() => toggleStatus(page.id)}
                className={`p-2 rounded-lg transition-colors ${
                  page.status === 'active'
                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {page.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                page.status === 'active'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${page.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                {page.status === 'active' ? 'Running' : 'Paused'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <FileText size={14} className="text-gray-400" />
                  <p className="text-lg font-bold text-gray-900">{page.postsToday}</p>
                </div>
                <p className="text-xs text-gray-500">Today</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp size={14} className="text-gray-400" />
                  <p className="text-lg font-bold text-gray-900">{page.totalPosts}</p>
                </div>
                <p className="text-xs text-gray-500">Total</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users size={14} className="text-gray-400" />
                  <p className="text-lg font-bold text-gray-900">{(page.followers / 1000).toFixed(1)}k</p>
                </div>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
