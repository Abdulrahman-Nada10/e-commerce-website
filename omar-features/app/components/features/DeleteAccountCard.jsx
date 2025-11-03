"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { deleteAccountSchema } from "../../../validationSchemas/schema";
import DefaultButton from "../Ui/DefaultButton";
import ErrorMsg from "../Ui/ErrorMsg";
import axiosInstance from "../../../lib/axiosInstance";

const DeleteAccountCard = () => {
  const [isConfirming, setIsConfirming] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(deleteAccountSchema),
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async (deleteData) => {
      const { data } = await axiosInstance.delete("/v1/user/account", {
        data: {
          password: deleteData.password,
        },
      });
      return data;
    },
    onSuccess: () => {
      console.log("Account deleted successfully");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (values) => {
    deleteAccountMutation.mutate(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 border-l-4 border-l-red-500"
    >
      <div className="flex items-center mb-6">
        <AlertTriangle className="text-red-500 mr-3" size={18} />
        <h3 className="text-sm font-semibold text-red-600">Danger Zone</h3>
      </div>

      <div className="space-y-5">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-2">Delete Account</h4>
          <p className="text-red-700 text-sm">
            Once you delete your account, there is no going back. Please be certain.
          </p>
        </div>

        {!isConfirming ? (
          <DefaultButton
            onClick={() => setIsConfirming(true)}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full py-2 px-6 text-sm"
          >
            <div className="flex gap-2 items-center">
              <Trash2 size={16} />
            Delete Account

            </div>
          </DefaultButton>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-5"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your password to confirm:
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1"
                  >
                    <ErrorMsg msg={errors.password?.message} />
                  </motion.div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type "DELETE" to confirm:
                </label>
                <input
                  type="text"
                  {...register("confirmDelete")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  placeholder="Type DELETE here"
                />
                {errors.confirmDelete && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1"
                  >
                    <ErrorMsg msg={errors.confirmDelete?.message} />
                  </motion.div>
                )}
              </div>

              <div className="flex space-x-3">
                <DefaultButton
                  type="submit"
                  disabled={deleteAccountMutation.isPending}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full py-3 px-6 text-sm disabled:opacity-50"
                >
                  {deleteAccountMutation.isPending ? (
                    <div className="flex gap-2 items-center">
                       <Loader2 size={16} className="animate-spin " />
                      Deleting...
                     
                    </div>
                  ) : (
                   <div className="flex gap-2 items-center">
                      <Trash2 size={16} />
                      Confirm Deletion
                     
                    </div>
                  )}
                </DefaultButton>
                <button
                  type="button"
                  onClick={() => {
                    setIsConfirming(false);
                    reset();
                  }}
                  disabled={deleteAccountMutation.isPending}
                  className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DeleteAccountCard;
