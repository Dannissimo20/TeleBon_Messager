import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 68px;
  width: 100%;
  max-width: 480px;
  color: ${(props) => props.theme.color.mainDark};
  h2 {
    text-align: center;
    font-size: 60px;
    font-weight: 700;
    line-height: 60px;

    &.first {
      margin-bottom: 48px;
    }
    &.second {
      margin-bottom: 12px;
      text-align: left;
    }
  }
  .descr {
    opacity: 0.5;
    font-weight: 600;
  }
  button {
    &:disabled {
      background-color: ${(props) => props.theme.color.mainLight};
      border-color: ${(props) => props.theme.color.mainLight};
      opacity: 0.5;
    }
  }
  .filials-descr {
    margin-bottom: 12px;
    font-weight: 600;
  }
  .filials-btns {
    gap: 12px;
    button {
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
      line-height: 16px;
      background-color: ${(props) => props.theme.color.secondaryMedium};
      &.active {
        background-color: ${(props) => props.theme.color.mainLight};
        color: ${(props) => props.theme.color.bg};
      }
    }
  }
  .filials-input {
    opacity: 0;
    visibility: hidden;
  }
`;
export const Colored = styled.span`
  color: ${(props) => props.theme.color.mainLight};
`;

export const Policy = styled.div`
  gap: 12px;
  input {
    flex-shrink: 0;
    border-radius: 4px;
    border: 2px solid rgba(41, 47, 81, 0.5);
    width: 20px;
    height: 20px;
  }
  p {
    font-size: 14px;
    color: rgba(41, 47, 81, 0.5);
  }
  a {
    color: ${(props) => props.theme.color.mainLight};
  }
`;
export const LoaderPosition = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
`;
