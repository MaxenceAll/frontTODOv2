import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useCookies } from "react-cookie";

export function changeTheme(theme, setTheme, setCookie) {
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
  setTheme(theme);
  setCookie("theme", theme, { path: "/" });
}

// Pour changer le theme:
// const { setTheme } = useContext(ThemeContext);
// const [cookies, setCookie] = useCookies(["theme"]);
// changeTheme("vert", setTheme, setCookie);
