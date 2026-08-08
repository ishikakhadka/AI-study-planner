import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios.instance";
import toast from "react-hot-toast";

const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const navigate = useNavigate();
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

  const { isPending, mutate } = useMutation({
    mutationKey: ["Login-form"],
    mutationFn: async (values) => {
      return await axiosInstance.post("/login/", values);
    },
    onSuccess: (res) => {
      const accessToken = res.data.accessToken;
      toast.success("Login Successful!");
      navigate("/");
    },
    onError: (error) => {
      console.log("Backend error:", error.response?.data);

      const data = error.response?.data;

      if (data) {
        const firstError = Object.values(data).flat()[0];
        toast.error(firstError || "Login failed");
      } else {
        toast.error(error.message || "Login failed");
      }
    },
  });

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={handleSubmit((values) => mutate(values))}>
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

        <button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Login"}
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
