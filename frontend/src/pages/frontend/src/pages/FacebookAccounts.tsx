import React, { useState } from 'react';
import { Search, Trash2, RefreshCw, Play, Users, Facebook } from 'lucide-react';

// Demo data
const demoAccounts = [
  { id: '1', fb_account_id: '122109583113358482', account_name: 'Emma Emman', status: 'suspended', adu_connected_pages: 0, connected_at: 'JUN 24, 2026' },
  { id: '2', fb_account_id: '122113734411355636', account_name: 'Jien Jien', status: 'active', adu_connected_pages: 4, connected_at: 'JUN 24, 2026' },
  { id: '3', fb_account_id: '122112403851356183', account_name: 'Declan Declan', status: 'active', adu_connected_pages: 3, connected_at: 'JUN 24, 2026' },
  { id: '4', fb_account_id: '122107451769360948', account_name: 'Jordi Jordi', status: 'active', adu_connected_pages: 4, connected_at: 'JUN 24, 2026' },
  { id: '5', fb_account_id: '960981140148777', account_name: 'Bilal Asif', status: 'active', adu_connected_pages: 0, connected_at: 'JUN 23, 2026' },
  { id: '6', fb_account_id: '122099033660542475', account_name: 'Daphne Zoe', status: 'active', adu_connected_pages: 3, connected_at: 'JUN 17, 2026' },
];

export const FacebookAccounts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showConnectModal, setShowConnectModal] = useState(false);

  const filteredAccounts = demoAccounts.filter(a => 
    a.account_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.fb_account_id.includes(searchTerm)
  );

  const activeCount = demoAccounts.filter(a => a.status === 'active').length;

  const getStatusColor = (status: string) => {
    if (status === 'active') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (status === 'suspended') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Agency</span>
        <span>›</span>
        <span>FB Accounts</span>
      </div>

      {/* Page Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Users className="text-emerald-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Facebook accounts</h1>
              <p className="text-gray-500 text-sm mt-1">Manage connected Facebook accounts, token health, and reconnect when needed.</p>
              <button className="mt-2 flex items-center gap-1.5 text-sm text-red-500 bg-red-50 px-3 py-1.5 rounded-lg">
                <Play size={14} />
                Watch Tutorial Video
              </button>
            </div>
          </div>
          <button 
            onClick={() => setShowConnectModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Facebook size={18} />
            Connect Facebook Account
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">{demoAccounts.length}</span> connected ·{' '}
          <span className="text-emerald-600 font-semibold">{activeCount} active</span>
        </p>
      </div>

      {/* Connected Accounts Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-emerald-600" />
            <h2 className="font-semibold text-gray-900">Connected Accounts</h2>
            <span className="text-sm text-gray-500">{demoAccounts.length} accounts</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search accounts by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <select className="absolute right-2 top-1/2 -translate-y-1/2 text-sm border-none bg-transparent text-gray-500">
            <option>All statuses</option>
          </select>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAccounts.map(account => (
            <div key={account.id} className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${account.account_name}&background=random`}
                    alt={account.account_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{account.account_name}</h3>
                    <p className="text-xs text-gray-500 font-mono">{account.fb_account_id}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(account.status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${account.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
              </span>

              <p className="text-xs text-gray-500 mt-2">
                {account.adu_connected_pages} ADU connected pages
              </p>

              <div className="border-t border-gray-100 mt-3 pt-3">
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span>📅</span> CONNECTED {account.connected_at}
                </p>
              </div>

              <button className="w-full mt-3 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <RefreshCw size={14} />
                Reconnect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Connect Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowConnectModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Connect Facebook Account</h3>
              <button onClick={() => setShowConnectModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Facebook size={32} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Connect Facebook Account</h3>
              <p className="text-sm text-gray-500 mb-6">Authorize Meta Control Hub using your agency's configured App credentials.</p>
              
              <div className="flex gap-2 mb-6">
                <button className="flex-1 py-3 border-2 border-emerald-500 bg-emerald-50 rounded-lg text-sm font-medium text-emerald-700">
                  Direct Connect<br/><span className="text-xs text-gray-400">SAME BROWSER</span>
                </button>
                <button className="flex-1 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600">
                  Magic Link<br/><span className="text-xs text-gray-400">OTHER DEVICE</span>
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-left mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">🔒 Secure OAuth flow</p>
                <p className="text-xs text-gray-500">Recommended if you are logged into Facebook in this browser. You'll be redirected to Facebook to approve permissions, then returned here.</p>
              </div>

              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium">
                Continue in This Browser
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
