import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Trash2, Clock, Calendar } from 'lucide-react';

const demoPages = [
  { id: '1', page_name: 'XTREM FUNN', fb_page_id: '102846825943500', status: 'active', followers: 12500, followers_gained: 450, total_posted: 156, total_pending: 8, total_failed: 2, account_name: 'Bilal Asif' },
  { id: '2', page_name: 'FUNNY VIDS', fb_page_id: '102846825943501', status: 'invalid_token', followers: 8900, followers_gained: 120, total_posted: 89, total_pending: 3, total_failed: 1, account_name: 'Jien Jien' },
  { id: '3', page_name: 'LOL MOMENTS', fb_page_id: '102846825943502', status: 'active', followers: 5600, followers_gained: 230, total_posted: 67, total_pending: 5, total_failed: 0, account_name: 'Declan Declan' },
];

export const InAppSchedule: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const totalPending = demoPages.reduce((sum, p) => sum + p.total_pending, 0);
  const totalFailed = demoPages.reduce((sum, p) => sum + p.total_failed, 0);

  const getStatusColor = (status: string) => {
    if (status === 'active') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (status === 'invalid_token') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Agency</span>
        <span>›</span>
        <span>InApp Schedule</span>
      </div>

      {/* Page Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">InApp Schedule</h1>
            <p className="text-gray-500 text-sm mt-1">Schedule posts through our internal queue system.</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus size={18} />
            Add Page
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase">Total Pages</p>
          <p className="text-2xl font-bold text-gray-900">{demoPages.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase">Pending Queue</p>
          <p className="text-2xl font-bold text-amber-600">{totalPending}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase">Failed Posts</p>
          <p className="text-2xl font-bold text-red-600">{totalFailed}</p>
        </div>
      </div>

      {/* Pages List */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Scheduling Pages</h2>
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
        </div>

        {/* Page Cards */}
        <div className="space-y-4">
          {demoPages.map(page => (
            <div 
              key={page.id} 
              onClick={() => navigate(`/inapp-schedule/${page.id}`)}
              className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
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
                    <p className="text-xs text-gray-400 mt-1">via {page.account_name}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500">👥 {page.followers.toLocaleString()} followers</span>
                      <span className="text-xs text-emerald-600">↑ {page.followers_gained} gained</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Posted</p>
                  <p className="text-lg font-bold text-emerald-600">{page.total_posted}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Pending</p>
                  <p className="text-lg font-bold text-amber-600">{page.total_pending}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Failed</p>
                  <p className="text-lg font-bold text-red-600">{page.total_failed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
