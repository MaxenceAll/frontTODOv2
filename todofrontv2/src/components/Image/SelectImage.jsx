import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import Image from "../Image/Image";
import styled from 'styled-components'

import { v4 as uuidv4 } from 'uuid';
import { STYLEDButton } from "../../styles/genericButton";

function SelectImage({ userId , onSelectImage }) {
  const [images, setImages] = useState([]);

  const handleSelect = (filename) => {
    onSelectImage(filename);
  }

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
          <div key={uuidv4()}>
            <Image userId={userId} filename={filename} />
            <STYLEDButton onClick={() => handleSelect(filename)}>Choisir</STYLEDButton>
          </div>
        ))}
      </div>
    </>
  );
}

export default SelectImage;

const STYLEDChooseImageContainer = styled.div`
display: flex;

`