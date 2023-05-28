import { useContext, useEffect } from "react";
import { AuthenticationContext } from "./AuthenticationContext";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Protected = () => {
  const { isSignedIn, setIsSignedIn } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const location = useLocation();

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
          navigate(location.pathname);
        }
      });
  }, [location.pathname, navigate, setIsSignedIn]);

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default Protected;
