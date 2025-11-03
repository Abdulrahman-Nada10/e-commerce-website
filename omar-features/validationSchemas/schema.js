import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


export const registerSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required").min(3),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]{10,15}$/, "Invalid phone number"),
  password: yup.string().required("Password is required").min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export const profileUpdateSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]{10,15}$/, "Invalid phone number"),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm your new password"),
});

export const deleteAccountSchema = yup.object({
  password: yup
    .string()
    .required("Password is required to delete account"),
  confirmDelete: yup
    .string()
    .oneOf(["DELETE"], "Please type DELETE to confirm")
    .required("Confirmation required"),
});
