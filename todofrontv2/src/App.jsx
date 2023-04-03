import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import Error from "./components/Error";
import Layout from "./Layouts/Layout";
import NotFound from "./components/Notfound";
import {Home} from "./pages/Home";
import Login from "./pages/Login/Login";
import Themes from "./pages/Themes";
import About from "./pages/About";


import { useCookies } from "react-cookie";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./Contexts/ThemeContext";
import { changeTheme } from "./Helpers/changeTheme";


import Homebis from "./pages/Homebis";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./pages/Login/VerifyEmail";
import VerifyEmailSuccess from "./pages/login/VerifyEmailSuccess";
import ResetPassword from "./pages/login/ResetPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="about" element={<About />} />
      <Route path="reset" element={<ResetPassword />} />
      <Route path="verify-email" element={<VerifyEmail />} />
      <Route path="success" element={<VerifyEmailSuccess />} />
      <Route path="themes" element={<Themes />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  // GESTION DU THEME dans le cookie AU LOAD //
  const { theme, setTheme } = useContext(ThemeContext);
  const [cookies, setCookie] = useCookies(["theme"]);
  useEffect(() => {
    changeTheme(cookies.theme, setTheme, setCookie);
  }, []);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
