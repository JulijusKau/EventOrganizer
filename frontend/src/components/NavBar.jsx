import { useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContext";
import {
  StyledLink,
  StyledLogoutButton,
  StyledNavBar,
  StyledUnorderedList,
} from "../styles/StyledNavBar";

export const NavBar = ({ onLogout }) => {
  const { isSignedIn } = useContext(AuthenticationContext);

  return (
    <StyledNavBar>
      <StyledUnorderedList>
        {isSignedIn ? (
          <>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/attendees">Attendees</StyledLink>
            <StyledLink to="/profile">Profile</StyledLink>
          </>
        ) : (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/register">Register</StyledLink>
          </>
        )}
      </StyledUnorderedList>
      {isSignedIn && (
        <StyledLogoutButton onClick={onLogout}>LOGOUT</StyledLogoutButton>
      )}
    </StyledNavBar>
  );
};
