import React, { useState } from "react";

const Upload = () => {
  const [previewSource, setPreviewSource] = useState("");
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };
  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ data: base64EncodedImage }),
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <>
      <div>Photo Upload</div>
      <form onSubmit={handleFileSubmit}>
        <input
          type="file"
          name="image"
          onChange={handleInputChange}
          className="upload_file_input"
        />
        <button type="submit" className="upload_btn">
          Submit
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="choosen" style={{ height: "300px" }} />
      )}
    </>
  );
};

export default Upload;
