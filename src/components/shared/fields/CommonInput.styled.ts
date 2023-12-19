import styled from 'styled-components';

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
export const Input = styled.input`
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
  &[type='date']::-webkit-calendar-picker-indicator {
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  &::-webkit-datetime-edit-year-field,
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-day-field {
    color: transparent;
  }

  &.active {
    border-color: ${(props) => props.theme.color.mainLight};
  }

  &.active error,
  &.error {
    border-color: ${(props) => props.theme.color.danger};
    &:focus + label {
      color: ${(props) => props.theme.color.danger};
    }
  }

  &:focus,
  &.active {
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
  }
`;
export const Label = styled.label`
  position: absolute;
  left: 20px;
  pointer-events: none;
  font-size: 16px;
  line-height: 60px;

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
  //pointer-events: none;
  right: 21px;
  width: 20px;
  & .age {
    padding: 4px;
    background-color: ${(props) => props.theme.color.bg};
    position: absolute;
    top: -32px;
    right: -10px;
    color: ${(props) => props.theme.color.mainLight};
    white-space: nowrap;
    &.record {
      top: 0;
      right: -24px;
    }
  }

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
    .age {
      opacity: 0;
    }
  }
`;

export const ErrorText = styled.p`
  position: absolute;
  top: 100%;
  left: 0px;
  background: #fff;
  padding: 0 4px;
  font-size: 16px;
  color: ${(props) => props.theme.color.danger};
`;
