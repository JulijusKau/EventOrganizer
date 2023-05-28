import {
  StyledHeading,
  StyledImage,
  StyledMainDiv,
} from "../styles/StyledHomePage";

import groupofpeople from "../assets/groupofpeople.jpg";

export const HomePage = () => {
  return (
    <StyledMainDiv>
      <StyledHeading>WELCOME TO THE GRAND EVENT</StyledHeading>
      <StyledImage src={groupofpeople} />
    </StyledMainDiv>
  );
};
