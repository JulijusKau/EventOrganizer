import { useEffect, useState } from "react";
import axios from "axios";
import {
  StyledLoadingCircle,
  StyledLoadingHeader,
  StyledMainDiv,
  StyledTableHeader,
  StyledUserTable,
  StyledHeading,
  StyledInsideDiv,
  StyledButton,
  StyledTableBody,
  StyledTableRow,
} from "../styles/StyledAttendeeListAndRow";
import { AttendeeRow } from "./AttendeeRow";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "./DeleteModal";

export const AttendeeList = () => {
  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);

  const navigate = useNavigate();
  const [attendees, setAttendees] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentEmployee, setCurrentEmployee] = useState();
  const [loadLimit, setLoadLimit] = useState(5);
  const [shownAttendees, setShownAttendees] = useState();
  const [theRealClown, setTheRealClown] = useState();

  const token = localStorage.getItem("token");

  const removeAttendee = (clown_id) => {
    console.log("clown id " + clown_id);
    axios
      .delete(`http://localhost:5000/clowns/${clown_id}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then(() => {
        console.log("Delete successful");
        const del = attendees.filter(
          (attendee) => clown_id !== attendee.clown_id
        );
        setAttendees(del);
      });
  };

  axios
    .get("http://localhost:5000/token/verify", {
      headers: {
        authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      setCurrentEmployee(response.data.employee_id);
      console.log(response.data.employee_id);
    });

  const canYouRemoveAttendee = (employee_id) => {
    console.log(employee_id);
    if (currentEmployee === employee_id) {
      setModalShow(true);
    } else {
      alert("Are you sure you are responsible for this clown?");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/clowns?limit=${loadLimit}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((attendees) => {
        setAttendees(attendees);
        setIsLoading(false);
        setShownAttendees(attendees.length);
      });
  }, [token, loadLimit]);

  const showMoreAttendees = () => {
    if (loadLimit <= shownAttendees) {
      setLoadLimit(loadLimit + 5);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "500px" }}
      >
        <StyledLoadingCircle />
        <StyledLoadingHeader>
          Please wait while the information loads
        </StyledLoadingHeader>
      </div>
    );
  }
  return (
    <StyledMainDiv>
      <StyledHeading>Party People</StyledHeading>
      <StyledInsideDiv>
        <StyledUserTable>
          <StyledTableBody>
            <StyledTableRow>
              <StyledTableHeader>First name</StyledTableHeader>
              <StyledTableHeader>Surname</StyledTableHeader>
              <StyledTableHeader>Email</StyledTableHeader>
              <StyledTableHeader>Phone number</StyledTableHeader>
              <StyledTableHeader></StyledTableHeader>
            </StyledTableRow>
          </StyledTableBody>
          {attendees.map((attendee) => (
            <AttendeeRow
              key={attendee.clown_id}
              name={attendee.name}
              surname={attendee.surname}
              email={attendee.email}
              phone_number={attendee.phone_number}
              onClickDeleteFunction={() => {
                canYouRemoveAttendee(attendee.employee_id);
                setTheRealClown(attendee.clown_id);
                console.log("employee id " + attendee.employee_id);
                console.log("clown id " + attendee.clown_id);
              }}
              childComponent={
                <DeleteModal
                  showModal={modalShow}
                  handleModalClose={() => {
                    handleModalClose();
                  }}
                  handleModalConfirmation={() => {
                    removeAttendee(theRealClown);
                    setModalShow(false);
                  }}
                />
              }
            />
          ))}
        </StyledUserTable>

        <StyledButton
          onClick={() => {
            navigate("/joinus");
          }}
        >
          Register an attendee
        </StyledButton>
        <StyledButton
          onClick={() => {
            showMoreAttendees();
          }}
        >
          {loadLimit > shownAttendees
            ? "All attendees are present"
            : "Show more"}
        </StyledButton>
      </StyledInsideDiv>
    </StyledMainDiv>
  );
};
