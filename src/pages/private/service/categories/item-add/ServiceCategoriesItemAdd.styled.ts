import { styled } from 'styled-components';

export const ItemForm = styled.form`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  input {
    padding: 5px;
    border: 1px solid ${(props) => props.theme.color.bg};
    background-color: transparent;
    border-radius: 4px;
    color: ${(props) => props.theme.color.bg};
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    &::placeholder {
      color: ${(props) => props.theme.color.bg};
      opacity: 0.5;
    }
    &:focus::placeholder {
      opacity: 0;
    }
  }
  
  }
`;

export const SubmitBtn = styled.div`
  margin-left: auto;
  gap: 12px;
  button {
    border-color: ${(props) => props.theme.color.bg};
    color: ${(props) => props.theme.color.mainLight};
    background: ${(props) => props.theme.color.bg};
    gap: 12px;
    &:not([disabled]):hover {
      border-color: ${(props) => props.theme.color.bg};
      color: ${(props) => props.theme.color.bg};
      background: ${(props) => props.theme.color.success};
    }
  }
  .backButton {
    padding: 12px 28px;
    border-radius: 8px;
    border: 2px solid ${(props) => props.theme.color.bg};
    &:hover {
      border-color: ${(props) => props.theme.color.bg};
      color: ${(props) => props.theme.color.bg};
      background: ${(props) => props.theme.color.mainLight};
    }
  }
`;
