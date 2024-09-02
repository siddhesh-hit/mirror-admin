import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import { routes } from "./routes";

import ProtectedRoute from "./ProtectedRoute";
import Login from "pages/home/login";
import Header from "components/common/Header";
import Menu from "components/common/Menu";
import Footer from "components/common/Footer";
import Captcha from "components/common/Captcha";

const Layout = ({ children }) => {
  const location = useLocation();
  const noHeaderFooterPaths = [
    "/",
    "/Captcha",
  ];
  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      {showHeaderFooter && <Menu />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default function RoutesData() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Captcha" element={<Captcha />} />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<ProtectedRoute element={route} />}
              />
            ))}
          </Routes>
        </Layout>
      </Router>
    </>
  );
}
