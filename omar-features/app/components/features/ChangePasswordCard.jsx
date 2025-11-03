"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { changePasswordSchema } from "../../../validationSchemas/schema";
import DefaultButton from "../Ui/DefaultButton";
import ErrorMsg from "../Ui/ErrorMsg";
import axiosInstance from "../../../lib/axiosInstance";

const ChangePasswordCard = () => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (passwordData) => {
      const { data } = await axiosInstance.put("/v1/user/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      return data;
    },
    onSuccess: () => {
      reset();
      console.log("Password changed successfully");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const onSubmit = async (values) => {
    changePasswordMutation.mutate(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
    >
      <div className="flex items-center mb-6">
        <Lock className="text-[#4EC5F5] mr-3" size={18} />
        <h3 className="text-sm font-semibold text-[#060010]">Change Password</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {[
          { key: 'currentPassword', label: 'Current Password', showKey: 'current' },
          { key: 'newPassword', label: 'New Password', showKey: 'new' },
          { key: 'confirmNewPassword', label: 'Confirm New Password', showKey: 'confirm' },
        ].map((field, index) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <div className="relative">
              <input
                type={showPasswords[field.showKey] ? 'text' : 'password'}
                {...register(field.key)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4EC5F5] focus:border-transparent text-sm"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility(field.showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#4EC5F5] transition-colors"
              >
                {showPasswords[field.showKey] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors[field.key] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-1"
              >
                <ErrorMsg msg={errors[field.key]?.message} />
              </motion.div>
            )}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <DefaultButton
            type="submit"
            disabled={changePasswordMutation.isPending}
            className="w-full rounded-full py-3 px-6 text-sm font-semibold shadow-lg disabled:opacity-50"
          >
            {changePasswordMutation.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </DefaultButton>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ChangePasswordCard;
