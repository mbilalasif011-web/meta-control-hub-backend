import React, { useState } from 'react';
import { Send, Image, Video, Type, Loader2 } from 'lucide-react';

const demoAccounts = [
  { id: '1', name: 'Bilal Asif', pages: ['XTREM FUNN', 'Viral Clips'] },
  { id: '2', name: 'Test Account', pages: ['Meme World'] },
];

export const DirectPost: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedPage, setSelectedPage] = useState('');
  const [postType, setPostType] = useState<'text' | 'image' | 'video'>('text');
  const [caption, setCaption] = useState('');
  const [publishing, setPublishing] = useState(false);

  const handlePublish = () => {
    setPublishing(true);
    // Simulate API call
    setTimeout(() => {
      setPublishing(false);
      setCaption('');
      alert('Post published successfully!');
    }, 2000);
  };

  const pages = selectedAccount
    ? demoAccounts.find(a => a.id === selectedAccount)?.pages || []
    : [];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Direct Post</h1>
        <p className="text-sm text-gray-500 mt-1">Post directly to your Facebook pages</p>
      </div>

      <div className="card p-6 space-y-6">
        {/* Account Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Account</label>
          <select
            value={selectedAccount}
            onChange={(e) => { setSelectedAccount(e.target.value); setSelectedPage(''); }}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Choose an account...</option>
            {demoAccounts.map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>

        {/* Page Select */}
        {selectedAccount && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Page</label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Choose a page...</option>
              {pages.map(page => (
                <option key={page} value={page}>{page}</option>
              ))}
            </select>
          </div>
        )}

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
            rows={5}
            className="w-full p-4 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Media Upload */}
        {postType !== 'text' && (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <Image size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Drag & drop {postType} here or click to browse</p>
          </div>
        )}

        {/* Publish Button */}
        <button
          onClick={handlePublish}
          disabled={!selectedPage || !caption || publishing}
          className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {publishing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Send size={18} />
              Publish Post
            </>
          )}
        </button>
      </div>
    </div>
  );
};
