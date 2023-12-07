import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 20px;
`;
export const Form = styled.form``;
export const Footer = styled.div`
  margin-top: 24px;
  button {
    margin-left: auto;
    gap: 12px;
    min-width: 240px;
  }
`;
export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 24px;
  input.simple {
    padding-left: 30px;
  }
  label.simple {
    left: 30px;
  }
  input {
    &:focus,
    &:active {
      & + label {
        left: 0;
      }
    }
  }
  div.simple {
    right: auto;
    left: 0;
    svg {
      width: 18px;
      height: 18px;
      color: ${(props) => props.theme.color.mainDark};
    }
  }
  .commonSelect__control {
    height: 42px;
  }
`;
export const Box = styled.div`
  display: grid;
  gap: 24px;
  padding: 24px 0;
`;
export const ProductName = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${(props) => props.theme.color.bg};
  background: ${(props) => props.theme.color.mainLight};
  border-radius: 8px;

  svg {
    margin-right: 12px;
  }
`;