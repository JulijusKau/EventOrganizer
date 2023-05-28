import { Link, useNavigate } from "react-router-dom";
import { StyledButton } from "../styles/StyledAttendeeListAndRow";
import {
  LoginContainer,
  MainBox,
  StyledForm,
  StyledHeader,
  StyledInput,
} from "../styles/StyledRegisterAndLogin";
import axios from "axios";
import { useState } from "react";

export const RegisterAClown = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState("");

  const formData = {
    name: name,
    surname: surname,
    email: email,
    phone_number: phoneNumber,
    employee_id: currentEmployee,
  };

  axios
    .get("http://localhost:5000/token/verify", {
      headers: {
        authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      setCurrentEmployee(response.data.employee_id);
    });

  const onHandleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/clowns", formData, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then(() => {
        navigate("/attendees");
      })
      .catch((err) => {
        alert("Please enter all the fields");
        console.log(err);
      });
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onSurnameChange = (e) => {
    setSurname(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <LoginContainer style={{ marginTop: "50px" }}>
      <MainBox>
        <StyledHeader>
          <h2>
            <b>The more the merrier</b>
          </h2>
          <p style={{ fontSize: "20px" }}>Enter the attendee's details</p>
        </StyledHeader>
        <StyledForm
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={onHandleSubmit}
        >
          <StyledInput
            name="name"
            type="text"
            placeholder="Attendee's name"
            onChange={onNameChange}
          />
          <StyledInput
            name="surname"
            type="text"
            placeholder="Attendee's surname"
            onChange={onSurnameChange}
          />
          <StyledInput
            name="email"
            type="email"
            placeholder="Attendee's email"
            onChange={onEmailChange}
          />
          <StyledInput
            name="phone_number"
            type="text"
            placeholder="Attendee's phone number"
            onChange={onPhoneNumberChange}
          />
          <StyledButton className="btn">See you at the event!</StyledButton>
          <StyledButton className="btn">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/attendees"
            >
              On second thought
            </Link>
          </StyledButton>
        </StyledForm>
      </MainBox>
    </LoginContainer>
  );
};
