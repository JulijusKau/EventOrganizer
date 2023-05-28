import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledNavBar = styled.nav`
  padding: 10px 100px;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const StyledUnorderedList = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 10%;
`;

export const StyledLink = styled(Link)`
  display: block;
  position: relative;
  color: white;
  font-size: 30px;
  list-style: none;
  text-decoration: none;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.15em;
    background-color: white;
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
  }

  &:hover {
    cursor: pointer;
    color: white;
  }

  &:hover::after,
  &:focus::after {
    opacity: 1;
    transform: translate3d(0, 0.2em, 0);
  }
`;

export const StyledLogoutButton = styled.button`
  height: 50px;
  width: 150px;
  text-decoration: none;
  font-size: 25px;
  color: white;
  background-color: #a2a8d3;
  border-radius: 10px;

  &:hover {
    background-color: #38598b;
  }

  &:active {
    border-bottom-width: 0.1rem;
    border-top-width: 0.5rem;
  }
`;
