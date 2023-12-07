import { styled } from 'styled-components';
import { checkAnim } from '../../../../../pages/private/product/styles/form-styles';
import { scaleIn } from './sidebar/CreateServiceSidebar.styled';

export const Wrapper = styled.div`
  
  border-radius: 8px;
  form {
    margin-top: 40px;
  }
  .checked {
    align-items: center;
    p {
      font-size: 16px;
      color: rgba(108, 110, 124, 1);
    }
    .checkbox-container {
      display: inline-block;
      position: relative;
      padding-left: 26px;
      margin-bottom: 19px;
      cursor: pointer;
      font-size: 16px;
      user-select: none;
      .custom-checkbox {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &.green:checked ~ .checkmark {
          background-color: ${(props) => props.theme.color.mainLight};
        }
        &:checked ~ .checkmark {
          background-color: ${(props) => props.theme.color.mainLight};
        }
        &:checked ~ .checkmark:after {
          display: block;
        }
        &:checked ~ .checkmark:after {
          animation: ${checkAnim} 0.2s forwards;
        }
      }
      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #eee;
        border-radius: 4px;
        transition: background-color 0.3s;
        &:after {
          content: '';
          position: absolute;
          display: none;
          left: 7px;
          top: 3px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      }
    }
  }
  .subproductCalculate{
    animation: ${scaleIn} .3s ease;
    span{
      color: ${(props) => props.theme.color.secondaryDark};
    }
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
  gap: 40px;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
  }
  label {
  }
  input {
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
