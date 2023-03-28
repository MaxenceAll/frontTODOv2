import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className="app-container">
        <Header />

      <main>
        <Outlet />
      </main>

        <Footer />
    </div>
  );
}
