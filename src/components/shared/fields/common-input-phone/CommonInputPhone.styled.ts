import styled from 'styled-components';
import Input from 'react-phone-number-input/input';

export const InputContainer = styled.div`
  position: relative;
  min-width: 240px;
  .errorIcon {
    position: absolute;
    top: 33%;
    right: 36px;
    transform: translateY(-43%);
    svg {
      color: ${(props) => props.theme.color.danger} !important;
    }
  }
`;
export const InputPhone = styled(Input)`
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  /* position: absolute; */
  border-radius: 8px;
  height: 60px;
  width: 100%;
  padding: 0 19px;
  background: transparent;
  border-style: solid;
  outline: none;
  color: ${(props) => props.theme.color.mainDark};

  &::-webkit-datetime-edit-year-field,
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-day-field {
    color: transparent;
  }

  &.active {
    border-color: ${(props) => props.theme.color.mainLight};
  }

  &.hide {
    color: transparent;
  }
  &:focus,
  &.active {
    &.hide {
      color: ${(props) => props.theme.color.secondaryDark};
    }
    border-color: ${(props) => props.theme.color.mainLight};
    &[type='date'] {
      &::-webkit-datetime-edit-year-field,
      &::-webkit-datetime-edit-month-field,
      &::-webkit-datetime-edit-day-field {
        color: ${(props) => props.theme.color.mainDark};
      }
    }
    & + label {
      top: -8px;
      color: ${(props) => props.theme.color.mainLight};
      background: ${(props) => props.theme.color.bg};
      line-height: 18px;
      padding: 0 19px;
      pointer-events: none;
    }
    & ~ div {
      svg {
        color: ${(props) => props.theme.color.mainLight};
      }
    }
  }
  &:disabled {
    opacity: 0.3;
    /* background: ${(props) => props.theme.color.secondaryMedium} */
  }
  &.simple {
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
    border-radius: 0;
    height: 56px;
    &:focus {
      border: none;
      border-bottom: 2px solid ${(props) => props.theme.color.mainLight};
      & + label {
        font-size: 10px;
      }
    }
    &.active {
      border-bottom: 2px solid ${(props) => props.theme.color.mainLight};
    }
    &.active error,
    &.error {
      border: none;
      border-bottom: 2px solid ${(props) => props.theme.color.danger};
    }
  }
  &.error {
    border: 2px solid ${(props) => props.theme.color.danger};
    &:focus + label {
      color: ${(props) => props.theme.color.danger};
    }
  }
`;

export const Label = styled.label`
  position: absolute;
  font-size: 16px;
  pointer-events: none;
  line-height: 60px;
  left: 20px;
  transition: 0.1s;
  color: ${(props) => props.theme.color.secondaryDark};

  &.active {
    top: -8px;
    color: ${(props) => props.theme.color.mainLight};
    background: ${(props) => props.theme.color.bg};
    line-height: 18px;
  }
  &.active.error,
  &.error {
    color: ${(props) => props.theme.color.danger};
  }
  &.simple {
    line-height: 42px;
    left: 0;
    background: ${(props) => props.theme.color.bg};
    top: 6px;
    z-index: 2;
    padding: 0px 19px;

    &.active {
      top: -8px;
      color: ${(props) => props.theme.color.mainLight};
      background: ${(props) => props.theme.color.bg};
      line-height: 18px;
      font-size: 10px;
    }
    &.active.error,
    &.error {
      color: ${(props) => props.theme.color.danger};
    }
  }
`;
export const IconContainer = styled.div`
  position: absolute;
  top: calc(50% - 10px);
  right: 21px;
  width: 20px;
  svg {
    color: ${(props) => props.theme.color.secondaryDark};
  }
  &.active {
    svg {
      color: ${(props) => props.theme.color.mainLight};
    }
  }
  &.active.error,
  &.error {
    svg {
      color: ${(props) => props.theme.color.danger};
    }
  }
`;
export const ErrorText = styled.p`
  position: absolute;
  top: 100%;
  left: 20px;
  font-size: 16px;
  color: ${(props) => props.theme.color.danger};
`;
