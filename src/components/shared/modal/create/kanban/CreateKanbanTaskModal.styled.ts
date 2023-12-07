import { styled } from 'styled-components';
import { scaleIn } from '../service/sidebar/CreateServiceSidebar.styled';
import { checkAnim } from '../../../../../pages/private/product/styles/form-styles';


export const Wrapper = styled.div`
  .classificatorWrapper {
    animation: ${scaleIn} 0.3s ease;
  }
  .checked {
    align-items: center;
    justify-content: center;
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
  flex-direction: column;
  gap: 40px;
  & > div {
    width: 50%;
  }
`;

export const ButtonInner = styled.div`
  display: flex;
  gap: 12px;
`;
export const DescriptionTask = styled.textarea`
  border: 2px solid ${(props) => props.theme.color.mainLight};
  height: 150px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  padding: 19px;
  resize: none;
  align-items: center;
  &:focus{
    border: 2px solid ${(props) => props.theme.color.mainLight};
  }
`;

