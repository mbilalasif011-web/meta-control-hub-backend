import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ExternalLink, Plus, Upload, X } from 'lucide-react';

const demoPage = {
  id: '1',
  page_name: 'XTREM FUNN',
  fb_page_id: '102846825943500',
  status: 'active',
  followers: 12500,
  followers_gained: 450,
  initial_followers: 12050,
  total_posted: 156,
  total_pending: 8,
  total_failed: 2,
  account_name: 'Bilal Asif',
  is_scheduling_active: true,
};

const demoQueue = [
  { id: '1', type: 'image', caption: 'Funny cat video #1', scheduled_time: '2026-07-12 14:00', status: 'pending', is_bulk: true },
  { id: '2', type: 'video', caption: 'Amazing compilation', scheduled_time: '2026-07-12 16:00', status: 'pending', is_bulk: true },
  { id: '3', type: 'text', caption: 'Daily joke post', scheduled_time: '2026-07-12 18:00', status: 'pending', is_bulk: false },
];

export const PageDetail: React.FC = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'queue' | 'settings'>('overview');
  const [showBulkQueue, setShowBulkQueue] = useState(false);
  const [showSingleQueue, setShowSingleQueue] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button onClick={() => navigate('/inapp-schedule')} className="hover:text-gray-700 flex items-center gap-1">
          <ArrowLeft size={14} />
          <span>Agency</span>
        </button>
        <span>›</span>
        <span>InApp Schedule</span>
        <span>›</span>
        <span className="text-gray-900 font-medium">{demoPage.page_name}</span>
      </div>

      {/* Page Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <img 
              src={`https://ui-avatars.com/api/?name=${demoPage.page_name}&background=random`}
              alt={demoPage.page_name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-semibold text-gray-900">{demoPage.page_name}</h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium bg-emerald-100 text-emerald-700 border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
              <p className="text-xs text-gray-500">via {demoPage.account_name} · {demoPage.fb_page_id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-blue-500">
              <ExternalLink size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Pending</p>
            <p className="text-xl font-bold text-amber-600">{demoPage.total_pending}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Posted</p>
            <p className="text-xl font-bold text-emerald-600">{demoPage.total_posted}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Failed</p>
            <p className="text-xl font-bold text-red-600">{demoPage.total_failed}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'overview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('queue')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'queue' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
        >
          Queue
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'settings' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
        >
          Settings
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card p-5">
            <p className="text-xs text-gray-500 uppercase">Current Followers</p>
            <p className="text-2xl font-bold text-gray-900">{demoPage.followers.toLocaleString()}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs text-gray-500 uppercase">Followers Gained</p>
            <p className="text-2xl font-bold text-emerald-600">+{demoPage.followers_gained}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs text-gray-500 uppercase">Initial Followers</p>
            <p className="text-2xl font-bold text-gray-900">{demoPage.initial_followers.toLocaleString()}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs text-gray-500 uppercase">Queue (Pending)</p>
            <p className="text-2xl font-bold text-amber-600">{demoPage.total_pending}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs text-gray-500 uppercase">Published</p>
            <p className="text-2xl font-bold text-emerald-600">{demoPage.total_posted}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs text-gray-500 uppercase">Failed</p>
            <p className="text-2xl font-bold text-red-600">{demoPage.total_failed}</p>
          </div>
        </div>
      )}

      {activeTab === 'queue' && (
        <div>
          {/* Queue Actions */}
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setShowBulkQueue(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Upload size={16} />
              Bulk Queue
            </button>
            <button 
              onClick={() => setShowSingleQueue(true)}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Plus size={16} />
              Queue Post
            </button>
          </div>

          {/* Queue List */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Pending Posts Queue</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {demoQueue.map((item, index) => (
                <div key={item.id} className="p-4 flex items-center gap-4">
                  <span className="text-sm text-gray-400 font-mono">#{index + 1}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.type === 'image' ? 'bg-blue-100 text-blue-700' :
                    item.type === 'video' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.type.toUpperCase()}
                  </span>
                  {item.is_bulk && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                      BULK
                    </span>
                  )}
                  <p className="text-sm text-gray-700 flex-1">{item.caption}</p>
                  <p className="text-xs text-gray-500">{item.scheduled_time}</p>
                  <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Edit</button>
                  <button className="text-xs text-red-500 hover:text-red-600 font-medium">Cancel</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Schedule Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Posts Per Day</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                  <button
                    key={num}
                    className={`w-10 h-10 rounded-lg text-sm font-medium ${
                      num === 3 ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm">
                <option>Asia/Karachi (UTC+5)</option>
                <option>Asia/Dubai (UTC+4)</option>
                <option>America/New_York (UTC-5)</option>
                <option>Europe/London (UTC+0)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Queue Modal */}
      {showBulkQueue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowBulkQueue(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Bulk Queue Posts</h3>
              <button onClick={() => setShowBulkQueue(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">0 / 150 Posts</p>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-4">
              <Upload size={32} className="text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Drag & drop files here or click to browse</p>
              <button className="mt-2 text-sm text-emerald-600 font-medium">+ Start with Text Post</button>
            </div>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium">
              Queue 0 Posts
            </button>
          </div>
        </div>
      )}

      {/* Single Queue Modal */}
      {showSingleQueue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowSingleQueue(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Queue Post</h3>
              <button onClick={() => setShowSingleQueue(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">Text</button>
                <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">Image</button>
                <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">Video</button>
              </div>
              <textarea
                placeholder="Write your post caption..."
                className="w-full h-32 p-4 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium">
                Queue Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
