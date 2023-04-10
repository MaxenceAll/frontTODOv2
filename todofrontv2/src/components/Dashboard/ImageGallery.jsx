import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";

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

function Image({ userId, filename }) {
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const headers = { authorization: config.api.authorization };
        const url = `${config.api.url}uploads/${userId}/${filename}`;
        const response = await axios.get(url, { headers, responseType: "arraybuffer" });
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        setImageData(URL.createObjectURL(blob));
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage();
  }, [filename, userId]);

  return <img width={"20%"} src={imageData} alt={filename} />;
}

export default ImageGallery;
