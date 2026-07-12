import React, { useState } from 'react';
import { Calendar, Clock, Plus, Image, Video, Type } from 'lucide-react';

const demoAccounts = [
  { id: '1', name: 'Bilal Asif', pages: ['XTREM FUNN', 'Viral Clips'] },
];

export const DirectSchedule: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedPage, setSelectedPage] = useState('');
  const [postType, setPostType] = useState<'text' | 'image' | 'video'>('text');
  const [caption, setCaption] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const pages = selectedAccount
    ? demoAccounts.find(a => a.id === selectedAccount)?.pages || []
    : [];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Direct Schedule</h1>
        <p className="text-sm text-gray-500 mt-1">Schedule posts for later</p>
      </div>

      <div className="card p-6 space-y-6">
        {/* Account & Page */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account</label>
            <select
              value={selectedAccount}
              onChange={(e) => { setSelectedAccount(e.target.value); setSelectedPage(''); }}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select...</option>
              {demoAccounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page</label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select...</option>
              {pages.map(page => (
                <option key={page} value={page}>{page}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Post Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
          <div className="flex gap-2">
            {[
              { type: 'text' as const, icon: Type, label: 'Text' },
              { type: 'image' as const, icon: Image, label: 'Image' },
              { type: 'video' as const, icon: Video, label: 'Video' },
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setPostType(type)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  postType === type
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Caption */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write your post caption..."
            rows={4}
            className="w-full p-4 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Schedule Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Schedule Button */}
        <button
          disabled={!selectedPage || !caption || !scheduledDate || !scheduledTime}
          className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} />
          Schedule Post
        </button>
      </div>
    </div>
  );
};
