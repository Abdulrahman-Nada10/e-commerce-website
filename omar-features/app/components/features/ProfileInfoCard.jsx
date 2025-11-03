"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, Edit, Check, X, Loader2 } from "lucide-react";
import { profileUpdateSchema } from "../../../validationSchemas/schema";
import DefaultButton from "../Ui/DefaultButton";
import ErrorMsg from "../Ui/ErrorMsg";
import axiosInstance from "../../../lib/axiosInstance";

export default function ProfileInfoCard({ user, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(profileUpdateSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updateData) => {
      const { data } = await axiosInstance.put("/v1/user/profile", {
        name: updateData.name,
        phone: updateData.phone,
      });
      return data;
    },
    onSuccess: (result) => {
      onUpdate(result);
      setIsEditing(false);
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (values) => {
    updateMutation.mutate(values);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  const infoItems = [
    { key: "name", label: "Name", icon: User, editable: true },
    { key: "email", label: "Email", icon: Mail, editable: false },
    { key: "phone", label: "Phone", icon: Phone, editable: true },
    { key: "address", label: "Address", icon: MapPin, editable: false },
    { key: "joinDate", label: "Member Since", icon: Calendar, editable: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-[#060010]">Personal Information</h3>
        {!isEditing ? (
          <DefaultButton
            onClick={() => setIsEditing(true)}
            className="rounded-full py-2 px-4 text-xs font-medium shadow-md"
          >
            <div className="flex gap-2 items-center">
                     <Edit size={14} />
            Edit
                     
                    </div>
          </DefaultButton>
        ) : (
          <div className="flex gap-2">
            <DefaultButton
              onClick={handleSubmit(onSubmit)}
              disabled={updateMutation.isPending}
              className="rounded-full py-2 px-3 text-xs font-medium shadow-md bg-green-500 hover:bg-green-600 disabled:opacity-50"
            >
              {updateMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            </DefaultButton>
            <DefaultButton
              onClick={handleCancel}
              disabled={updateMutation.isPending}
              className="rounded-full py-2 px-3 text-xs font-medium shadow-md bg-red-500 hover:bg-red-600 disabled:opacity-50"
            >
              <X size={14} />
            </DefaultButton>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <Icon className="text-[#4EC5F5] shrink-0 mt-1" size={14} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">{item.label}</p>
                  {isEditing && item.editable ? (
                    <div>
                      <input
                        type="text"
                        {...register(item.key)}
                        className="w-full text-sm font-medium text-[#060010] bg-gray-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4EC5F5] focus:border-transparent transition-all"
                        placeholder={`Enter your ${item.label.toLowerCase()}`}
                      />
                      {errors[item.key] && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="mt-1"
                        >
                          <ErrorMsg msg={errors[item.key]?.message} />
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-[#060010]">{user[item.key]}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </form>
    </motion.div>
  );
}
