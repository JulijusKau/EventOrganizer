import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginContainer,
  MainBox,
  StyledButton,
  StyledInput,
  StyledForm,
  StyledHeader,
} from "../styles/StyledRegisterAndLogin";
import axios from "axios";
import { AuthenticationContext } from "./AuthenticationContext";

export const Login = () => {
  const { setIsSignedIn } = useContext(AuthenticationContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    setFetchingData(true);
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", formData)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setIsSignedIn(true);
          navigate("/");
        } else {
          setError(response.data.message);
          setFetchingData(false);
          console.log(error);
          alert("Incorrect email or password");
        }
      })
      .catch((err) => console.log(err));
  };

  if (fetchingData) {
    return <div>Please wait while loading...</div>;
  } else {
    return (
      <>
        <LoginContainer>
          <MainBox>
            <StyledHeader>
              <h2 style={{ fontWeight: "700" }}>
                Are you ready to rock the house?
              </h2>
              <p>Please enter your email and password to login</p>
            </StyledHeader>
            <StyledForm onSubmit={handleOnSubmit}>
              <StyledInput
                name="email"
                type="email"
                placeholder="youremail@gmail.com"
                onChange={handleOnChange}
              />
              <StyledInput
                name="password"
                type="password"
                placeholder="*********"
                onChange={handleOnChange}
              />
              <StyledButton className="btn">LET THE PARTY BEGIN</StyledButton>
            </StyledForm>
          </MainBox>
          <p style={{ fontSize: "30px", paddingTop: "40px" }}>
            Still not one of us? Register{" "}
            <Link style={{ color: "#53a8b6" }} to="/register">
              HERE
            </Link>
          </p>
        </LoginContainer>
      </>
    );
  }
};
