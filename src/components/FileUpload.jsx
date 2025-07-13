import { useState, useRef } from "react";
import { uploadFile } from "../api/api";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadFile(formData);
      onUpload();
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null; 
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => setFile(e.target.files[0])}
        disabled={loading}
        className="upload-input-hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        className="upload-choose-button"
        disabled={loading}
      >
        {file ? file.name : "Choose file"}
      </button>
      <button type="submit" disabled={loading || !file} className="upload-button">
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <p className="upload-error">{error}</p>}
    </form>
  );
};

export default FileUpload;
