import * as yup from "yup";

// форма логіну
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// форма реєстрації
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// запис на зустріч
export const appointmentSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, "Phone should be in format +380XXXXXXXXX")
    .required("Phone number is required"),
  childAge: yup
    .number()
    .typeError("Age must be a number")
    .min(1, "Minimum age is 1 year")
    .max(16, "Maximum age is 16 years")
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : Number(originalValue)
    )
    .required("Child's age is required"),
  time: yup.string().required("Time is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  parentName: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Parent's name is required"),
  comment: yup.string().max(500, "Comment must not exceed 500 characters"),
});
