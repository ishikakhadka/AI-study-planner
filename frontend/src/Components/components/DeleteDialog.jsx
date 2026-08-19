import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios.instance";
import toast from "react-hot-toast";
import { Trash2, X } from "lucide-react";
import "../../../CSS/delete.css";
const DeleteDialog = ({ id, isOpen, onClose }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await axiosInstance.delete(`/study_plan/${id}/`);
    },

    onSuccess: (res) => {
      toast.success(res.data.message || "Study plan deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["study-index"],
      });

      onClose();
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete study plan",
      );
    },
  });

  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="delete-icon">
          <Trash2 size={25} />
        </div>

        <h2>Delete study plan?</h2>

        <p>
          This action cannot be undone. Are you sure you want to permanently
          delete this study plan?
        </p>

        <div className="delete-modal-actions">
          <button
            className="modal-cancel"
            onClick={onClose}
            disabled={isPending}>
            Cancel
          </button>

          <button
            className="modal-delete"
            onClick={() => mutate()}
            disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
