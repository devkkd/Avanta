'use client';

import { AdminProvider } from '@/context/AdminContext';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isAuthRoute = pathname === '/admin/login';

  return (
    <AdminProvider>
      {!isAuthRoute && <AdminHeader />}
      {!isAuthRoute && <AdminSidebar />}

      <main className={`min-h-screen bg-gray-50 ${!isAuthRoute ? 'pt-16 pl-64' : ''}`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </AdminProvider>
  );
}