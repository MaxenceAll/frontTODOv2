import React, { useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import styled from 'styled-components';



function Image({ userId, filename }) {

    if (!filename){
        return
    }

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

  if (!imageData) {
    return null;
  }

  const handleDelete = async (userId, filename) => {
    try {
      const headers = { authorization: config.api.authorization };
      const url = `${config.api.url}uploads/${userId}/${filename}`;
      await axios.delete(url, { headers });
      console.log(`Successfully deleted file ${filename}`);
  
      // Remove the deleted image's URL from the component's state
      setImageData("");
    } catch (error) {
      console.error(`Error deleting file ${filename}: ${error.message}`);
    }
  };
  

  return (
    <ImageContainer>
      <img src={imageData} alt={filename} />
      <div className="delete-btn" onClick={()=>handleDelete(userId, filename)}>X</div>
    </ImageContainer>
  );
}

export default Image;


const ImageContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: 10px;
  border: 1px solid var(--main-color);

  img {

    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-out;
  }

  &:hover img {
    transform: scale(1.2)
  }
  
  .delete-btn {
    position: absolute;
    color: RED;
    bottom: 5px;
    right: 5px;
    display: none;
    cursor: pointer;
  }
  .delete-btn::before{
    content: "Supprimer"
  }

  &:hover .delete-btn {
    display: block;
  }
`;