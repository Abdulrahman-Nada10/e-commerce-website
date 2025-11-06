"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

//blur

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
  const [activeItem, setActiveItem] = useState("Dashboard");

  const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products Management", href: "/admin/products" },
  { icon: ShoppingCart, label: "Orders Management", href: "/admin/orders" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: Tags, label: "Categories Management", href: "/admin/categories" },
  { icon: Briefcase, label: "Brands Management", href: "/admin/brands" },
];
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const DesktopSidebar = (
    <motion.aside
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


      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-200px)]">
        {sidebarItems.map((item, index) => {
          const isActive = activeItem === item.label;
          
          return (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setActiveItem(item.label)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ x: 8 }}
              onHoverStart={() => setHoveredItem(item.label)}
              onHoverEnd={() => setHoveredItem(null)}
              className={`relative flex items-center px-4 py-3.5 mb-2 text-sm font-semibold transition-all duration-300 rounded-xl group cursor-pointer overflow-hidden ${
                isActive ? 'text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
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
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {!isActive && (
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
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
            </motion.a>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        <motion.a
          href="/logout"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ x: 8 }}
          onHoverStart={() => setHoveredItem("Logout")}
          onHoverEnd={() => setHoveredItem(null)}
          className="relative flex items-center px-4 py-3.5 text-sm font-semibold text-gray-700 hover:text-red-600 transition-all duration-300 rounded-xl group cursor-pointer overflow-hidden"
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
        </motion.a>
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
            className="fixed inset-0 bg-black/50  z-40 lg:hidden"
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
                  const isActive = activeItem === item.label;
                  
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.label);
                        handleLinkClick();
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.03 }}
                      className={`relative flex items-center px-4 py-3.5 mb-2 text-sm font-semibold transition-all duration-300 rounded-xl group cursor-pointer overflow-hidden ${
                        isActive ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          style={{ 
                            background: `linear-gradient(135deg, ${COLORS.primary} 0%, #3ab0e0 100%)`,
                            boxShadow: '0 10px 30px -10px rgba(78, 197, 245, 0.5)'
                          }}
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
                    </motion.a>
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
};

