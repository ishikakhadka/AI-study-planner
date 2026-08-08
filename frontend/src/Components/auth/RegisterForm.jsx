import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useNavigate } from "react-router";
import axiosInstance from "../../lib/axios.instance";

const RegisterSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Username is required"),
});
export default function RegisterForm() {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationKey: ["Register-form"],
    mutationFn: async (values) => {
      return await axiosInstance.post("/register/", values);
    },
    onSuccess: (res) => {
      toast.success("Registered Successfully");
      navigate("/login");
    },
    onError: (error) => {
      console.log("Backend error:", error.response?.data);

      const data = error.response?.data;

      if (data) {
        const firstError = Object.values(data).flat()[0];
        toast.error(firstError || "Registration failed");
      } else {
        toast.error(error.message || "Registration failed");
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={handleSubmit((values) => mutate(values))}>
        <h2>Register</h2>

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
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
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
          {isPending ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}
