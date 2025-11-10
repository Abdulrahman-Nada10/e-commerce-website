"use client";
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Briefcase,
  LogOut,
  Sparkles,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useSelector } from 'react-redux';
import { selectProductsCount, selectOrdersCount, selectCategoriesCount, selectUsersCount } from '../../store/slices/adminSlice';

const COLORS = {
  primary: "#4ec5f5"
};
const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};
export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const pathname = usePathname();

  const productsCount = useSelector(selectProductsCount);
  const ordersCount = useSelector(selectOrdersCount);
  const categoriesCount = useSelector(selectCategoriesCount);
  const usersCount = useSelector(selectUsersCount);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin", count: null },
    { icon: Package, label: "Products Management", href: "/admin/productsmanagement", count: productsCount },
    { icon: ShoppingCart, label: "Orders Management", href: "/admin/orders", count: ordersCount },
    { icon: Users, label: "User Management", href: "/admin/users", count: usersCount },
    { icon: Tags, label: "Categories Management", href: "/admin/categories", count: categoriesCount },
    { icon: Briefcase, label: "Brands Management", href: "/admin/brands", count: null },
  ];
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  const DesktopSidebar = (
    <motion.aside
      key="admin-sidebar"
      className="hidden lg:block bg-white/95 backdrop-blur-xl shadow-2xl w-72 h-full overflow-y-auto rounded-2xl sticky top-0"
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative p-6 border-b border-gray-100 overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-cyan-50 opacity-50" />
       
        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="p-2 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h2 className="text-xl font-black bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Dashboard
            </h2>
            <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
          </div>
        </div>
      </motion.div>
      <LayoutGroup>
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-200px)]">
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.href;
           
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0 }}
              >
                <Link href={item.href} className="block">
                  <motion.div
                    whileHover={{ x: 8 }}
                    onHoverStart={() => setHoveredItem(item.label)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="relative flex items-center px-4 py-3.5 mb-2 text-sm font-semibold transition-all duration-300 rounded-xl group cursor-pointer overflow-hidden"
                    animate={{ color: isActive ? '#ffffff' : '#374151' }}
                    transition={{ color: { duration: 0 } }} //? عدلت دي عشان دي المده اللي بياخدها الاليمينت عشان يتحول من اللون الابيض للاسود
                  >
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.primary} 0%, #3ab0e0 100%)`,
                        boxShadow: '0 10px 30px -10px rgba(78, 197, 245, 0.5)',
                      }}
                      initial={false}
                      exit={false} //?   يمنع الـ fade عند تغييرات الـ pathname
                      transition={{ duration: 0, ease: "easeInOut" }} ///? غيرت نوع الترانزيشن عشان الديلاي اللي بيحصل لما بنتقل من اليمنت لاخر
                    />
                  )}
                  {/* الخلفية البيضاء عند الـ Hover تم تعديلها لتظهر فقط عند عدم النشاط */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl opacity-1 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  <motion.div
                    className="relative z-10 mr-3"
                    animate={{
                      scale: hoveredItem === item.label ? 1.2 : 1,
                      rotate: hoveredItem === item.label ? 360 : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.div>
                  <span className="relative z-10 grow whitespace-nowrap">{item.label}</span>
                  {item.count !== null && item.count > 0 && (
                    <span className="relative z-10 mr-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                  <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isActive || hoveredItem === item.label ? 1 : 0,
                      x: isActive || hoveredItem === item.label ? 0 : -10
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                  {hoveredItem === item.label && !isActive && (
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </LayoutGroup>
      {/* ... باقي الكود غير متغير ... */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/logout" className="block">
            <motion.div
              whileHover={{ x: 8 }}
              onHoverStart={() => setHoveredItem("Logout")}
              onHoverEnd={() => setHoveredItem(null)}
              className="relative flex items-center px-4 py-3.5 text-sm font-semibold transition-all duration-300 rounded-xl group cursor-pointer overflow-hidden"
              animate={{ color: '#374151' }}
              transition={{ color: { duration: 0.3 } }}
            >
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-red-50 to-orange-50 rounded-xl opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="relative z-10 mr-3"
              animate={{
                scale: hoveredItem === "Logout" ? 1.2 : 1,
                rotate: hoveredItem === "Logout" ? 360 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <LogOut className="w-5 h-5" />
            </motion.div>
            <span className="relative z-10 grow">Logout</span>
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: hoveredItem === "Logout" ? 1 : 0,
                x: hoveredItem === "Logout" ? 0 : -10
              }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
            {hoveredItem === "Logout" && (
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
              />
            )}
            </motion.div>
          </Link>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500"
      />
    </motion.aside>
  );
  const MobileMenuButton = (
    <div className="lg:hidden bg-white hover:bg-gray-100 text-gray-400 rounded-full shadow-md mt-20">
      <motion.button
        onClick={() => setIsOpen(true)}
        className="p-3 transition duration-300"
        whileTap={{ scale: 0.95 }}
      >
        <Menu size={24} />
      </motion.button>
    </div>
  );
  const MobileSideDrawer = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            transition={{ duration: 0.2 }}
          />
          <motion.aside
            className="fixed top-0 left-0 h-screen w-80 max-w-[90vw] bg-white/95 backdrop-blur-xl shadow-2xl z-50 lg:hidden overflow-y-auto rounded-r-2xl"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="p-2 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 shadow-lg"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-lg font-medium text-gray-800">Admin Dashboard</h3>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} className="text-gray-400" />
              </motion.button>
            </div>
            <div className="p-4">
              <motion.nav
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {sidebarItems.map((item, index) => {
                  const isActive = pathname === item.href;
                 
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.03 }}
                    >
                      <Link href={item.href} className="block">
                        <motion.div
                          className="relative flex items-center px-4 py-3.5 mb-2 text-sm font-semibold transition-all duration-300 rounded-xl group cursor-pointer overflow-hidden"
                          animate={{ color: isActive ? '#ffffff' : '#374151' }}
                          transition={{ color: { duration: 0.1 } }}
                        >
                        {isActive && (
                          <motion.div
                            layoutId="activeBackground"
                            className="absolute inset-0 rounded-xl"
                            style={{
                              background: `linear-gradient(135deg, ${COLORS.primary} 0%, #3ab0e0 100%)`,
                              boxShadow: '0 10px 30px -10px rgba(78, 197, 245, 0.5)'
                            }}
                            initial={false}
                            exit={false}
                            transition={{ duration: 0.1, ease: "easeInOut" }}
                          />
                        )}
                        {!isActive && (
                          <motion.div
                            className="absolute inset-0 bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        <div className="relative z-10 mr-3">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="relative z-10 grow">{item.label}</span>
                        {item.count !== null && item.count > 0 && (
                          <span className="relative z-10 mr-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {item.count}
                          </span>
                        )}
                        <motion.div
                          className="relative z-10"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            x: isActive ? 0 : -10
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
  return (
    <>
      {DesktopSidebar}
      {MobileMenuButton}
      {MobileSideDrawer}
    </>
  );
}
