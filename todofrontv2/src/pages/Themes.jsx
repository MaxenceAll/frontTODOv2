import React, { useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useCookies } from "react-cookie";

import styled from "styled-components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { STYLEDButton } from "../styles/genericButton";
import { STYLEDContainer, STYLEDContainerBox } from "../styles/genericContainer";
import { STYLEDhr } from "../styles/genericHR";

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
        case "orange":
          root.style.setProperty("--main-color", "#ff8c00");
          root.style.setProperty("--secondary-color", "#8b2500");
          root.style.setProperty("--background-color", "#551a00");
          break;
        case "gris":
          root.style.setProperty("--main-color", "#808080");
          root.style.setProperty("--secondary-color", "#2b2b2b");
          root.style.setProperty("--background-color", "#1a1a1a");
          break;
        case "noir":
          root.style.setProperty("--main-color", "#000000");
          root.style.setProperty("--secondary-color", "#262626");
          root.style.setProperty("--background-color", "#121212");
          break;
        case "blanc":
          root.style.setProperty("--main-color", "#ffffff");
          root.style.setProperty("--secondary-color", "#e6e6e6");
          root.style.setProperty("--background-color", "#9c9c9c");
          break;
        case "marron":
          root.style.setProperty("--main-color", "#a52a2a");
          root.style.setProperty("--secondary-color", "#5a0a0a");
          root.style.setProperty("--background-color", "#2d0707");
          break;
      default:
        break;
    }
  }, [theme]);

  function handleClick(color) {
    setTheme(color);
    setCookie("theme", color);
    toast.success(`Changement de theme pour ${color}`);
  }


  return (
    <STYLEDContainer>
      <STYLEDContainerBox>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: "var(--background-color)",
          color: "var(--main-color)",
        }}
      />



        Choisissez votre thème, theme en cours : {theme}

        <STYLEDhr />
        
        <STYLEDThemeOptions>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "vert" ? "active" : ""}
            onClick={() => handleClick("vert")}
          >
            Vert
          </STYLEDButton>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "rouge" ? "active" : ""}
            onClick={() => handleClick("rouge")}
          >
            Rouge
          </STYLEDButton>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "bleu" ? "active" : ""}
            onClick={() => handleClick("bleu")}
          >
            Blue
          </STYLEDButton>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "violet" ? "active" : ""}
            onClick={() => handleClick("violet")}
          >
            Violet
          </STYLEDButton>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "jaune" ? "active" : ""}
            onClick={() => handleClick("jaune")}
          >
            Jaune
          </STYLEDButton>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "cyan" ? "active" : ""}
            onClick={() => handleClick("cyan")}
          >
            Cyan
          </STYLEDButton>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "rose" ? "active" : ""}
            onClick={() => handleClick("rose")}
          >
            Rose
          </STYLEDButton>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "bronze" ? "active" : ""}
            onClick={() => handleClick("bronze")}
          >
            Bronze
          </STYLEDButton>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "blé" ? "active" : ""}
            onClick={() => handleClick("blé")}
          >
            Blé
          </STYLEDButton>

          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "orange" ? "active" : ""}
            onClick={() => handleClick("orange")}
          >
            Orange
          </STYLEDButton>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "gris" ? "active" : ""}
            onClick={() => handleClick("gris")}
          >
            Gris
          </STYLEDButton>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "noir" ? "active" : ""}
            onClick={() => handleClick("noir")}
          >
            Noir
          </STYLEDButton>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "blanc" ? "active" : ""}
            onClick={() => handleClick("blanc")}
          >
            Blanc
          </STYLEDButton>
          <STYLEDButton height="25px" width="80%"
            isActiveTheme={theme === "marron" ? "active" : ""}
            onClick={() => handleClick("marron")}
          >
            Marron
          </STYLEDButton>



        </STYLEDThemeOptions>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
}

export default Themes;

const STYLEDThemeOptions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
`;