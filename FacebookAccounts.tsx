import React, { useState } from 'react';
import { Search, Plus, ExternalLink, Trash2, RefreshCw } from 'lucide-react';

interface Account {
  id: string;
  name: string;
  email: string;
  pagesCount: number;
  status: 'active' | 'expired';
  connectedAt: string;
}

const demoAccounts: Account[] = [
  { id: '1', name: 'Bilal Asif', email: 'bilal@example.com', pagesCount: 4, status: 'active', connectedAt: '2026-07-01' },
  { id: '2', name: 'Test Account', email: 'test@example.com', pagesCount: 2, status: 'active', connectedAt: '2026-07-05' },
  { id: '3', name: 'Agency Main', email: 'agency@example.com', pagesCount: 6, status: 'active', connectedAt: '2026-06-20' },
  { id: '4', name: 'Backup FB', email: 'backup@example.com', pagesCount: 1, status: 'expired', connectedAt: '2026-05-15' },
  { id: '5', name: 'Client A', email: 'clienta@example.com', pagesCount: 3, status: 'active', connectedAt: '2026-07-08' },
  { id: '6', name: 'Client B', email: 'clientb@example.com', pagesCount: 2, status: 'active', connectedAt: '2026-07-10' },
];

export const FacebookAccounts: React.FC = () => {
  const [accounts] = useState<Account[]>(demoAccounts);
  const [search, setSearch] = useState('');

  const filtered = accounts.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facebook Accounts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your connected Facebook accounts</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add Account
        </button>
      </div>

      <div className="card p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search accounts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Account</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Pages</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Connected</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=10b981&color=fff`}
                        alt={account.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{account.name}</p>
                        <p className="text-xs text-gray-500">{account.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{account.pagesCount} pages</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      account.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${account.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {account.status === 'active' ? 'Active' : 'Expired'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{account.connectedAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        <RefreshCw size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        <ExternalLink size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
