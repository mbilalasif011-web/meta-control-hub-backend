import React, { useEffect, useState } from 'react';
import { Search, Plus, Trash2, ExternalLink } from 'lucide-react';

interface FBPage {
  id: string;
  page_name: string;
  fb_page_id: string;
  status: string;
  followers: number;
  followers_gained: number;
  today_posted: number;
  today_pending: number;
  today_failed: number;
  account_name: string;
  instagram_handle: string;
  connected_at: string;
}

export const AutoDownloadUpload: React.FC = () => {
  const [pages, setPages] = useState<FBPage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API
    // fetch('/api/pages').then(res => res.json()).then(data => setPages(data))
    const demoPages = [
      { id: '1', page_name: 'XTREM FUNN', fb_page_id: '102846825943500', status: 'active', followers: 12500, followers_gained: 450, today_posted: 5, today_pending: 3, today_failed: 0, account_name: 'Bilal Asif', instagram_handle: '@xtremfunn', connected_at: 'JUN 24, 2026' },
      { id: '2', page_name: 'FUNNY VIDS', fb_page_id: '102846825943501', status: 'verification_required', followers: 8900, followers_gained: 120, today_posted: 2, today_pending: 1, today_failed: 0, account_name: 'Jien Jien', instagram_handle: '@funnyvids', connected_at: 'JUN 24, 2026' },
      { id: '3', page_name: 'LOL MOMENTS', fb_page_id: '102846825943502', status: 'active', followers: 5600, followers_gained: 230, today_posted: 4, today_pending: 2, today_failed: 1, account_name: 'Declan Declan', instagram_handle: '@lolmoments', connected_at: 'JUN 24, 2026' },
    ];
    setTimeout(() => {
      setPages(demoPages);
      setLoading(false);
    }, 500);
  }, []);

  const totalFollowers = pages.reduce((sum, p) => sum + p.followers, 0);
  const totalGained = pages.reduce((sum, p) => sum + p.followers_gained, 0);

  const getStatusColor = (status: string) => {
    if (status === 'active') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (status === 'verification_required') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Agency</span>
        <span>›</span>
        <span>Auto Download/Upload</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Auto Download/Upload</h1>
            <p className="text-gray-500 text-sm mt-1">Connected Facebook pages for automated reel download and posting.</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus size={18} />
            Add Page
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase">Total Pages</p>
          <p className="text-2xl font-bold text-gray-900">{pages.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase">Followers Gained</p>
          <p className="text-2xl font-bold text-emerald-600">+{totalGained.toLocaleString()}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase">Total Followers</p>
          <p className="text-2xl font-bold text-gray-900">{totalFollowers.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Automation Pages</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <select className="border border-gray-200 rounded-lg text-sm px-3 py-2">
              <option>All Statuses</option>
            </select>
            <select className="border border-gray-200 rounded-lg text-sm px-3 py-2">
              <option>Newest First</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {pages.map(page => (
            <div key={page.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${page.page_name}&background=random`}
                    alt={page.page_name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{page.page_name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${getStatusColor(page.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${page.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        {page.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-mono">{page.fb_page_id}</p>
                    <p className="text-xs text-gray-400 mt-1">via {page.account_name} · {page.connected_at}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500">📊 {page.followers.toLocaleString()} followers</span>
                      <span className="text-xs text-emerald-600">↑ {page.followers_gained} gained</span>
                      <span className="text-xs text-gray-500">📷 {page.instagram_handle}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-500">
                    <ExternalLink size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Today&apos;s Stats</p>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-emerald-600">{page.today_posted} posted</span>
                    <span className="text-xs text-amber-600">{page.today_pending} pending</span>
                    <span className="text-xs text-red-600">{page.today_failed} failed</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
