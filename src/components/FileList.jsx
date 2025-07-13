import { deleteFile } from "../api/api";

const FileList = ({ media, onDelete }) => {
  if (!Array.isArray(media)) {
    return <p>No media files to display.</p>;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await deleteFile(id);
        onDelete();
      } catch (error) {
        alert("Failed to delete file.");
        console.error(error);
      }
    }
  };

  return (
    <div className="file-list-container">
      <h3>Your Files</h3>
      {media.length === 0 ? (
        <p>No media files uploaded yet.</p>
      ) : (
        media.map((item) => {
          const isVideo =
            (item.mimetype && item.mimetype.startsWith("video/")) ||
            item.filename.match(/\.(mp4|webm)$/);
          const isImage =
            (item.mimetype && item.mimetype.startsWith("image/")) ||
            item.filename.match(/\.(jpg|jpeg|png|gif)$/);

           const fileUrl = item.url;


            console.log(fileUrl)

          return (
            <div key={item._id} className="file-item" style={styles.fileItem}>
              <div style={styles.preview}>
                {isVideo ? (
                  <video width="200" height="150" controls>
                    <source src={fileUrl} type={item.mimetype || "video/mp4"} />
                    Your browser does not support the video tag.
                  </video>
                ) : isImage ? (
                  <img
                    src={fileUrl}
                    alt={item.filename}
                    style={{ maxWidth: "150px" }}
                  />
                ) : (
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.filename}
                  </a>
                )}
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

const styles = {
  fileItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #ddd",
  },
  preview: {
    flex: 1,
  },
  deleteBtn: {
    marginLeft: "12px",
    padding: "4px 8px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default FileList;
