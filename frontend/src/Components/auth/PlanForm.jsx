import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlanSchema } from "../../../schema/PlanSchema";
import "../../../CSS/planform.css";
import TaskForm from "./TaskForm";

import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios.instance";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router";

const ACTIVE = "ACTIVE";

export default function PlanForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
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

  const {
    data: editData,
    isPending: isFetching,
    isError: isFetchError,
  } = useQuery({
    queryKey: ["edit-plan", id],

    queryFn: async () => {
      const response = await axiosInstance.get(`/study_plan/${id}/`);

      return response.data;
    },
    enabled: isEdit,
  });

  const plans = editData?.data;

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: async (values) => {
      if (isEdit) {
        const response = await axiosInstance.put(`/study_plan/${id}/`, values);
        return response.data;
      }

      const response = await axiosInstance.post("/study_plan/", values);

      return response.data;
    },

    onSuccess: () => {
      toast.success(
        isEdit
          ? "Study Plan updated successfully."
          : "Study Plan created successfully.",
      );

      navigate("/study-plan");
    },

    onError: (error) => {
      console.log("API ERROR:", error.response?.data);

      const data = error.response?.data;

      if (data) {
        const firstError = Object.values(data).flat()[0];

        toast.error(firstError || "Something went wrong.");
      } else {
        toast.error(error.message || "Something went wrong.");
      }
    },
  });

  useEffect(() => {
    if (!plans) {
      return;
    }

    reset({
      title: plans.title || "",

      description: plans.description || "",

      start_date: plans.start_date || "",

      end_date: plans.end_date || "",

      daily_study_goal: plans.daily_study_goal || 0,

      status: plans.status || ACTIVE,

      tasks:
        plans.tasks?.length > 0
          ? plans.tasks
          : [
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
    });
  }, [plans, reset]);

  // --------------------------------
  // TASK FIELD ARRAY
  // --------------------------------

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const addTask = () => {
    append({
      date: "",
      title: "",
      description: "",
      subject: "",
      start_time: "",
      end_time: "",
      status: "PENDING",
      priority: "HIGH",
    });
  };

  const deleteTask = (index) => {
    if (!isEdit) {
      if (index !== 0) {
        remove(index);
      }
    } else {
      remove(index);
    }
  };

  const onSubmit = (values) => {
    console.log("SUBMITTED VALUES:", values);

    mutate(values);
  };

  const onError = (errors) => {
    console.log("VALIDATION ERRORS:", errors);
  };

  if (isEdit && isFetching) {
    return (
      <div className="plan-form-container">
        <div className="form-loading">Loading study plan...</div>
      </div>
    );
  }

  if (isEdit && isFetchError) {
    return (
      <div className="plan-form-container">
        <div className="form-error">Failed to load study plan.</div>
      </div>
    );
  }

  // --------------------------------
  // FORM
  // --------------------------------

  return (
    <div className="plan-form-container">
      <form className="plan-form" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="form-header">
          <h2>{isEdit ? "Edit Study Plan" : "Create Study Plan"}</h2>

          <p>
            {isEdit
              ? "Update your study plan."
              : "Set your goals and create a plan for your studies."}
          </p>
        </div>

        <div className="form-section">
          <h3>Plan Details</h3>

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
              onAdd={addTask}
              onDelete={() => deleteTask(index)}
              edit={isEdit}
            />
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSaving}>
            {isSaving
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update Study Plan"
                : "Create Study Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}
