import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import { getMedia } from "../api/api";

const Upload = ({ user }) => {
  const [media, setMedia] = useState([]);

  const fetchMedia = async () => {
    try {
      const res = await getMedia();
      setMedia(res.data.media);
    } catch (err) {
      console.error("Error fetching media:", err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div className="upload-container">
      <h2 className="upload-welcome">Welcome, {user.displayName}</h2>
      <FileUpload onUpload={fetchMedia} />
      <FileList media={media} onDelete={fetchMedia} />
    </div>
  );
};

export default Upload;
