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
    alert("file will be uploaded");
    //uploadImage(previewSource);
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
        <img
          src={previewSource}
          alt="choosen photo"
          style={{ height: "300px" }}
        />
      )}
    </>
  );
};

export default Upload;
