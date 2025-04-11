// src/components/Auth/SignUp/SignUp.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  getUser,
  register as registerUser,
} from "../../../redux/auth/operations";
import { registerSchema } from "../../../schemas";
import sprite from "../../../images/sprite.svg";
import styles from "./SignUp.module.css";

export const SignUp = ({ onRequestClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    onRequestClose();
    setTimeout(() => {
      dispatch(getUser());
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.textDescription}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <form className={styles.formFields} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          <input
            {...register("name")}
            className={styles.fieldInput}
            type="text"
            autoComplete="off"
            placeholder="Name"
          />
          {errors.name && (
            <div className={styles.errorText}>{errors.name.message}</div>
          )}
        </label>
        <label className={styles.label}>
          <input
            {...register("email")}
            className={styles.fieldInput}
            type="email"
            autoComplete="off"
            placeholder="Email"
          />
          {errors.email && (
            <div className={styles.errorText}>{errors.email.message}</div>
          )}
        </label>
        <label className={styles.label}>
          <input
            {...register("password")}
            className={styles.fieldInput}
            type={showPassword ? "text" : "password"}
            autoComplete="off"
            placeholder="Password"
          />
          <svg
            className={styles.iconEye}
            width="20px"
            height="20px"
            onClick={toggleShowPassword}
          >
            <use
              href={
                showPassword
                  ? `${sprite}#icon-show-eye`
                  : `${sprite}#icon-not-show-eye`
              }
            />
          </svg>
          {errors.password && (
            <div className={styles.errorText}>{errors.password.message}</div>
          )}
        </label>
        <button className={styles.button} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};
