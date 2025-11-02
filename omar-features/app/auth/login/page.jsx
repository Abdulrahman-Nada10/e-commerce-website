"use client";
import { useForm} from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import {loginSchema} from "../../../validationSchemas/schema"
import { useState } from "react";
import Link from 'next/link';
import AnimatedBackground from "../../components/gsap/AnimatedBackground";
import ErrorMsg from "../../components/Ui/ErrorMsg" ;
import { motion } from "framer-motion";
import { Eye ,EyeOff } from 'lucide-react';
import DefaultButton from "../../components/Ui/DefaultButton";


export default function LoginPage() {
     const [showPassword, setShowPassword] = useState(false);



     const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });
  
    const loginMutation = useMutation({
    mutationFn: async (loginData) => {
      const {data} = await axiosInstance.post(
        "/v1/auth/login",
        {
          email: loginData.email,
          password: loginData.password,
        },
      );
      return data;
    },
    onSuccess: (result) => {
           console.log(result)
    },
    onError: (error) => {
     console.log(error)
    },
  });

        const onSubmit= async (values) => {
          loginMutation.mutate(values)
        };

        return (
    <main className="relative w-full h-[120vh] flex flex-col items-center justify-center font-['Poppins'] bg-[#E0F7FA] overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-1/2 sm:h-2/3 z-0">
        <AnimatedBackground />

        <div className={`flex flex-col items-center gap-4  ${
            Object.keys(errors).length > 0 ? "pt-23" : "pt-24"
          }`}>
          <motion.h1
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-20 text-5xl md:text-6xl text-[#4EC5F5] font-bold text-center tracking-wide"
          >
            WELCOME BACK.
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

      <div className="absolute bottom-0 left-0 w-full h-1/2 sm:h-1/3 bg-white z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className={`absolute  space-y-3 z-20 bg-white shadow-2xl rounded-3xl pt-7 pb-8 px-8 w-[90%] md:w-[80%] max-w-[900px] mx-auto left-1/2 -translate-x-1/2 ${
            Object.keys(errors).length > 0 ? "top-70 sm:top-60" : "top-70 sm:top-64"
          }`}
      >
        <div className="flex flex-col gap-2 justify-center items-center text-center ">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <div className="w-3 h-3 bg-[#4EC5F5] rounded-full"></div>
            <h2 className="text-xl font-semibold text-[#4EC5F5]">Shoplyx</h2>
          </motion.div>

          <motion.h3
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
          >
            Login to Your Account
          </motion.h3>
        </div>

        <form
          className={`max-w-[400px] mx-auto ${
            Object.keys(errors).length > 0 ? "space-y-3" : "space-y-7"
          }`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={
              Object.keys(errors).length > 0 ? "space-y-3" : "space-y-7"
            }
          >
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Email Address"
                {...register("email")}
                className="w-full text-sm h-10 px-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
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

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="w-full text-sm h-10 px-4 pr-12 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
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
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
            className="text-sm mt-3"
          >
            <a href="#" className="text-sky-500 hover:underline font-medium">
              Forgot password?
            </a>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
            className="flex justify-center"
          >
            <DefaultButton
              type="submit"
              disabled={loginMutation.isPending}
              className="text-center rounded-3xl py-3 px-25 text-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {loginMutation.isPending ? "LOGGING IN..." : "LOGIN"}
            </DefaultButton>
          </motion.div>
        </form>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
          className="text-gray-600 mt-4 text-center text-sm"
        >
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-sky-500 hover:underline font-semibold">
    Sign Up
  </Link>
        </motion.p>
      </motion.div>
    </main>
  );

//   return (
//     <main className="relative w-full h-[120vh] flex flex-col items-center justify-center font-['Poppins'] bg-[#E0F7FA] overflow-hidden">
      
//       <div className="absolute top-0 left-0 w-full h-1/2 sm:h-2/3 z-0">
//         <AnimatedBackground />

//       <div className="flex flex-col items-center gap-4 pt-23">
//           <h1 
//           className="relative z-20 text-5xl md:text-6xl text-[#4EC5F5]  font-bold  text-center tracking-wide">
//   WELCOME BACK.
// </h1>
//   <DefaultButton
//                         className="relative z-20 rounded-full py-3 px-8 text-smtransition-all duration-300 shadow-lg"
//                         onClick={() => console.log(`shop`)}
//                     >
//                         SHOP NOW
//                     </DefaultButton>


//       </div>
//       </div>

     
//       <div className="absolute bottom-0 left-0 w-full h-1/2 sm:h-1/3 bg-white z-0"></div>

  

//       <div className="absolute top-70 sm:top-60 space-y-3 z-20 bg-white shadow-2xl rounded-3xl pt-7 pb-8 px-8 w-[90%] md:w-[80%] max-w-[900px] mx-auto left-1/2 -translate-x-1/2">

//        <div className="flex flex-col gap-2  justify-center items-center text-center ">
//          <div className="flex items-center  gap-2">
//            <div className="w-3 h-3 bg-[#4EC5F5] rounded-full"></div>
//            <h2 className="text-xl font-semibold text-[#4EC5F5]">Shoplyx</h2>
//          </div>
//         <h3 className="text-2xl sm:text-3xl  font-bold text-gray-800 mb-4">Login to Your Account</h3>

//        </div>
// <form className={`max-w-[400px] mx-auto ${Object.keys(errors).length > 0 ? 'space-y-3' : 'space-y-7'}`} onSubmit={handleSubmit(onSubmit)}>
//   <div className={Object.keys(errors).length > 0 ? 'space-y-5' : 'space-y-7'}>
//             <motion.div className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
//                     <input
//                      type="text"
//                      placeholder="Email Address" 
//                      {...register("email")} 
//                      className="w-full text-sm h-10 px-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all" 
//                      />
//                      {errors["email"] && (
//                                 <motion.div
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ duration: 0.3 }}
//                                     className="mt-2"
//                                 >
//                                     <ErrorMsg msg={errors["email"]?.message} />
//                                 </motion.div>
//                             )}
//                 </motion.div>
//                 <motion.div className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
//                     <input 
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     {...register("password")}
//                       className="w-full text-sm h-10 px-4 pr-12 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
//                       />
//                       <button
//                                 type="button"
//                                 onClick={() => setShowPassword((prev) => !prev)}
//                                 className="absolute top-4 right-2  text-gray-400 hover:text-sky-500 transition-colors duration-300"
//                             >
//                                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                             </button>

//                      {errors["password"] && (
//                                 <motion.div
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ duration: 0.3 }}
//                                     className="mt-2"
//                                 >
//                                     <ErrorMsg msg={errors["password"]?.message} />
//                                 </motion.div>
//                             )}
//                 </motion.div>

//           </div>
//           <div className="  text-sm mt-3 ">
          
//            <a href="#" className="text-sky-500 hover:underline  font-medium">
//             Forget password
//           </a>
         
//         </div>

//        <div className="flex justify-center ">
//     <DefaultButton
//         type="submit"
//         disabled={loginMutation.isPending}
//         className="text-center rounded-3xl py-3 px-25  text-sm transition-all duration-300 shadow-md hover:shadow-lg"
//     >
//         {loginMutation.isPending ? 'LOGGING IN...' : 'LOGIN'}
//     </DefaultButton>
// </div>


//         </form>

//         <p className="text-gray-600 mt-4 text-center text-sm">
//           Don't have an account?{" "}
//           <a href="#" className="text-sky-500 hover:underline font-semibold">
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </main>
//   );
}

