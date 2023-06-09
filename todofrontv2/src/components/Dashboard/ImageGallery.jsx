import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import Image from "../Image/Image";

function ImageGallery({ userId }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const headers = { authorization: config.api.authorization };
        const url = `${config.api.url}uploads/${userId}`;
        const response = await axios.get(url, { headers });
        setImages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, [userId]);

  return (
    <>
      <div>
        {images.map((filename) => (
          <Image key={filename} userId={userId} filename={filename} />
        ))}
      </div>
    </>
  );
}

export default ImageGallery;
