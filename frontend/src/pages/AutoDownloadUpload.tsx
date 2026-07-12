import React, { useState } from 'react';
import { Send, Image, Video, Type, Facebook } from 'lucide-react';

const demoAccounts = [
  { id: '1', account_name: 'Bilal Asif', fb_account_id: '960981140148777' },
  { id: '2', account_name: 'Jien Jien', fb_account_id: '122113734411355636' },
];

export const DirectPost: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [postType, setPostType] = useState<'text' | 'image' | 'video'>('text');
  const [caption, setCaption] = useState('');
  const [firstComment, setFirstComment] = useState('');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Agency</span>
        <span>›</span>
        <span>Direct Post</span>
      </div>

      {/* Page Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Direct Post</h1>
        <p className="text-gray-500 text-sm mt-1">Publish text, image, or video to a Facebook Page immediately.</p>
      </div>

      {!selectedAccount ? (
        /* Account Selection */
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="text-center py-8">
            <Facebook size={48} className="text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Select a Facebook Account</h3>
            <p className="text-sm text-gray-500 mb-6">Choose an account to begin publishing</p>
          </div>
          
          <div className="space-y-3">
            {demoAccounts.map(account => (
              <button
                key={account.id}
                onClick={() => setSelectedAccount(account.id)}
                className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
              >
                <img 
                  src={`https://ui-avatars.com/api/?name=${account.account_name}&background=random`}
                  alt={account.account_name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{account.account_name}</h4>
                  <p className="text-xs text-gray-500 font-mono">{account.fb_account_id}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Post Composer */
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          {/* Post Type Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setPostType('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${postType === 'text' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <Type size={16} /> Text
            </button>
            <button
              onClick={() => setPostType('image')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${postType === 'image' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <Image size={16} /> Image
            </button>
            <button
              onClick={() => setPostType('video')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${postType === 'video' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <Video size={16} /> Video
            </button>
          </div>

          {/* Caption */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your post caption here..."
              className="w-full h-32 p-4 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              maxLength={63206}
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{caption.length} / 63,206</p>
          </div>

          {/* First Comment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">First Comment (Optional)</label>
            <textarea
              value={firstComment}
              onChange={(e) => setFirstComment(e.target.value)}
              placeholder="Add a first comment..."
              className="w-full h-20 p-4 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Media Upload (for image/video) */}
          {postType !== 'text' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Media</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors">
                <Image size={32} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Drag & drop files here or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">Videos up to 10GB</p>
              </div>
            </div>
          )}

          {/* Post Button */}
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
            <Send size={18} />
            Post Now
          </button>
        </div>
      )}
    </div>
  );
};
