import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/Theme";
import Footer from "./components/Footer/Footer";
import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useGoogleOneTapLogin } from "@react-oauth/google";
// import HomePage from "./pages/Home";
// import Service from "./pages/Service";
// import StudioPage from "./pages/StudioPage";
import StudioDetail from "./pages/StudioDetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/ProfilePage";
import jwtDecode from "jwt-decode";
import StudioPage from "./pages/StudioPage";
import NotAccess from "./pages/NotAccess";
import NotFound from "./pages/NotFound";

function App() {
  const HomePage = lazy(() => import("./pages/Home"));
  const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
  const Service = lazy(() => import("./pages/Service"));
  const Navbar = lazy(() => import("./components/Navbar/Navbar"));
  const BookingManagement = lazy(() => import("./pages/BookingManagement"));
  const BookingHistory = lazy(() => import("./pages/BookingHistory"));
  const ArtistSchedule = lazy(() => import("./pages/ArtistSchedule"));
  const ServiceManagement = lazy(() => import("./pages/ServiceManagement"));

  const [user, setUser] = useState();

  useEffect(() => {
    decodeToken();
  }, []);

  const decodeToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (token != null) {
        const user = jwtDecode(token);
        console.log(user);
        setUser(user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login failed!");
    },
  });

  return (
    <BrowserRouter basename="/">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <Suspense fallback={<p>Loading...</p>}>
          <Navbar role={user && user.role} user={user} />
          <Routes>
            <Route path="*" exact={true} element={<NotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Service />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/StudioPage" element={<StudioPage />} />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  UserID={user && user.UserID}
                  Role={user && user.Role}
                />
              }
            />
            <Route
              path="/BookingManagement"
              element={
                <BookingManagement
                  Role={user && user.Role}
                  UserID={user && user.UserID}
                />
              }
            />
            <Route
              path="/BookingHistory"
              element={<BookingHistory role={user && user.role} />}
            />
            <Route
              path="/ArtistSchedule"
              element={<ArtistSchedule role={user && user.role} />}
            />
            <Route
              path="/ServiceManagement"
              element={<ServiceManagement role={user && user.role} />}
            />
            <Route path="/StudioDetail/:studioId" element={<StudioDetail />} />
            <Route path="/access-denied" element={<NotAccess />} />
          </Routes>
          <Footer />
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
