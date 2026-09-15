import { FileCode, Plus, Search, Play, FileText, Image } from "lucide-react";
import "../../CSS/resource.css";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios.instance";

const Resources = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
  const { isPending, isError, data } = useQuery({
    queryKey: ["resource-index"],
    queryFn: async (values) => {
      const response = await axiosInstance.get("/resources/");
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

  if (isError) {
    return <p>Failed to load resources.</p>;
  }
  console.log(data);
  const publicResources = data?.data?.public_data || [];
  const userResources = data?.data?.user_data || [];
  // console.log(userResources);

  const hasResources = publicResources.length > 0 || userResources.length > 0;

  const getResourcesByType = (resources, type) => {
    return resources.filter((resource) => resource.file_type === type);
  };

  const ResourceCard = ({ resource }) => {
    return (
      <div className="resource-card">
        {resource.file_type === "IMAGE" && (
          <img
            src={`${API_URL}${resource.file}`}
            alt={resource.title}
            className="resource-image"
          />
        )}

        {resource.file_type === "VIDEO" && (
          <div className="resource-video-preview">
            <video src={`${API_URL}${resource.file}`} />
            <div className="video-overlay">
              <Play size={28} fill="currentColor" />
            </div>
          </div>
        )}

        {resource.file_type === "DOCUMENT" && (
          <div
            className="resource-document-preview"
            onClick={() => window.open(`${API_URL}${resource.file}`, "_blank")}
            style={{ cursor: "pointer" }}>
            <FileText size={40} />
          </div>
        )}
        <div className="resource-card-content">
          <h4>{resource.title}</h4>

          {resource.description && <p>{resource.description}</p>}
        </div>
      </div>
    );
  };

  const VideoReels = ({ resources }) => {
    if (!resources.length) return null;

    return (
      <div className="reels-container">
        {resources.map((resource) => (
          <div className="reel" key={resource.id}>
            <video
              src={`${API_URL}${resource.file}`}
              controls
              loop
              playsInline
              className="reel-video"
            />

            <div className="reel-info">
              <h4>{resource.title}</h4>

              {resource.description && <p>{resource.description}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ResourceSection = ({ title, resources }) => {
    const videos = getResourcesByType(resources, "VIDEO");
    const images = getResourcesByType(resources, "IMAGE");
    const documents = getResourcesByType(resources, "DOCUMENT");
    if (!resources.length) return null;

    return (
      <section className="resource-section">
        <h3>{title}</h3>

        {videos.length > 0 && (
          <div className="resource-category">
            <div className="resource-category-title">
              <Play size={18} />
              <h4>Videos</h4>
            </div>

            <VideoReels resources={videos} />
          </div>
        )}

        {images.length > 0 && (
          <div className="resource-category">
            <div className="resource-category-title">
              <Image size={18} />
              <h4>Images</h4>
            </div>

            <div className="resource-grid">
              {images.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {documents.length > 0 && (
          <div className="resource-category">
            <div className="resource-category-title">
              <FileText size={18} />
              <h4>Documents</h4>
            </div>

            <div className="resource-grid">
              {documents.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        )}
      </section>
    );
  };

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
          onClick={() => navigate("/resources-create")}>
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

      {!hasResources ? (
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
            onClick={() => navigate("/resources-create")}>
            <Plus size={17} />
            Add your first resource
          </button>
        </div>
      ) : (
        <>
          <ResourceSection title="My Resources" resources={userResources} />

          <ResourceSection
            title="Public Resources"
            resources={publicResources}
          />
        </>
      )}
    </div>
  );
};

export default Resources;
