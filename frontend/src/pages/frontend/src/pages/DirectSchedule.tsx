import React from 'react';
import { Calendar, Plus, Facebook } from 'lucide-react';

export const DirectSchedule: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Agency</span>
        <span>›</span>
        <span>Direct Schedule</span>
      </div>

      {/* Page Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Direct Schedule</h1>
            <p className="text-gray-500 text-sm mt-1">Schedule posts natively on Facebook.</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus size={18} />
            Add Page
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-xl border border-gray-100 p-12 shadow-sm text-center">
        <Facebook size={48} className="text-gray-300 mx-auto mb-4" />
        <h3 className="font-semibold text-lg text-gray-700 mb-2">No pages found</h3>
        <p className="text-sm text-gray-500 mb-6">Connect a Facebook account and add your first page to start scheduling.</p>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 mx-auto">
          <Plus size={18} />
          Add Page
        </button>
      </div>
    </div>
  );
};
