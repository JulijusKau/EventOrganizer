import { useEffect, useState } from "react";
import {
  StyledInformationParagraph,
  StyledProfileDiv,
  StyledProfileImage,
  StyledWelcomeHeading,
} from "../styles/StyledLoggedInProfile";
import "../styles/JustForTheProfile.css";

export const LoggedInProfile = () => {
  const [currentEmployeeId, setCurrentEmployeeId] = useState();
  const [currentEmployeeName, setCurrentEmployeeName] = useState("");
  const [currentEmployeeSurname, setCurrentEmployeeSurname] = useState("");
  const [currentEmployeeAddedAttendees, setCurrentEmployeeAddedAttendees] =
    useState("");
  const [currentEmployeePicture, setCurrentEmployeePicture] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  const getEmployeeId = async () => {
    await fetch(`http://localhost:5000/token/verify`, {
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((employeeId) => {
        setCurrentEmployeeId(employeeId.employee_id);
      });
  };

  const getEmployeeData = async () => {
    await fetch(`http://localhost:5000/employees/${currentEmployeeId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((employee) => {
        setCurrentEmployeeName(employee[0].name);
        setCurrentEmployeeSurname(employee[0].surname);
      });
  };

  const getEmployeeClowns = async () => {
    await fetch(`http://localhost:5000/specificClowns/${currentEmployeeId}}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentEmployeeAddedAttendees(data.length);
        setIsLoading(false);
      });
  };

  const getEmployeePicture = async () => {
    await fetch("https://api.github.com/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrentEmployeePicture(data[currentEmployeeId].avatar_url);
      });
  };

  useEffect(() => {
    getEmployeeId();
    if (currentEmployeeId) {
      getEmployeePicture();
      getEmployeeData();
      getEmployeeClowns();
    }
  });

  if (isLoading) {
    return <div>Please wait while the data loads...</div>;
  }
  return (
    <StyledProfileDiv>
      <button className="coolButton">
        {" "}
        <StyledProfileImage src={currentEmployeePicture} />
      </button>

      <StyledWelcomeHeading>
        Welcome, {currentEmployeeName} {currentEmployeeSurname}
      </StyledWelcomeHeading>
      <StyledInformationParagraph>
        How are you feeling tonight?
      </StyledInformationParagraph>
      <StyledInformationParagraph>
        Added attendees:{" "}
        <b style={{ fontSize: "50px" }}>{currentEmployeeAddedAttendees}</b>
      </StyledInformationParagraph>
    </StyledProfileDiv>
  );
};
