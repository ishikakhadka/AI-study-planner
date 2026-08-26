import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios.instance";
import "../../CSS/task.css";

const Tasks = () => {
  const [checkedTasks, setCheckedTasks] = useState([]);

  const { data, isPending } = useQuery({
    queryKey: ["task-list"],
    queryFn: async () => {
      const response = await axiosInstance.get("/study_plan/");
      return response.data;
    },
  });

  const update = useMutation({
    mutationKey: ["update-task"],

    mutationFn: async () => {
      const response = await axiosInstance.patch("/task/complete/", {
        task_ids: checkedTasks,
      });

      return response.data;
    },
  });

  const plans = data?.data || [];

  const handleCheck = (taskId) => {
    setCheckedTasks((previous) => {
      if (previous.includes(taskId)) {
        return previous.filter((id) => id !== taskId);
      }

      return [...previous, taskId];
    });
  };

  const handleUpdate = () => {
    update.mutate();
  };

  if (isPending) {
    return <div className="tasks-loading">Loading tasks...</div>;
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <div>
          <h4>Keep track of what you need to get done.</h4>
        </div>
      </div>

      <div className="tasks-scroll-area">
        {plans.length > 0 ? (
          <div className="task-plans">
            {plans.map((plan) => (
              <div className="task-plan-card" key={plan.id}>
                <h3>{plan.title}</h3>

                <div className="task-list">
                  {plan.tasks?.length > 0 ? (
                    plan.tasks.map((task) => (
                      <label className="task-item" key={task.id}>
                        <input
                          type="checkbox"
                          checked={checkedTasks.includes(task.id)}
                          onChange={() => handleCheck(task.id)}
                        />

                        <span className="custom-checkbox"></span>

                        <span className="task-title">{task.title}</span>

                        <span
                          className={`priority ${task.priority
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}>
                          {task.priority}
                        </span>

                        <span
                          className={`status ${task.status
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}>
                          {task.status}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="no-tasks">No tasks in this plan.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-tasks">
            <p>No tasks found.</p>
          </div>
        )}
      </div>

      <div className="update-button-container">
        <button
          className="update-tasks-button"
          onClick={handleUpdate}
          disabled={checkedTasks.length === 0}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Tasks;
