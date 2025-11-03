import React from 'react';
import { motion } from 'framer-motion';

const ProfileAvatar = ({ name, size = 96 }) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-full border-4 border-[#4EC5F5] flex items-center justify-center text-white font-bold text-4xl"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #4EC5F5 0%, #87CEEB 100%)',
      }}
    >
      {initial}
    </motion.div>
  );
};

export default ProfileAvatar;
