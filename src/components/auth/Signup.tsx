import firebase from "../../firebase";
import { useForm } from "react-hook-form";
import React from "react";
import { AuthFormInput } from "./Login";
//how to redirect user to home page after clicking SignUp?

export const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormInput>();

  console.log(watch("email")); // watch input value by passing the name of it

  return (
    <div>
      <h3>Signup</h3>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(data.email, data.password);
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
