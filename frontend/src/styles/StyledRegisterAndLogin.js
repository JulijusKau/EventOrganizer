import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 80vh;
`;

export const StyledInput = styled.input`
  width: 100%;
  margin: 10px 0px;
`;

export const StyledButton = styled.button`
  width: 100%;
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

export const StyledForm = styled.form`
  background-color: #53a8b6;
  padding: 20px;
  border-radius: 0px 0px 7.5px 7.5px;
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  align-items: center;
  text-align: center;
  background-color: #53a8b6;
  padding: 20px;
  width: 400px;
  border-radius: 7.5px 7.5px 0px 0px;
`;

export const MainBox = styled.div`
  width: 400px;
`;
