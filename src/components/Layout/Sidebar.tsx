import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Facebook, Download, Send, CalendarDays, CalendarClock, LogOut, Shield } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Facebook, label: 'Facebook Accounts', path: '/facebook-accounts' },
  { icon: Download, label: 'Auto Download/Upload', path: '/auto-download-upload' },
  { icon: Send, label: 'Direct Post', path: '/direct-post' },
  { icon: CalendarDays, label: 'Direct Schedule', path: '/direct-schedule' },
  { icon: CalendarClock, label: 'InApp Schedule', path: '/inapp-schedule' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
            <Shield className="text-white" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm leading-tight">Meta Control</h1>
            <p className="text-xs text-gray-500">Hub Pro</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://ui-avatars.com/api/?name=Bilal+Asif&background=10b981&color=fff"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Bilal Asif</p>
              <p className="text-xs text-gray-500">AGENCY</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Tokens</span>
            <span className="font-semibold text-emerald-600">360</span>
          </div>
        </div>
        <button className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};
