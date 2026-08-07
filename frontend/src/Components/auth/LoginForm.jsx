import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router";

const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Validated Form Data:", data);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            {...register("username")}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
        <Link to="/register">
          <p
            style={{
              color: "blue",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "5px",
            }}>
            Don't have an account? Register Now.
          </p>
        </Link>
      </form>
    </div>
  );
}
