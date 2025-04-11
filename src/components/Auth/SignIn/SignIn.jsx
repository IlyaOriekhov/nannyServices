import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/auth/operations";
import { loginSchema } from "../../../schemas";
import sprite from "../../../images/sprite.svg";
import styles from "./SignIn.module.css";

export const SignIn = ({ onRequestClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    dispatch(logIn(data));
    onRequestClose();
  };

  return (
    <div className={styles.container} style={{ height: "489px" }}>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.textDescription}>
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>
      <form className={styles.formFields} onSubmit={handleSubmit(onSubmit)}>
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
          Log In
        </button>
      </form>
    </div>
  );
};
