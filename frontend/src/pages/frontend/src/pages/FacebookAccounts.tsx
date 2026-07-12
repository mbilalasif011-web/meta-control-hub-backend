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
      <div className="bg-white rounded
