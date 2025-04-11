import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentSchema } from "../../schemas";
import sprite from "../../images/sprite.svg";

import styles from "./Application.module.css";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef } from "react";

export const Application = ({ onRequestClose, nannieName, nannieImg }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      address: "",
      phone: "",
      childAge: "",
      time: "",
      email: "",
      parentName: "",
      comment: "",
    },
  });

  const onSubmit = () => {
    toast.success("Application sent successfully!");
    onRequestClose();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Make an appointment with a babysitter</h2>
      <p className={styles.textDescription}>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </p>

      <div className={styles.nannieWrapper}>
        <img src={nannieImg} alt={nannieName} width="44px" />
        <div>
          <p className={styles.position}>Your nanny</p>
          <p className={styles.name}>{nannieName}</p>
        </div>
      </div>

      <form className={styles.formFields} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.contactWrapper}>
          <label className={styles.label}>
            <input
              {...register("address")}
              className={styles.contactField}
              type="text"
              autoComplete="off"
              placeholder="Address"
            />
            {errors.address && (
              <div className={styles.errorText}>{errors.address.message}</div>
            )}
          </label>
          <label className={styles.label}>
            <input
              {...register("phone")}
              className={styles.contactField}
              type="tel"
              autoComplete="off"
              placeholder="+380"
            />
            {errors.phone && (
              <div className={styles.errorText}>{errors.phone.message}</div>
            )}
          </label>
          <label className={styles.label}>
            <input
              {...register("childAge", { valueAsNumber: true })}
              className={styles.contactField}
              type="number"
              autoComplete="off"
              placeholder="Child's age"
            />
            {errors.childAge && (
              <div className={styles.errorText}>{errors.childAge.message}</div>
            )}
          </label>
          <label className={styles.label}>
            <div className={styles.timePickerWrapper}>
              <Controller
                control={control}
                name="time"
                render={({ field }) => {
                  const datePickerRef = useRef(null);

                  return (
                    <>
                      <DatePicker
                        ref={datePickerRef}
                        selected={
                          field.value
                            ? new Date(`2023-01-01T${field.value}`)
                            : null
                        }
                        onChange={(date) => {
                          if (date) {
                            const hours = date
                              .getHours()
                              .toString()
                              .padStart(2, "0");
                            const minutes = date
                              .getMinutes()
                              .toString()
                              .padStart(2, "0");
                            field.onChange(`${hours}:${minutes}`);
                            setTimeout(() => {
                              if (datePickerRef.current) {
                                datePickerRef.current.setOpen(false);
                              }
                            }, 50);
                          } else {
                            field.onChange("");
                          }
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                        timeCaption="Meeting time"
                        placeholderText="00:00"
                        className={styles.contactField}
                        minTime={new Date(0, 0, 0, 9, 0)}
                        maxTime={new Date(0, 0, 0, 21, 0)}
                        popperPlacement="bottom-start"
                        popperClassName={styles.timePicker}
                      />
                      <svg className={styles.clockIcon} width="24" height="24">
                        <use href={sprite + "#icon-clock"} />
                      </svg>
                    </>
                  );
                }}
              />
            </div>
            {errors.time && (
              <div className={styles.errorText}>{errors.time.message}</div>
            )}
          </label>
        </div>
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
            {...register("parentName")}
            className={styles.fieldInput}
            type="text"
            autoComplete="off"
            placeholder="Father's or mother's name"
          />
          {errors.parentName && (
            <div className={styles.errorText}>{errors.parentName.message}</div>
          )}
        </label>
        <label className={styles.label}>
          <textarea
            {...register("comment")}
            className={styles.comment}
            autoComplete="off"
            placeholder="Comment"
          />
          {errors.comment && (
            <div className={styles.errorText}>{errors.comment.message}</div>
          )}
        </label>
        <button className={styles.button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
