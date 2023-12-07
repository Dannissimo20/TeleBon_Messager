import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Box = styled.div`
  button {
    gap: 12px;
  }
  &.buttonWrap {
    display: flex;
    justify-content: center;
    margin-top: 10vh;
  }
`;
export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const ItemForm = styled.form`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  input {
    border: 1px solid ${(props) => props.theme.color.bg};
    background-color: transparent;
    border-radius: 4px;
    color: ${(props) => props.theme.color.bg};
    height: 22px;
    &::placeholder {
      color: ${(props) => props.theme.color.bg};
    }
    &:focus {
      outline: 1px solid ${(props) => props.theme.color.bg};
    }
  }
  .customInput {
    border-bottom: 1px solid ${(props) => props.theme.color.bg};
    color: ${(props) => props.theme.color.bg};
    &:focus {
      outline: 1px solid ${(props) => props.theme.color.bg};
    }
  }
  .workHoursRangeWrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;
export const ItemNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const SubmitBtn = styled.div`
  margin-left: auto;
  gap: 12px;
  button {
    border-color: ${(props) => props.theme.color.bg};
    color: ${(props) => props.theme.color.mainLight};
    background: ${(props) => props.theme.color.bg};
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