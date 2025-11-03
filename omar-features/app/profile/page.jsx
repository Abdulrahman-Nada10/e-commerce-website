"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, ShoppingBag, Settings, Edit } from "lucide-react";
import AnimatedBackground from "../components/gsap/AnimatedBackground";
import DefaultButton from "../components/Ui/DefaultButton";
import ProfileAvatar from "../components/features/ProfileAvatar";
import ProfileInfoCard from "../components/features/ProfileInfoCard";
import OrderHistoryCard from "../components/features/OrderHistoryCard";
import ChangePasswordCard from "../components/features/ChangePasswordCard";
import DeleteAccountCard from "../components/features/DeleteAccountCard";


const fakeUser = {
  name: "Ahd Atwya",
  email: "ahdawtya@gmail.com",
  phone: "01287677534",
  address: "123 cairo",
  joinDate: "January 2025",
  status: "Active",
  role:"admin",
  
  orders: [
    { id: "ORD-001", date: "2023-10-01", total: "129.99", status: "Delivered" },
    { id: "ORD-002", date: "2023-09-15", total: "89.50", status: "Shipped" },
    { id: "ORD-003", date: "2023-08-20", total: "199.99", status: "Processing" },
  ],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(fakeUser);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleUserUpdate = (updatedData) => {
    setUserData(updatedData);
    console.log('User data updated:', updatedData);
  };

  return (
    <div className="relative min-h-screen bg-[#E0F7FA] text-[#060010] font-['Poppins'] pt-20 pb-10 overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#4EC5F5] mb-2 tracking-wide">
            MY PROFILE
          </h1>
          <p className="text-gray-700 text-sm">Manage your account information and preferences</p>
        </motion.div>

  
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/20"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <ProfileAvatar name={userData.name} size={120} />
            <div className="flex-1 text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl font-bold text-[#060010] mb-2"
              >
                {userData.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-600 mb-4 text-sm"
              >
               {userData.email}
              </motion.p>
              <motion.div
              className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }} 
              >
              <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-700" /> 
              {userData.status}
              
            </span>

             <span
            className="px-3 py-1 text-xs font-semibold rounded-full text-white"
            style={{
              backgroundColor: userData?.role === "admin" ? "#060010" : "#4EC5F5",
            }}
          >
            {userData?.role?.toUpperCase()}
          </span>

              </div>
                
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden mb-8 border border-white/20"
        >
          <div className="flex border-b border-gray-200/50">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-5 px-6 text-center font-semibold text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-[#4EC5F5] border-b-3 border-[#4EC5F5] bg-[#4EC5F5]/5"
                      : "text-gray-600 hover:text-[#4EC5F5] hover:bg-[#4EC5F5]/5"
                  }`}
                >
                  <Icon size={20} className="mx-auto mb-2" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          <div className="p-8">
            {activeTab === "profile" && (
              <div className="space-y-8">
                <ProfileInfoCard user={userData} onUpdate={handleUserUpdate} />
              </div>
            )}

            {activeTab === "orders" && (
              <OrderHistoryCard orders={userData.orders} />
            )}

            {activeTab === "settings" && (
              <div className="space-y-8">
                <ChangePasswordCard />
                <DeleteAccountCard />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
