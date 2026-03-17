'use client';

import { useState, useEffect, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useNotifications } from '@/context/NotificationContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Bell, Search, User, LogOut, Menu, X,
  Users, Package, Clock, ArrowRight, RefreshCw,
} from 'lucide-react';

function formatDate(date) {
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit', month: 'short',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

export default function AdminHeader({ sidebarOpen, setSidebarOpen }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { admin, logout } = useAdmin();
  const { notifications, counts, loading, refresh } = useNotifications();
  const router = useRouter();
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    try { await logout(); } catch {}
    router.push('/admin/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? <X size={22} className="text-gray-600" /> : <Menu size={22} className="text-gray-600" />}
        </button>
        <div className="flex items-center gap-3">
          <img src="/images/Avanta-Logo.svg" alt="Avanta" className="h-8 md:h-10 w-auto" />
          <div className="hidden sm:block border-l border-gray-200 pl-3">
            <p className="text-base font-semibold text-gray-800 leading-tight">Admin Panel</p>
            <p className="text-[11px] text-gray-400">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Center Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 md:gap-2">

        {/* ── Notification Bell ── */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications((v) => !v)}
            className="relative p-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
            {counts.total > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none border-2 border-white">
                {counts.total > 99 ? '99+' : counts.total}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 z-50 overflow-hidden">

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-[11px] text-blue-200">
                        <Users size={10} /> {counts.wholesale} Wholesale
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-blue-200">
                        <Package size={10} /> {counts.product} Product
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {counts.total > 0 && (
                      <span className="bg-white/20 text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/30">
                        {counts.total} pending
                      </span>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); refresh(); }}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                      title="Refresh"
                    >
                      <RefreshCw size={13} className={`text-white ${loading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* List */}
              <div className="max-h-[300px] overflow-y-auto divide-y divide-gray-50">
                {loading && notifications.length === 0 ? (
                  <div className="py-10 flex flex-col items-center gap-2 text-gray-400 text-sm">
                    <div className="w-5 h-5 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                    Loading...
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="py-10 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Bell size={20} className="text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400 font-medium">All caught up!</p>
                    <p className="text-xs text-gray-300 mt-1">No pending inquiries</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <Link
                      key={`${n.type}-${n.id}`}
                      href={n.href}
                      onClick={() => setShowNotifications(false)}
                      className="flex items-start gap-3 px-4 py-3.5 hover:bg-blue-50/50 transition-colors group"
                    >
                      {/* Icon */}
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        n.type === 'wholesale'
                          ? 'bg-purple-100 group-hover:bg-purple-200'
                          : 'bg-blue-100 group-hover:bg-blue-200'
                      } transition-colors`}>
                        {n.type === 'wholesale'
                          ? <Users size={15} className="text-purple-600" />
                          : <Package size={15} className="text-blue-600" />
                        }
                      </div>
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-gray-800 leading-tight">{n.title}</p>
                        <p className="text-[12px] text-gray-500 truncate mt-0.5">{n.subtitle}</p>
                        <p className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                          <Clock size={10} /> {formatDate(n.createdAt)}
                        </p>
                      </div>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-500 shrink-0 mt-1 transition-colors" />
                    </Link>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 grid grid-cols-2 divide-x divide-gray-100 bg-gray-50">
                <Link
                  href="/admin/customer-inquiries"
                  onClick={() => setShowNotifications(false)}
                  className="flex items-center justify-center gap-1.5 py-3 text-[12px] font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Users size={12} /> View Wholesale
                </Link>
                <Link
                  href="/admin/inquiries"
                  onClick={() => setShowNotifications(false)}
                  className="flex items-center justify-center gap-1.5 py-3 text-[12px] font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Package size={12} /> View Product
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Profile ── */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfileMenu((v) => !v)}
            className="flex items-center gap-2 md:gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={15} className="text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-800 leading-tight">{admin?.username || 'Admin'}</p>
              <p className="text-[11px] text-gray-400 capitalize">{admin?.role || 'Administrator'}</p>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-sm font-semibold text-gray-800">{admin?.username || 'Admin'}</p>
                <p className="text-xs text-gray-400 mt-0.5">{admin?.email || 'admin@avanta.com'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
