import { useForm } from "react-hook-form";
import "../../../CSS/planform.css";
import axiosInstance from "../../lib/axios.instance";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const ResourceForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      file_type: "DOCUMENT",
      file_visibility: "PUBLIC",
      file: null,
    },
  });
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["resources"],

    mutationFn: async (formData) => {
      return await axiosInstance.post("/resources/", formData);
    },

    onSuccess: () => {
      toast.success("Resource created successfully.");
      reset();
      navigate("/resources");
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
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("file_type", data.file_type);
    formData.append("file_visibility", data.file_visibility);

    formData.append("file", data.file[0]);

    console.log([...formData.entries()]);
    console.log("Submiited data:", formData);
    mutate(formData);
  };

  return (
    <div className="plan-form-container">
      <form className="plan-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-header">
          <h2>Add Resource</h2>
          <p>
            Upload and share useful study resources with your fellow students.
          </p>
        </div>

        {/* RESOURCE DETAILS */}
        <div className="form-section">
          <h3>Resource Details</h3>

          {/* TITLE */}
          <div className="form-group">
            <label htmlFor="title">Resource Title</label>

            <input
              id="title"
              type="text"
              placeholder="e.g. Software Engineering Notes"
              {...register("title", {
                required: "Resource title is required",
                maxLength: {
                  value: 200,
                  message: "Title cannot exceed 200 characters",
                },
              })}
            />

            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              placeholder="Briefly describe this resource..."
              {...register("description", {
                maxLength: {
                  value: 200,
                  message: "Description cannot exceed 200 characters",
                },
              })}
            />

            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}
          </div>

          {/* TYPE + VISIBILITY */}
          <div className="form-row">
            {/* FILE TYPE */}
            <div className="form-group">
              <label htmlFor="file_type">File Type</label>

              <select
                id="file_type"
                {...register("file_type", {
                  required: "File type is required",
                })}>
                <option value="DOCUMENT">Document</option>

                <option value="IMAGE">Image</option>

                <option value="VIDEO">Video</option>
              </select>

              {errors.file_type && (
                <p className="error">{errors.file_type.message}</p>
              )}
            </div>

            {/* VISIBILITY */}
            <div className="form-group">
              <label htmlFor="file_visibility">Visibility</label>

              <select
                id="file_visibility"
                {...register("file_visibility", {
                  required: "Visibility is required",
                })}>
                <option value="PUBLIC">Public</option>

                <option value="PRIVATE">Private</option>
              </select>

              {errors.file_visibility && (
                <p className="error">{errors.file_visibility.message}</p>
              )}
            </div>
          </div>

          {/* FILE */}
          <div className="form-group">
            <label htmlFor="file">Upload File</label>

            <input
              id="file"
              type="file"
              {...register("file", {
                required: "Please select a file",
              })}
            />

            {errors.file && <p className="error">{errors.file.message}</p>}
          </div>
        </div>

        {/* BUTTON */}
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Add Resource"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResourceForm;
