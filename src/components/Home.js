import React, { useState, useEffect } from "react";
import { Image, Transformation } from "cloudinary-react";

const Home = () => {
  const [imageIds, setImageIds] = useState([]);

  useEffect(() => {
    loadImages();
  }, []);
  const loadImages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/images");
      const data = await res.json();
      setImageIds(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h2>Photo Gallary</h2>
      {imageIds &&
        imageIds.map((imageId, index) => (
          <Image key={index} cloudName="dkhanal" publicId={imageId}>
            <Transformation crop="fit" width="200" height="200" radius="max" />
          </Image>
        ))}
    </>
  );
};

export default Home;
