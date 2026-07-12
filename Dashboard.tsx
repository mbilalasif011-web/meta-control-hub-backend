import React, { useState, useEffect } from 'react';
import { Facebook, Users, Calendar, FileText, TrendingUp, Activity, Clock } from 'lucide-react';

interface Stats {
  fbAccounts: number;
  autoPages: number;
  scheduled: number;
  totalPosts: number;
}

const demoStats: Stats = {
  fbAccounts: 6,
  autoPages: 14,
  scheduled: 8,
  totalPosts: 156,
};

const recentActivity = [
  { action: 'Connected', target: 'XTREM FUNN', time: '2 min ago', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { action: 'Auto Upload', target: 'Funny Videos', time: '15 min ago', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
  { action: 'Queued', target: '3 posts', time: '1 hour ago', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
];

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>(demoStats);
  const [loading, setLoading] = useState(false);

  // Uncomment when API is ready:
  // useEffect(() => {
  //   setLoading(true);
  //   fetch('/api/stats')
  //     .then(res => res.json())
  //     .then(data => { setStats(data); setLoading(false); })
  //     .catch(() => { setStats(demoStats); setLoading(false); });
  // }, []);

  const statCards = [
    { label: 'FB Accounts', value: stats.fbAccounts, icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Auto Pages', value: stats.autoPages, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Scheduled', value: stats.scheduled, icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, Bilal! Here's what's happening.</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                <card.icon className={card.color} size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                <item.icon className={item.color} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {item.action} <span className="text-gray-500">- {item.target}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
