import { useQuery } from "@tanstack/react-query";
import "../../CSS/studyindex.css";
import axiosInstance from "../lib/axios.instance";
import { NotebookPen, SquarePen, Trash, Plus } from "lucide-react";
import toast from "react-hot-toast";
import DeleteDialog from "../Components/components/DeleteDialog";
import { useState } from "react";
import { useNavigate } from "react-router";

const StudyIndex = () => {
  const navigate = useNavigate();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const { isPending, error, data } = useQuery({
    queryKey: ["study-index"],

    queryFn: async () => {
      const response = await axiosInstance.get("/study_plan/");
      return response.data;
    },

    onError: (error) => {
      const data = error.response?.data;

      if (data) {
        const firstError = Object.values(data).flat()[0];
        toast.error(firstError || "Failed to fetch study plans");
      } else {
        toast.error(error.message || "Failed to fetch study plans");
      }
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load study plans.</p>;
  }

  const plans = data?.data || [];

  return (
    <>
      <div className="study-plans-header">
        <div className="study-plans-title-section">
          <div className="study-plans-icon">
            <NotebookPen size={25} />
          </div>

          <div>
            <h2>Study Plans</h2>

            <p>Everything you need to lock in and get those goals.</p>
          </div>
        </div>

        <button
          className="create-study-plan-button"
          onClick={() => navigate("/study-plan/create/")}>
          <Plus size={17} />
          Create Study Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="study-empty-page">
          <div className="study-empty-icon">
            <NotebookPen size={32} />
          </div>

          <h2>No study plans yet</h2>

          <p>
            Time to lock in. Create your first study plan and start making
            progress.
          </p>

          <button
            className="empty-study-plan-button"
            onClick={() => navigate("/study-plan/create/")}>
            <Plus size={17} />
            Create Study Plan
          </button>
        </div>
      ) : (
        <div className="task-table-container">
          <table className="task-table">
            <thead>
              <tr>
                <th>Study Plan</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <td className="task-name" data-label="Study Plan">
                    {plan.title}
                  </td>

                  <td data-label="Description">{plan.description}</td>

                  <td data-label="Start Date">{plan.start_date}</td>

                  <td data-label="End Date">{plan.end_date}</td>

                  <td data-label="Status">
                    <span
                      className={`status ${plan.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}>
                      {plan.status}
                    </span>
                  </td>

                  <td className="action-cell" data-label="Action">
                    <div className="actions">
                      <button
                        type="button"
                        className="icon-button edit-button"
                        onClick={() =>
                          navigate(`/study-plan/create/${plan.id}/`)
                        }>
                        <SquarePen />
                      </button>

                      <button
                        type="button"
                        className="icon-button delete-button"
                        onClick={() => {
                          setSelectedPlanId(plan.id);
                          setShowDeleteDialog(true);
                        }}>
                        <Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDeleteDialog && (
        <DeleteDialog
          id={selectedPlanId}
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedPlanId(null);
          }}
        />
      )}
    </>
  );
};

export default StudyIndex;
