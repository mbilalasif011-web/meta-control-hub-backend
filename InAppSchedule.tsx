import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, TrendingUp, FileText, Clock, AlertCircle } from 'lucide-react';

interface Page {
  id: string;
  name: string;
  fbPageId: string;
  status: 'active' | 'inactive';
  followers: number;
  followersGained: number;
  totalPosted: number;
  totalPending: number;
  totalFailed: number;
  isSchedulingActive: boolean;
}

const demoPages: Page[] = [
  { id: '1', name: 'XTREM FUNN', fbPageId: '102846825943500', status: 'active', followers: 12500, followersGained: 450, totalPosted: 156, totalPending: 8, totalFailed: 2, isSchedulingActive: true },
  { id: '2', name: 'Viral Clips', fbPageId: '102846825943501', status: 'active', followers: 8700, followersGained: 320, totalPosted: 89, totalPending: 5, totalFailed: 1, isSchedulingActive: true },
  { id: '3', name: 'Meme World', fbPageId: '102846825943502', status: 'inactive', followers: 3400, followersGained: 120, totalPosted: 45, totalPending: 3, totalFailed: 0, isSchedulingActive: false },
];

export const InAppSchedule: React.FC = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<Page[]>(demoPages);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Uncomment when API is ready:
  // useEffect(() => {
  //   setLoading(true);
  //   fetch('/api/pages')
  //     .then(res => res.json())
  //     .then(data => { setPages(data); setLoading(false); })
  //     .catch(() => { setPages(demoPages); setLoading(false); });
  // }, []);

  const filtered = pages.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">InApp Schedule</h1>
          <p className="text-sm text-gray-500 mt-1">Manage scheduled posts for your pages</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add Page
        </button>
      </div>

      <div className="card p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {filtered.map((page) => (
          <div
            key={page.id}
            onClick={() => navigate(`/inapp-schedule/${page.id}`)}
            className="card p-5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(page.name)}&background=random`}
                  alt={page.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{page.name}</h3>
                  <p className="text-xs text-gray-500">{page.fbPageId}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                page.status === 'active'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${page.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                {page.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp size={14} className="text-emerald-600" />
                  <p className="text-lg font-bold text-gray-900">{page.followers.toLocaleString()}</p>
                </div>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp size={14} className="text-emerald-600" />
                  <p className="text-lg font-bold text-emerald-600">+{page.followersGained}</p>
                </div>
                <p className="text-xs text-gray-500">Gained</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <FileText size={14} className="text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">{page.totalPosted}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-amber-600" />
                  <span className="text-sm font-medium text-gray-700">{page.totalPending}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-red-600" />
                  <span className="text-sm font-medium text-gray-700">{page.totalFailed}</span>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                page.isSchedulingActive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {page.isSchedulingActive ? 'Scheduling ON' : 'Scheduling OFF'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
