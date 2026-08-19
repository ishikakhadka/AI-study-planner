import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlanSchema } from "../../../schema/PlanSchema";
import "../../../CSS/planform.css";
import TaskForm from "./TaskForm";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios.instance";
import toast from "react-hot-toast";

const ACTIVE = "ACTIVE";

export default function PlanForm(props) {
  const { isPending, mutate } = useMutation({
    mutationKey: ["study-plan"],
    mutationFn: async (values) => {
      return await axiosInstance.post("/study_plan/", values);
    },
    onSuccess: (res) => {
      toast.success("Study Plan created successfully.");
    },
    onError: (error) => {
      const data = error.response?.data;

      if (data) {
        const firstError = Object.values(data).flat()[0];
        toast.error(firstError || "Login failed");
      } else {
        toast.error(error.message || "Login failed");
      }
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(PlanSchema),
    defaultValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      daily_study_goal: 0,
      status: ACTIVE,
      tasks: [
        {
          date: "",
          title: "",
          description: "",
          subject: "",
          start_time: "",
          end_time: "",
          status: "PENDING",
          priority: "HIGH",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const onSubmit = (data) => {
    console.log("SUBMITTED:", data);
  };

  const onError = (errors) => {
    console.log("VALIDATION ERRORS:", errors);
  };

  return (
    <div className="plan-form-container">
      <form
        className="plan-form"
        onSubmit={handleSubmit((values) => mutate(values))}>
        {/* Header */}
        <div className="form-header">
          <h2>Create Study Plan</h2>
          <p>Set your goals and create a plan for your studies.</p>
        </div>

        {/* Plan Details */}
        <div className="form-section">
          <h3>Plan Details</h3>
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title</label>

            <input
              id="title"
              type="text"
              placeholder="e.g. Learn Django"
              {...register("title")}
            />

            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>
          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              placeholder="Describe your study plan..."
              rows={4}
              {...register("description")}
            />

            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}
          </div>
          {/* Dates */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start_date">Start Date</label>

              <input id="start_date" type="date" {...register("start_date")} />

              {errors.start_date && (
                <p className="error">{errors.start_date.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="end_date">End Date</label>

              <input id="end_date" type="date" {...register("end_date")} />

              {errors.end_date && (
                <p className="error">{errors.end_date.message}</p>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="daily_study_goal">Daily Study Goal</label>

              <div className="goal-input">
                <input
                  id="daily_study_goal"
                  type="number"
                  min="1"
                  step="0.5"
                  placeholder="e.g. 4"
                  {...register("daily_study_goal", {
                    valueAsNumber: true,
                  })}
                />

                <span>hours/day</span>
              </div>

              {errors.daily_study_goal && (
                <p className="error">{errors.daily_study_goal.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>

              <select id="status" {...register("status")}>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="PAUSED">Paused</option>
              </select>

              {errors.status && (
                <p className="error">{errors.status.message}</p>
              )}
            </div>
          </div>
          {fields.map((field, index) => (
            <TaskForm
              key={field.id}
              index={index}
              register={register}
              errors={errors}
              onAdd={() =>
                append({
                  description: "",
                  date: "",
                  title: "",
                  subject: "",
                  start_time: "",
                  end_time: "",
                  status: "PENDING",
                  priority: "HIGH",
                })
              }
              onDelete={() => {
                if (index != 0) {
                  remove(index);
                }
              }}
            />
          ))}{" "}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Study Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}
