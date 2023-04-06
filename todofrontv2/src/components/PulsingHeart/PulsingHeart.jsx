import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const Heart = styled.div`
  font-size: 40px;
  animation: ${pulse} 1s infinite;
`;

const PulsingHeart = () => {
  return (
    <Heart>❤️</Heart>
  );
}

export default PulsingHeart;
