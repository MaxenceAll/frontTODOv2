import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';


const ForgottenPasswordModal = ({ children, isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsClosing(false);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent isClosing={isClosing}>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

export default ForgottenPasswordModal;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  animation: ${fadeIn} 0.8s ease-in-out;

`;

const ModalContent = styled.div`
  background-color: var(--background-color);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  padding: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height:25%;  
  display:flex;
  justify-content:center;
  align-items:center;
`;