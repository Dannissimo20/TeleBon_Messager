import styled from 'styled-components';
import { scaleIn } from '../../../components/shared/modal/create/service/sidebar/CreateServiceSidebar.styled';


export const WrapperPassword = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: ${(props) => props.theme.color.mainDark};
  max-width: 580px;
`;

export const LogoPasswordFlex = styled.a`
  display: flex;
  max-width: 84px;

  svg {
    width: 100%;
  }
`;
export const LogoPasswordNoFlex = styled.div`
  max-width: 84px;

  svg {
    width: 100%;
  }
`;

export const Login = styled.div`
  margin-top: auto;
`;

export const SuccessText = styled.div`
  margin-top: 13vw;
  margin-bottom: 48px;
  font-size: 60px;
  font-weight: 700;
  line-height: 60px;
  text-align: center;
`;
export const RecoveryText = styled.h2`
  margin-top: 13vw;
  margin-bottom: 48px;
  font-size: 60px;
  font-weight: 700;
  line-height: 60px;
`;

export const TopWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${scaleIn} 0.3s ease;
`;

export const LinkWrap = styled.div`
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 26px;
    border: 2px solid ${(props) => props.theme.color.mainLight};
    border-radius: 8px;
    color: ${(props) => props.theme.color.mainLight};
    font-weight: 600;
    width: fit-content;
    &:hover,
    &:focus {
      color: ${(props) => props.theme.color.success};
      border-color: ${(props) => props.theme.color.success};
    }
  }
`;

export const FormResetPassword = styled.form`
  width: 100%;
  & > div {
    width: 100%;
    margin-bottom: 60px;
  }
  button {
    height: 56px;
    &:hover,
    &:focus {
      color: ${(props) => props.theme.color.mainLight};
    }
    &:disabled {
      border-color: ${(props) => props.theme.color.mainLight};
      color: ${(props) => props.theme.color.bg};
      cursor: not-allowed;
      opacity: 0.5;
      &:hover,
      &:focus {
        background-color: ${(props) => props.theme.color.mainLight};
      }
    }
    &:not([disabled]) {
      &:hover,
      &:focus {
        color: ${(props) => props.theme.color.mainLight};
      }
    }
  }
`;
export const FormNewPassword = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;
  width: 100%;
  input {
    padding-right: 40px;
  }
  & > div {
    width: 100%;
    div.error + p {
      top: -21px;
    }
  }
  button {
    height: 60px;
    &:hover,
    &:focus {
      color: ${(props) => props.theme.color.mainLight};
    }
    &:disabled {
      border-color: ${(props) => props.theme.color.mainLight};
      color: ${(props) => props.theme.color.bg};
      cursor: not-allowed;
      opacity: 0.5;
      &:hover,
      &:focus {
        background-color: ${(props) => props.theme.color.mainLight};
      }
    }
    &:not([disabled]) {
      &:hover,
      &:focus {
        color: ${(props) => props.theme.color.mainLight};
      }
    }
  }
`;
