import {
  LoginContainer,
  MainBox,
  StyledHeader,
  StyledForm,
  StyledInput,
  StyledButton,
} from "../styles/StyledRegisterAndLogin";

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
  });
  const navigate = useNavigate();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", formData)
      .then((response) => {
        navigate("/login");
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <LoginContainer>
      <MainBox>
        <StyledHeader>
          <h2>
            <b>Are you sure you want to do this?</b>
          </h2>
          <p>Please enter your details below to register</p>
        </StyledHeader>
        <StyledForm onSubmit={onHandleSubmit}>
          <StyledInput
            name="email"
            type="email"
            placeholder="youremail@gmail.com"
            required
            onChange={handleOnChange}
          />
          <StyledInput
            name="name"
            type="text"
            placeholder="Name"
            required
            onChange={handleOnChange}
          />
          <StyledInput
            name="surname"
            type="text"
            placeholder="Surname"
            required
            onChange={handleOnChange}
          />
          <StyledInput
            name="password"
            type="password"
            placeholder="*********"
            required
            onChange={handleOnChange}
          />
          <StyledButton className="btn">REGISTER</StyledButton>
        </StyledForm>
      </MainBox>
      <p style={{ fontSize: "30px", paddingTop: "40px" }}>
        Already have an account? Login{" "}
        <Link style={{ color: "#53a8b6" }} to="/login">
          HERE
        </Link>
      </p>
    </LoginContainer>
  );
};
