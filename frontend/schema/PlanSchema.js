import { z } from "zod";

export const PlanSchema = z
  .object({
    title: z.string().min(1, "Title is required"),

    description: z.string().min(1, "Description is required"),

    start_date: z.string().min(1, "Start date is required"),

    end_date: z.string().min(1, "End date is required"),

    daily_study_goal: z.coerce
      .number()
      .min(1, "Daily study goal must be at least 1"),

    status: z.enum(["ACTIVE", "COMPLETED", "PAUSED"]),

    tasks: z
      .array(
        z
          .object({
            date: z.string().min(1, "Task date is required"),

            start_time: z.string().min(1, "Start time is required"),

            end_time: z.string().min(1, "End time is required"),

            title: z.string().min(1, "Task title is required"),

            description: z.string().min(1, "Task description is required"),

            subject: z.string().min(1, "Subject is required"),

            status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "SKIPPED"]),

            priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
          })
          .refine((data) => data.end_time > data.start_time, {
            message: "End time must be after start time",
            path: ["end_time"],
          }),
      )
      .min(1, "At least one task is required"),
  })
  .refine(
    (data) => {
      if (!data.start_date || !data.end_date) {
        return true;
      }

      return data.end_date >= data.start_date;
    },
    {
      message: "End date cannot be before start date",
      path: ["end_date"],
    },
  );
