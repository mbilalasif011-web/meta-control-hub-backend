import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { FacebookAccounts } from './pages/FacebookAccounts';
import { AutoDownloadUpload } from './pages/AutoDownloadUpload';
import { DirectPost } from './pages/DirectPost';
import { DirectSchedule } from './pages/DirectSchedule';
import { InAppSchedule } from './pages/InAppSchedule';
import { PageDetail } from './pages/PageDetail';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-60">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<FacebookAccounts />} />
            <Route path="/auto-upload" element={<AutoDownloadUpload />} />
            <Route path="/direct-post" element={<DirectPost />} />
            <Route path="/direct-schedule" element={<DirectSchedule />} />
            <Route path="/inapp-schedule" element={<InAppSchedule />} />
            <Route path="/inapp-schedule/:pageId" element={<PageDetail />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};
