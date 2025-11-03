import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Calendar, DollarSign } from 'lucide-react';

const OrderHistoryCard = ({ orders }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
    >
      <div className="flex items-center mb-6">
        <ShoppingBag className="text-[#4EC5F5] mr-3" size={18} />
        <h3 className="text-sm font-semibold text-[#060010]">Order History</h3>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#4EC5F5] rounded-full flex items-center justify-center">
                <ShoppingBag className="text-white" size={16} />
              </div>
              <div>
                <p className="font-semibold text-[#060010] text-xs md:text-sm">{order.id}</p>
                <div className="flex items-center text-xs text-gray-600">
                  <Calendar size={12} className="mr-1" />
                  {order.date}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center font-semibold text-[#4EC5F5] mb-1 text-xs md:text-sm">
                <DollarSign size={14} />
                {order.total}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-8">
          <ShoppingBag className="mx-auto text-gray-400 mb-2" size={48} />
          <p className="text-gray-500">No orders yet</p>
        </div>
      )}
    </motion.div>
  );
};

export default OrderHistoryCard;
