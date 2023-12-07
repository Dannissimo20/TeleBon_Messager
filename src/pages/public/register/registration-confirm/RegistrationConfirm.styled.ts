import { styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const Logo = styled.div`
  max-width: 240px;

  svg {
    width: 100%;
  }
`;

export const Login = styled.div``;

export const TextCongrats = styled.div`
  margin-top: 40px;
  font-size: 32px;
`;

export const LinkAuth = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    display: flex;
    padding: 16px 32px;
    border-radius: 8px;
    border: 2px solid ${(props) => props.theme.color.mainLight};
    background: ${(props) => props.theme.color.mainLight};
    color: ${(props) => props.theme.color.bg};
    &:hover,
    &:focus {
      background: ${(props) => props.theme.color.mainLight}11;
      color: ${(props) => props.theme.color.mainLight};
    }
  }
`;
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
