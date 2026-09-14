import { FileCode, Plus, Search } from "lucide-react";
import "../../CSS/resource.css";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Resources = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["resource-index"],
    queryFn: async (values) => {
      const response = await axiosInstance.get(`/resources/`);

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

  const navigate = useNavigate();
  return (
    <div className="resources-container">
      <div className="resources-header">
        <div className="resources-title-section">
          <div className="resources-icon">
            <FileCode size={24} />
          </div>

          <div>
            <h2>Resources</h2>
            <p>Everything you need to study productively</p>
          </div>
        </div>

        <button
          className="add-resource-button"
          onClick={() => {
            navigate("/resources-create");
          }}>
          <Plus size={18} />
          Add Resource
        </button>
      </div>

      <div className="resources-toolbar">
        <div className="resources-search">
          <Search size={18} />
          <input type="text" placeholder="Search resources..." />
        </div>
      </div>

      <div className="resources-empty">
        <div className="resources-empty-icon">
          <FileCode size={30} />
        </div>

        <h3>No resources yet</h3>

        <p>
          Add notes, documents, links, or other study materials to keep
          everything organized in one place.
        </p>

        <button
          className="empty-resource-button"
          onClick={() => {
            navigate("/resources-create");
          }}>
          <Plus size={17} />
          Add your first resource
        </button>
      </div>
    </div>
  );
};

export default Resources;
