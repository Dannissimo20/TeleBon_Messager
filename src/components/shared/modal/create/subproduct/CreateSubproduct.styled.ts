import { styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 40px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  form {
    margin-top: 0;
  }
`;

export const Box = styled.div`
  width: 100%;

  &.form {
    display: flex;
    flex-direction: column;
    gap: 28px;
    button {
      width: fit-content;
      align-self: flex-end;
    }
  }
`;

export const FormItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
  }
  label {
  }
  input {
    padding-left: 0;
    border: none;
    height: 16px;
    color: #292f51;
    font-size: 16px;
    line-height: normal;
    font-weight: 600;
    &:focus::placeholder {
      opacity: 0;
    }
  }
  &.head {
    label {
      display: none;
    }
    input {
      color: #292f51;
      font-size: 32px;
      font-weight: 700;
      line-height: normal;
      border: none;
      &.active {
        border: none;
      }
      &::placeholder {
        opacity: 0.5;
      }
    }
  }
`;

export const ButtonInner = styled.div`
  display: flex;
  gap: 12px;
`;
