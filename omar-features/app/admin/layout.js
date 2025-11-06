"use client";

import AdminSidebar from "../components/admin/AdminSidebar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 lg:pt-18">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
         
          <div className="hidden lg:flex lg:shrink-0">
            <AdminSidebar />
          </div>

      
          <div className="flex-1 min-w-0 w-full overflow-x-hidden">
            
            <div className="lg:hidden mb-4 flex justify-start">
              <AdminSidebar />
            </div>

  
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


