import styled from "styled-components";

export const STYLEDButton = styled.button`
  width: ${(props) => props.width || ""};
  height: ${(props) => props.height || ""};
  border-radius: 10px;
  color: var(--main-color);
  background-color: var(--background-color);

  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    color: var(--secondary-color);
    background-color: var(--main-color);

    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: var(--main-color);
    color: var(--background-color);
  }

  // SPECIAL Theme page :
  background-color: ${(props) =>
    props.isActiveTheme ? "var(--main-color)" : "var(--secondary-color)"};
  color: ${(props) =>
    props.isActiveTheme ? "var(--secondary-color)" : "var(--main-color)"};
`;
