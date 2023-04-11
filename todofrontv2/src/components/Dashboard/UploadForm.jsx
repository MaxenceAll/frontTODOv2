import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../styles/genericContainer";
import axios from "axios";

import config from "../../config";
import { AuthContext } from "../../Contexts/AuthContext";
import { AdminContext } from "../../Contexts/AdminContext";
import ImageGallery from "./ImageGallery";
import { STYLEDButton } from "../../styles/genericButton";
import { STYLEDInput } from "../../styles/genericInput";

function UploadForm() {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const { auth, setAuth } = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileInputChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  // pour le re-render after submit
  const [key, setKey] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    console.log(auth?.data?.id);
    formData.append("userId", auth?.data?.id);
    formData.append("image", selectedFile);

    const url = config.api.url + "customer/uploads";
    const headers = { authorization: config.api.authorization };
    // console.log(url);

    try {
      const response = await axios.post(url, formData, { headers });
      // console.log(response);
      // console.log(response.data);
      setKey(key + 1);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <STYLEDContainer>
        <STYLEDContainerBox>
          {/* encType pour include les headers acceptation de fichier */}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <STYLEDInput type="file" onChange={handleFileInputChange} />
            <STYLEDButton type="submit">Uploader</STYLEDButton>
          </form>

          {selectedFile && (
            <>
              <STYLEDImgPreview
                src={URL.createObjectURL(selectedFile)}
                alt="Uploaded image"
              />
            </>
          )}
        </STYLEDContainerBox>
      </STYLEDContainer>


        <STYLEDContainer>
          <STYLEDContainerBox>
            <ImageGallery userId={auth?.data?.id} key={key}/>
          </STYLEDContainerBox>
        </STYLEDContainer>

    </>
  );
}

export default UploadForm;

const STYLEDImgPreview = styled.img`
  width: 300px;
`;
