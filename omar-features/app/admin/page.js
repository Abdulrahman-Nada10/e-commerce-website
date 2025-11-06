"use client";
import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Package,
  Clock,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const salesPerformanceData = [
  { day: "Day 1", sales: 2400, orders: 140 },
  { day: "Day 5", sales: 3200, orders: 180 },
  { day: "Day 10", sales: 2800, orders: 160 },
  { day: "Day 15", sales: 3800, orders: 220 },
  { day: "Day 20", sales: 3400, orders: 190 },
  { day: "Day 25", sales: 2900, orders: 170 },
  { day: "Day 30", sales: 4200, orders: 240 },
];

const topCategoriesData = [
  { name: "Wearables", value: 35, color: "#3b82f6" },
  { name: "Audio Gear", value: 45, color: "#06b6d4" },
  { name: "Smart Devices", value: 20, color: "#8b5cf6" },
];

const stats = [
  {
    title: "Total Sales",
    value: "$1,250,000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-500 via-green-500 to-teal-600",
    lightColor: "from-emerald-50 to-green-50",
  },
  {
    title: "New Orders",
    value: "120",
    subValue: "Orders: 2,900",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "from-blue-500 via-cyan-500 to-sky-600",
    lightColor: "from-blue-50 to-cyan-50",
  },
  {
    title: "Active Users",
    value: "8,500",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "from-purple-500 via-violet-500 to-indigo-600",
    lightColor: "from-purple-50 to-indigo-50",
  },
  {
    title: "Products",
    value: "450",
    change: "-2.4%",
    trend: "down",
    icon: Package,
    color: "from-orange-500 via-amber-500 to-yellow-600",
    lightColor: "from-orange-50 to-yellow-50",
  },
];

const topProducts = [
  { name: "Smart Watch", category: "Wearables", image: "⌚" },
  { name: "Wireless Earbuds", category: "Audio Gear", image: "🎧" },
  { name: "Smart Band", category: "Wearables", image: "⌚" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-6 lg:px-8 py-4 md:py-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-3">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-linear-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Sales Overview
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
          <p className="text-sm sm:text-base font-medium">Welcome back! Here's what's happening today.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 md:gap-6">



        <div className="space-y-4 md:space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0, duration: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
          >
            <motion.div className="absolute inset-0 bg-linear-to-br from-emerald-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider mb-2 md:mb-3">Total Sales</p>
              <h3 className="text-2xl sm:text-3xl md:text-2xl  font-black text-gray-800 mb-3 md:mb-4">$1,250,000</h3>
              
              <div className="grid grid-cols-2 gap-3 md:gap-4 pt-3 md:pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">New Orders</p>
                  <p className="text-xl sm:text-2xl font-black text-gray-800">120</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Active Users</p>
                  <p className="text-xl sm:text-2xl font-black text-gray-800">8,500</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Orders (30d)</p>
                  <p className="text-xl sm:text-2xl font-black text-blue-600">2,900</p>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 md:h-1.5 bg-linear-to-r from-emerald-500 via-green-500 to-teal-600"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border border-gray-100"
          >
            <h2 className="text-lg sm:text-xl font-black text-gray-800 mb-4 md:mb-6">Top Categories</h2>
            
            <div className="space-y-3 md:space-y-4">
              {topProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-linear-to-r from-gray-50 to-blue-50 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg md:rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl sm:text-2xl shadow-lg shrink-0">
                    {product.image}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-sm sm:text-base text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">{product.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border border-gray-100"
        >
          <div className="mb-4 md:mb-6">
            <h2 className="text-lg sm:text-xl font-black text-gray-800 mb-1">Sales Performance</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">(Last 30 Days)</p>
          </div>

          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <LineChart data={salesPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="day" 
                tick={{ fill: '#6b7280', fontSize: 10 }}
                tickFormatter={(value) => value.replace('Day ', '')}
                className="sm:text-xs"
              />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} className="sm:text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color:"#6A7282",
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
                className="sm:stroke-3"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

  
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.6 }}
  className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border border-gray-100 col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-1"
>

          <div className="mb-4 md:mb-6">
            <h2 className="text-lg sm:text-xl font-black text-gray-800 mb-1">Product Analytics</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Top Categories</p>
          </div>

          <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
            <PieChart>
              <Pie
                data={topCategoriesData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={5}
                dataKey="value"
                className="sm:inner-radius-[60] sm:outer-radius-[90]"
              >
                {topCategoriesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
            {topCategoriesData.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between p-2 md:p-3 rounded-lg md:rounded-xl bg-gray-50"
              >
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                  <div 
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full shrink-0"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-bold text-sm sm:text-base text-gray-800 truncate">{category.name}</span>
                </div>
                <span className="font-black text-sm sm:text-base text-gray-800 ml-2">{category.value}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
        {stats.slice(0, 4).map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
          >
            <motion.div className={`absolute inset-0 bg-linear-to-br ${stat.lightColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10 mb-4 md:mb-5">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-linear-to-br ${stat.color} items-center justify-center shadow-2xl`}
              >
                <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-lg" />
              </motion.div>
            </div>

            <div className="relative z-10 space-y-1.5 md:space-y-2">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-800">{stat.value}</h3>
              {stat.subValue ? (
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">{stat.subValue}</p>
                
              ):
              (
                <div className="text-xs sm:text-sm text-gray-600 font-semibold ">
                  <span className="text-transparent">
                    f

                  </span>
                  
                  
                  </div>
                
              )
            }
              
              <motion.div
                className={`flex items-center gap-1.5 md:gap-2 text-xs sm:text-sm font-bold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {stat.trend === 'up' ? <ArrowUp className="w-3 h-3 md:w-4 md:h-4" /> : <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />}
                <span className="truncate">{stat.change} from last month</span>
              </motion.div>
            </div>

            <motion.div
              className={`absolute bottom-0 left-0 right-0 h-1 md:h-1.5 bg-linear-to-r ${stat.color}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4 + index * 0.1 + 0.5, duration: 0.6 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

