"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AnimatedBackground from "../../components/gsap/AnimatedBackground";
import DefaultButton from "../../components/Ui/DefaultButton";
import ErrorMsg from "../../components/Ui/ErrorMsg";
import Link from "next/link";
import {registerSchema} from "../../../validationSchemas/schema"
import { Eye ,EyeOff } from 'lucide-react';



export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onSubmit",
  });

  const steps = [
    { label: "Full Name", fields: ["fullName"] },
    { label: "Email", fields: ["email"] },
    { label: "Phone", fields: ["phone"] },
    { label: "Password", fields: ["password", "confirmPassword"] },
  ];

  const nextStep = async () => {
    const valid = await trigger(steps[step].fields);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

   const registerMutation = useMutation({
    mutationFn: async (registerData) => {
      const {data} = await axiosInstance.post(
        "/v1/auth/register",
        {
          email: registerData.email,
          password: registerData.password,
        },
      );
      return data;
    },
    onSuccess: (result) => {
           registerMutation.mutate(values)
    },
    onError: (error) => {
     console.log(error)
    },
  });

  const onSubmit = (data) => {
    console.log("Registered:", data);
  };

  return (
    <main className="relative w-full h-[120vh] flex flex-col items-center justify-center font-['Poppins'] bg-[#E0F7FA] overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-1/2 sm:h-3/5 z-0">
        <AnimatedBackground />

        <div className="flex flex-col items-center gap-4 pt-24" >
          <motion.h1
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-20 text-5xl md:text-6xl text-[#4EC5F5] font-bold text-center tracking-wide"
          >
            WELCOME.
          </motion.h1>

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <DefaultButton
              className="relative z-20 rounded-full py-3 px-8 text-smtransition-all duration-300 shadow-lg"
              onClick={() => console.log(`shop`)}
            >
              SHOP NOW
            </DefaultButton>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/2 sm:h-2/5 bg-white z-0"></div>

    
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className={`absolute space-y-6 z-20 bg-white shadow-2xl rounded-3xl   px-8 w-[90%] md:w-[80%] max-w-[900px] mx-auto left-1/2 -translate-x-1/2 top-70 sm:top-65 ${
            Object.keys(errors).length > 0 ? "pt-7 pb-8" : "pt-8 pb-10"
          }`}
      >
        <div className="text-center mb-6">
          <motion.h2
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
          >
            Create Your Account
          </motion.h2>
        </div>

      
        <motion.div 
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        className="flex justify-center items-center mb-6">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 
                ${
                  i === step
                    ? "bg-[#4EC5F5] border-[#4EC5F5] text-white"
                    : "bg-gray-200 border-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className="w-10 h-0.5 bg-gray-300 mx-2"></div>
              )}
            </div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.form
            key={step}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className={`max-w-[400px] mx-auto  ${
            Object.keys(errors).length > 0 ? "space-y-3" : "space-y-5"
          }`}
          >
            {step === 0 && (
              <motion.div
               initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName")}
                  className="w-full text-sm h-10 px-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                {errors["fullName"] && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-2"
                                >
                                  <ErrorMsg msg={errors["fullName"]?.message} />
                                </motion.div>
                              )}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
               >
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email")}
                  className="w-full text-sm h-10 px-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                {errors["email"] && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-2"
                                >
                                  <ErrorMsg msg={errors["email"]?.message} />
                                </motion.div>
                              )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
               >
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone")}
                  className="w-full text-sm h-10 px-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                {errors["phone"] && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-2"
                                >
                                  <ErrorMsg msg={errors["phone"]?.message} />
                                </motion.div>
                              )}
              </motion.div>
            )}

            {step === 3 && (
              <>
                <motion.div
                className="relative"
                 >
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="w-full text-sm h-10 px-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                                <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-4 right-2 text-gray-400 hover:text-sky-500 transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

                  {errors["password"] && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                  >
                                    <ErrorMsg msg={errors["password"]?.message} />
                                  </motion.div>
                                )}
                </motion.div>
                <motion.div
                className="relative"
                 
              >


                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                    className="w-full text-sm h-10 px-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                                <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-4 right-2 text-gray-400 hover:text-sky-500 transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

                 {errors["confirmPassword"] && (
                                 <motion.div
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.3 }}
                                   className="mt-2"
                                 >
                                   <ErrorMsg msg={errors["confirmPassword"]?.message} />
                                 </motion.div>
                               )}
                </motion.div>
              </>
            )}

            {/* Navigation Buttons */}
            <motion.div 
            className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 0}
                className="px-4 py-2 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50"
              >
                Back
              </button>

              {step < steps.length - 1 ? (
                <DefaultButton
                  type="button"
                  onClick={nextStep}
                  className="rounded-3xl py-2 px-6 text-sm"
                >
                  Next
                </DefaultButton>
              ) : (
                <DefaultButton
                  type="submit"
                  className="rounded-3xl py-2 px-6 text-sm"
                >
                  Register
                </DefaultButton>
              )}
            </motion.div>
          </motion.form>
        </AnimatePresence>

        <p className="text-gray-600  text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-sky-500 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
