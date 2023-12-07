import styled from 'styled-components';
import Dropdown from 'react-dropdown';

export const InputContainer = styled.div`
  position: relative;
  min-width: 240px;
`;
export const Input = styled(Dropdown)`
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  box-shadow: none;
  /* position: absolute; */
  border-radius: 8px;
  transition: 0.1s ease;
  height: 60px;
  width: 100%;
  padding: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  flex-direction: column;
  outline: none;
  color: ${(props) => props.theme.color.mainDark};
  &.is-open {
    border-color: ${(props) => props.theme.color.mainLight};
    border-radius: 8px;
    & + label {
      top: -8px;
      color: ${(props) => props.theme.color.mainLight};
      background: ${(props) => props.theme.color.bg};
      line-height: 18px;
    }
    & ~ div {
      svg {
        color: ${(props) => props.theme.color.mainLight};
      }
    }
  }
  .Dropdown-control {
    width: 100%;
    box-shadow: none;
    border: none;
    border-radius: 8px;
    display: flex;
    padding: 8px 20px;
    justify-content: center;
    flex-direction: column;
    height: 60px;
    .Dropdown-arrow-wrapper {
      position: absolute;
      right: 11px;
      top: 22%;
      width: fit-content;
    }
    .Dropdown-placeholder {
      display: none;
      &.is-selected {
        display: block;
        position: relative;
      }
    }
    &.Dropdown-menu {
      height: 180px;
      width: 100%;
      outline: none;
      margin-top: 2px;
      border: 2px solid ${(props) => props.theme.color.mainLight};
      border-top: none;
    }
  }

  &.active {
    border-color: ${(props) => props.theme.color.mainLight};
  }

  &.active error,
  &.error {
    border-color: ${(props) => props.theme.color.danger};
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
    }
    div {
      span {
        border-color: ${(props) => props.theme.color.mainLight} transparent transparent;
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
    height: 42px;
    padding-left: 0;
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
  }
  &.error {
    border: 2px solid ${(props) => props.theme.color.danger};
  }
`;
export const Label = styled.label`
  position: absolute;
  left: 20px;
  font-size: 16px;
  top: 0;
  pointer-events: none;
  line-height: 60px;
  z-index: 2;
  transition: 0.1s;
  padding: 0 8px;
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
    padding: 0;
    line-height: 42px;
    left: 0;
    &.active {
      top: -8px;
      color: ${(props) => props.theme.color.mainLight};
      background: ${(props) => props.theme.color.bg};
      line-height: 18px;
      font-size: 10px;
    }
  }
`;

export const ErrorText = styled.p`
  position: absolute;
  top: -18px;
  right: 20px;
  font-size: 14px;
  color: ${(props) => props.theme.color.danger};
`;
