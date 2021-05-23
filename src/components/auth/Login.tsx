import "firebase/auth";
import firebase from "firebase/app";
import { useForm } from "react-hook-form";
import React from "react";
import { AuthFormInput } from "../../Types";
//how to ensure user is signed in after page is refreshed?

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormInput>();

  return (
    <div>
      <h3>Login</h3>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await firebase
              .auth()
              .signInWithEmailAndPassword(data.email, data.password);
          } catch (error) {
            alert(error.message);
          }
        })}
      >
        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("email", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.email && <span>This field is required</span>}

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("password", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};
