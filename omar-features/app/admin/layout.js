//admin/layout
"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdminSidebar from "../components/admin/AdminSidebar.jsx";
import { syncAdminCountsFromAPI } from '../store/slices/adminSlice';
import useAdminDataQuery from '../../lib/useAdminDataQuery';

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();

  // Fetch admin data with periodic updates
  const { data: productsData } = useAdminDataQuery({
    queryKey: ['admin-products'],
    url: '/products',
    refetchInterval: 30000, // 30 seconds
  });

  const { data: ordersData } = useAdminDataQuery({
    queryKey: ['admin-orders'],
    url: '/orders',
    refetchInterval: 30000,
  });

  const { data: categoriesData } = useAdminDataQuery({
    queryKey: ['admin-categories'],
    url: '/categories',
    refetchInterval: 30000,
  });

  const { data: usersData } = useAdminDataQuery({
    queryKey: ['admin-users'],
    url: '/users',
    refetchInterval: 30000,
  });

  // Sync admin counts with Redux store
  useEffect(() => {
    if (productsData || ordersData || categoriesData || usersData) {
      dispatch(syncAdminCountsFromAPI({
        products: productsData,
        orders: ordersData,
        categories: categoriesData,
        users: usersData,
      }));
    }
  }, [productsData, ordersData, categoriesData, usersData, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 pt-24">
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
