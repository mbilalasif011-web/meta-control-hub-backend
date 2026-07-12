import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Facebook,
  Users,
  Download,
  Trash2,
  Send,
  Calendar,
  Clock,
  Sparkles,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fbExpanded, setFbExpanded] = React.useState(true);

  const isActive = (path: string) => location.pathname === path;

  const menuItem = (path: string, label: string, icon: React.ReactNode) => (
    <button
      onClick={() => navigate(path)}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
        isActive(path) 
          ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <aside className="w-60 h-screen bg-gray-50 border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">MC</span>
        </div>
        <span className="font-semibold text-gray-800 text-sm">Meta Control Hub</span>
      </div>

      {/* Dashboard */}
      <div className="px-2 mb-2">
        {menuItem('/dashboard', 'Dashboard', <LayoutDashboard size={18} />)}
      </div>

      {/* PLATFORM Section - ONLY FACEBOOK */}
      <div className="px-2 mb-1">
        <p className="px-4 text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Platform</p>

        {/* Facebook */}
        <div>
          <button 
            onClick={() => setFbExpanded(!fbExpanded)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <Facebook size={18} className="text-blue-600" />
              <span>Facebook</span>
            </div>
            {fbExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {fbExpanded && (
            <div className="ml-2">
              {menuItem('/accounts', 'Accounts', <Users size={16} />)}
              {menuItem('/auto-upload', 'Auto Download/Upload', <Download size={16} />)}
              {menuItem('/bulk-delete', 'Bulk Delete Posts', <Trash2 size={16} />)}
              {menuItem('/direct-post', 'Direct Post', <Send size={16} />)}
              {menuItem('/direct-schedule', 'Direct Schedule', <Calendar size={16} />)}
              {menuItem('/inapp-schedule', 'InApp Schedule', <Clock size={16} />)}
              {menuItem('/ai-posts', 'AI Text/Image Posts', <Sparkles size={16} />)}
              {menuItem('/payout', 'Payout Transfer', <CreditCard size={16} />)}
            </div>
          )}
        </div>
      </div>

      {/* Settings */}
      <div className="px-2 mt-auto mb-4">
        <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <Settings size={18} />
            <span>Settings</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* User Card */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-medium text-emerald-700">
            BA
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Bilal Asif</p>
            <p className="text-xs text-gray-500">AGENCY</p>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-lg px-3 py-1.5 mb-2">
          <p className="text-xs text-emerald-700 font-medium">🪙 360 tokens</p>
        </div>
        <button className="w-full flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 px-4 py-2">
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};
