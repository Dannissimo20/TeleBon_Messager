import { keyframes, styled } from 'styled-components';

export const scaleIn = keyframes`
  0%{
    opacity: 0;
    transform: scale(0.5);
  }
  50%{
    opacity: .3;
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    button {
      margin-top: auto;
    }
  }
`;

export const FormItem = styled.div`
  display: flex;
  align-items: center;
  & > div {
    min-width: 300px;
    & > div {
      right: 7px;
    }
  }
  input[type='number'] {
    padding-right: 24px;
    padding-left: 12px;
  }
  input.error + label {
    opacity: 0;
  }
  &.service-type {
    align-items: flex-start;
    gap: 60px;
    & > div {
      min-width: auto;
    }
  }
  &.service-seats-count {
    flex-direction: column;
    gap: 12px;
    animation: ${scaleIn} 0.2s ease;
  }
  .service-seats-count-wrap {
    display: flex;
    flex-direction: column;
    gap: 24px;
    label {
      top: 12px;
      left: 12px;
      line-height: 16px;
      background-color: ${(props) => props.theme.color.bg};
    }
    input {
      padding-right: 24px;
      height: 42px;
      &.active + label,
      &:focus + label {
        top: -8px;
      }
      &.error + label {
        opacity: 0;
      }
    }
  }
  .service-seats-count-label {
    margin-bottom: 12px;
  }
  .simple.error svg {
    color: ${(props) => props.theme.color.danger};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  
  .input-check-wrap {
    display: flex;
    position: absolute;
    top: 0;
    left: -1px;
    width: 15px;
    height: 15px;
    border: 2px solid ${(props) => props.theme.color.secondaryMedium};
    border-radius: 50%;
  }
`;
export const ButtonInner = styled.div`
  display: flex;
  gap: 12px;
`;