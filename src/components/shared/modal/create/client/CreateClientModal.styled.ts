import styled from 'styled-components';
import { PageTitle } from '../../../../../utils/styleUtils';

export const Wrapper = styled.div``;
export const Column = styled.div`
  flex-grow: 1;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  margin-top: 20px;
  .sex-input-wrap {
    gap: 40px;
    label {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    input {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      border: 2px solid #555;
      border-radius: 50%;
      position: relative;
      width: 20px;
      height: 20px;
      outline: none;
      &:checked {
        background: ${(props) => props.theme.color.mainLight};
        border-color: ${(props) => props.theme.color.mainLight};
      }
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${(props) => props.theme.color.bg};
      }
      transition: background 0.3s ease, border-color 0.3s ease;
    }
  }
  .messangers {
    gap: 40px;
    input {
      opacity: 0;
      width: 48px;
      height: 48px;
      z-index: 1;
      cursor: pointer;
    }
    label {
      position: relative;
      display: flex;
    }
    button {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border: 2px solid ${(props) => props.theme.color.secondaryDark};
      border-radius: 8px;
      color: ${(props) => props.theme.color.secondaryDark};
      &.telegram-btn{
        
      }
      &.whatsapp-btn{
        
      }
      &.viber-btn{
        
      }
      svg {
        width: 24px;
        height: 24px;
        pointer-events: none;
      }
      &.active {
        background: ${(props) => props.theme.color.mainLight};
        &.telegram-btn{
          background: ${(props) => props.theme.color.mainLight};
          border: 2px solid ${(props) => props.theme.color.mainLight};
        }
        &.whatsapp-btn{
          background: ${(props) => props.theme.color.success};
          border: 2px solid ${(props) => props.theme.color.success};
        }
        &.viber-btn{
          background: rgba(155, 81, 224, 1);
          border: 2px solid rgba(155, 81, 224, 1);
        }
        svg {
          color: ${(props) => props.theme.color.bg};
        }
      }
    }
  }
`;
export const Box = styled.div`
  width: 100%;
  &.form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;
export const ButtonInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 18px;
    height: 18px;
  }
  span {
    margin-left: 12px;
  }
`;
export const Title = styled(PageTitle)`
  margin: 0;
`;
