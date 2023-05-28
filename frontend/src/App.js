import "./style.css";
import { HomePage } from "./components/HomePage";
import { Register } from "./components/Register";
import { PageNotFound } from "./components/PageNotFound";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./components/Login";
import { AttendeeList } from "./components/AttendeeList";
import { LoggedInProfile } from "./components/LoggedInProfile";
import { useContext, useEffect } from "react";
import Protected from "./components/Protected";
import { NavBar } from "./components/NavBar";
import { AuthenticationContext } from "./components/AuthenticationContext";
import axios from "axios";
import { RegisterAClown } from "./components/RegisterAClown";

function App() {
  const { isSignedIn, setIsSignedIn } = useContext(AuthenticationContext);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/token/verify", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data.employee_id) {
          setIsSignedIn(true);
        }
      });
  }, [setIsSignedIn]);

  return (
    <>
      {location.pathname === "/" ||
      location.pathname === "/register" ||
      location.pathname === "/login" ||
      location.pathname === "/attendees" ||
      location.pathname === "/profile" ? (
        <NavBar onLogout={handleLogout} />
      ) : (
        <></>
      )}

      <Routes>
        <Route
          path="/login"
          element={isSignedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isSignedIn ? <Navigate to="/" /> : <Register />}
        />
        <Route element={<Protected />}>
          <Route path="/attendees" element={<AttendeeList />} />
          <Route path="/profile" element={<LoggedInProfile />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/joinus" element={<RegisterAClown />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
