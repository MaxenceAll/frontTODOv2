import React, { useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useCookies } from "react-cookie";

import styled from "styled-components";

function Themes() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [cookies, setCookie] = useCookies(["theme"]);

  useEffect(() => {
    const root = document.querySelector(":root");
    switch (theme) {
      case "vert":
        root.style.setProperty("--main-color", "#18dc0c");
        root.style.setProperty("--secondary-color", "#11291b");
        root.style.setProperty("--background-color", "#10170f");
        break;
      case "rouge":
        root.style.setProperty("--main-color", "#ff0033");
        root.style.setProperty("--secondary-color", "#4d0000");
        root.style.setProperty("--background-color", "#330000");
        break;
      case "bleu":
        root.style.setProperty("--main-color", "#0077c2");
        root.style.setProperty("--secondary-color", "#00284c");
        root.style.setProperty("--background-color", "#001021");
        break;
      case "violet":
        root.style.setProperty("--main-color", "#7d1af1");
        root.style.setProperty("--secondary-color", "#2c003e");
        root.style.setProperty("--background-color", "#1a001f");
        break;
      case "jaune":
        root.style.setProperty("--main-color", "#ffcc00");
        root.style.setProperty("--secondary-color", "#594d00");
        root.style.setProperty("--background-color", "#331f00");
        break;
      case "cyan":
        root.style.setProperty("--main-color", "#00cccc");
        root.style.setProperty("--secondary-color", "#003333");
        root.style.setProperty("--background-color", "#001a1a");
        break;
      case "rose":
        root.style.setProperty("--main-color", "#e60073");
        root.style.setProperty("--secondary-color", "#33001a");
        root.style.setProperty("--background-color", "#1a000d");
        break;
      case "bronze":
        root.style.setProperty("--main-color", "#cd7f32");
        root.style.setProperty("--secondary-color", "#2c2000");
        root.style.setProperty("--background-color", "#1a1400");
        break;
      case "blé":
        root.style.setProperty("--main-color", "#f5deb3");
        root.style.setProperty("--secondary-color", "#4d3d00");
        root.style.setProperty("--background-color", "#2b1d00");
        break;
      default:
        break;
    }
  }, [theme]);

  function handleClick(color) {
    setTheme(color);
    setCookie("theme", color);
  }

  return (
    <STYLEDThemeContainer>
      <STYLEDThemeContainerBox>
        Choisissez votre thème, theme en cours : {theme}
        <STYLEDThemeOptions>
          <STYLEDThemeOptionsButtons
            className={theme === "vert" ? "active" : ""}
            onClick={() => handleClick("vert")}
          >
            Vert
          </STYLEDThemeOptionsButtons>
          <STYLEDThemeOptionsButtons
            className={theme === "rouge" ? "active" : ""}
            onClick={() => handleClick("rouge")}
          >
            Rouge
          </STYLEDThemeOptionsButtons>
          <STYLEDThemeOptionsButtons
            className={theme === "bleu" ? "active" : ""}
            onClick={() => handleClick("bleu")}
          >
            Blue
          </STYLEDThemeOptionsButtons>
          <STYLEDThemeOptionsButtons
            className={theme === "violet" ? "active" : ""}
            onClick={() => handleClick("violet")}
          >
            Violet
          </STYLEDThemeOptionsButtons>
          <STYLEDThemeOptionsButtons
            className={theme === "jaune" ? "active" : ""}
            onClick={() => handleClick("jaune")}
          >
            Jaune
          </STYLEDThemeOptionsButtons>
          <STYLEDThemeOptionsButtons
            className={theme === "cyan" ? "active" : ""}
            onClick={() => handleClick("cyan")}
          >
            Cyan
          </STYLEDThemeOptionsButtons>
          <STYLEDThemeOptionsButtons
            className={theme === "rose" ? "active" : ""}
            onClick={() => handleClick("rose")}
          >
            Rose
          </STYLEDThemeOptionsButtons>
          <STYLEDThemeOptionsButtons
            className={theme === "bronze" ? "active" : ""}
            onClick={() => handleClick("bronze")}
          >
            Bronze
          </STYLEDThemeOptionsButtons>
          <STYLEDThemeOptionsButtons
            className={theme === "blé" ? "active" : ""}
            onClick={() => handleClick("blé")}
          >
            Blé
          </STYLEDThemeOptionsButtons>
        </STYLEDThemeOptions>
      </STYLEDThemeContainerBox>
    </STYLEDThemeContainer>
  );
}

export default Themes;

const STYLEDThemeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const STYLEDThemeContainerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 245px, rgba(0, 0, 0, 0.08) 0 0 0 5px;
`;
const STYLEDThemeOptions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const STYLEDThemeOptionsButtons = styled.button`
  padding: 10px;
  background-color: var(--secondary-color);
  color: var(--main-color);
  border-radius: 10px;
  &:hover {
    background-color: var(--main-color);
    color: var(--background-color);
  }
  &:active {
    background-color: var(--main-color);
    color: var(--background-color);
  }
`;
