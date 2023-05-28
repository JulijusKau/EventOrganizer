import {
  StyledTableBody,
  StyledTableData,
  StyledTableRow,
  StyledDeleteButton,
} from "../styles/StyledAttendeeListAndRow";

export const AttendeeRow = ({
  name,
  surname,
  email,
  phone_number,
  onClickDeleteFunction,
  childComponent,
}) => {
  return (
    <StyledTableBody>
      <StyledTableRow>
        <StyledTableData>{name}</StyledTableData>
        <StyledTableData>{surname}</StyledTableData>
        <StyledTableData>{email}</StyledTableData>
        <StyledTableData>{phone_number}</StyledTableData>
        <StyledTableData>
          <StyledDeleteButton onClick={onClickDeleteFunction}>
            delete
          </StyledDeleteButton>
        </StyledTableData>
        {childComponent}
      </StyledTableRow>
    </StyledTableBody>
  );
};
