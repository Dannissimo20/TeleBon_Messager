import styled from 'styled-components';
import { scaleIn } from '../../../../../components/shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

export const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalContainer = styled.div`
  //position: relative;
  svg {
    color: rgba(108, 110, 124, 1);
  }
  .payment {
    justify-content: space-between;
    margin-top: 20px;
    div {
      div {
        width: 100%;
        input {
          height: 56px;
        }
        input,
        label {
          padding-top: 3px;
          padding-left: 19px;
          padding-right: 19px;
        }
      }
    }
  }
  .btn {
    height: fit-content;
    div {
      height: 20px;
    }
  }
  .Dropdown-root {
    .Dropdown-arrow {
      top: 13px;
      background-image: url('/dropdownarrow.svg') !important;
      background-size: 70%;
      background-repeat: no-repeat;
      background-position: center;
      transition: 0.3s ease;
    }
  }
  .Dropdown-menu {
    &.commonSelect__menu {
      margin-top: 10px;
      border: none;
      box-shadow: 0px 4px 14px 0px rgba(41, 47, 81, 0.08);
      border-radius: 8px;
      padding: 12px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 6px;
        border-radius: 8px;
      }
      &::-webkit-scrollbar-track {
        background: ${(props) => props.theme.color.secondaryMedium};
        border-radius: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.color.secondaryDark};
        border-radius: 20px;
      }
      &:before {
        content: '';
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        z-index: 3;
        background: ${(props) => props.theme.color.bg};
        width: 15px;
        height: 15px;
      }
      .Dropdown-option {
        transition: 0.3s ease;
        &.is-selected {
          background: rgba(73, 111, 255, 0.1);
          border-radius: 8px;
        }
        &:hover {
          background: rgba(73, 111, 255, 0.1);
          border-radius: 8px;
        }
        padding: 12px;
      }
    }
  }
  z-index: 4;
  max-height: 96vh;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.secondaryMedium};
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color.secondaryDark};
    border-radius: 20px;
  }
  animation: ${scaleIn} 0.2s ease;
  max-width: 800px;
  width: 100%;
  background: ${(props) => props.theme.color.bg};
  padding: 40px 60px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  .stageWrapper {
    gap: 20px;
    align-items: center;
    div {
      display: flex;
      padding: 12px 14px;
      gap: 9px;
      align-items: center;
      border-radius: 8px;
      color: ${(props) => props.theme.color.secondaryDark};
      h3 {
        font-size: 16px;
        font-weight: 600;
      }
      &:last-child {
        svg {
          transform: rotate(45deg);
        }
      }
      &.active {
        background: rgba(237, 241, 255, 1);
        color: ${(props) => props.theme.color.mainLight};
        svg {
          color: ${(props) => props.theme.color.mainLight};
        }
      }
    }
  }
  h2 {
    font-weight: 600;
    font-size: 24px;
    margin: 40px 0;
  }
  .title {
    margin-top: 0;
  }
  p {
    font-size: 16px;
  }
  .heading {
    display: flex;
    flex-direction: column;
    .title {
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .closeButton {
        svg {
          transition: 0.3s ease;
          transform: rotate(45deg);
        }
        &:hover {
          svg {
            color: ${(props) => props.theme.color.mainLight};
          }
        }
      }
      h2 {
        margin: 0;
      }
    }
  }
  .recordingType {
    display: flex;
    flex-direction: column;
    gap: 20px;
    > div {
      display: grid;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      grid-template-columns: 1fr 13fr;
      &.active {
        color: ${(props) => props.theme.color.mainLight};
        animation: ${scaleIn} 0.3s ease;
        background: rgba(237, 241, 255, 1);
      }
      > div {
        width: 18px;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      h3 {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
  .btns {
    display: flex;
    gap: 40px;
    height: 56px;
    margin-left: auto;
  }
  .confirmation {
  }
  .react-datepicker-popper {
    z-index: 3;
  }
  .react-datepicker__month-container {
    position: relative;
    z-index: 4;
  }
  .dateWrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dateInput {
      display: flex;
      width: 320px;
      position: relative;
      svg {
        right: 19px;
      }
      .react-datepicker {
        box-shadow: 0px 4px 14px 0px rgba(41, 47, 81, 0.08);
        .react-datepicker__header {
          border: none;
          background-color: rgba(73, 111, 255, 0.1) !important;
        }
        .react-datepicker__navigation.react-datepicker__navigation--previous,
        .react-datepicker__navigation.react-datepicker__navigation--next {
          display: none !important;
        }
      }
      input,
      .react-datepicker-ignore-onclickoutside {
        font-weight: 600;
        padding: 12px;
        padding-left: 19px;
        width: 320px;
        transition: background 0.2s ease;
        border: none;
        border-bottom: 2px solid ${(props) => props.theme.color.mainLight};
        &:focus-within {
          outline: none;
          width: 320px;
          border-bottom: 2px solid ${(props) => props.theme.color.mainLight};
        }
      }
    }
    .dateInputTime {
      display: flex;
      gap: 12px;
      font-size: 16px;
      width: 100%;
      > div {
        padding: 12px 0;
        position: relative;
        input {
          width: 100%;
          padding-left: 19px;
          font-weight: 600;
        }
      }

      .react-datepicker__time,
      .react-datepicker__time-box {
        width: 115px !important;
      }
      .react-datepicker__time {
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0px 4px 14px 0px rgba(41, 47, 81, 0.08);
        border: none !important;
      }
      .react-datepicker__time-list-item {
        font-size: 16px;
        height: 42px !important;
        display: flex;
        font-weight: 600;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin: 0 12px;
        &:hover {
          background: rgba(73, 111, 255, 0.1) !important;
        }
        &.react-datepicker__time-list-item--selected {
          background: rgba(73, 111, 255, 0.1) !important;
          color: ${(props) => props.theme.color.mainDark} !important;
        }
      }
      .react-datepicker__time-box {
        width: 133px !important;
      }
      .react-datepicker__month-container,
      .react-datepicker__input-time-container,
      .react-datepicker__navigation,
      .react-datepicker__navigation--next,
      .react-datepicker__header.react-datepicker__header--time,
      react-datepicker__navigation--next--with-time,
      .react-datepicker__navigation react-datepicker__navigation--previous {
        display: none;
      }
      .react-datepicker__time-container,
      .react-datepicker__time-container.react-datepicker__time.react-datepicker__time-box {
        max-width: 115px !important;
        width: 100% !important;
        box-shadow: 0px 4px 14px 0px rgba(41, 47, 81, 0.08);
        border: none;
        outline: none;
      }
      .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::before,
      .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::after {
        border-bottom-color: ${(props) => props.theme.color.bg};
      }
      .react-datepicker__time-container {
        *::-webkit-scrollbar-track {
          width: 1px !important;
        }
      }
      .react-datepicker__tab-loop {
        position: absolute;
        left: 0;
        top: 0;
      }
      input {
        padding: 12px 0 11px 19px !important;
        height: 56px;
        width: 100%;
        transition: background 0.2s ease;
        border: none;
        border-bottom: 2px solid ${(props) => props.theme.color.mainLight};
        &:focus-within {
          outline: none;
          width: 100%;
          border-bottom: 2px solid ${(props) => props.theme.color.mainLight};
        }
      }
    }
  }
  h4 {
    margin: 20px 0;
  }
  .formElement {
    position: relative;
    align-items: center;
    width: 100%;
    height: 56px;
    .activeCLassificator {
      position: absolute;
      color: #fff;
      padding: 6px;
      font-size: 14px;
      div {
        position: absolute;
        background: ${(props) => props.theme.color.mainLight};
        color: #fff;
        top: -40px;
        padding: 4px 6px;
        font-size: 12px;
        border-radius: 8px;
        width: fit-content;
        left: 150px;
      }
    }
    .classificator {
      position: absolute;
      top: 18px;
      right: 50px;
      width: fit-content;
      > div {
        cursor: pointer;
        svg {
          transition: 0.3s ease;
        }
        &.active {
          svg {
            transform: scale(1.2);
            color: ${(props) => props.theme.color.mainLight};
          }
        }
      }
      .classificatorList {
        background: #fff;
        padding: 5px;
        border: 2px solid ${(props) => props.theme.color.mainLight};
        position: relative;
        border-radius: 8px;
        border-top-right-radius: 0;
        animation: ${scaleIn} 0.3s ease;
        display: flex;
        flex-direction: column;
        gap: 10px;
        right: 43px;
        top: 20px;
        z-index: 3;
        width: fit-content;
        > button {
          padding: 6px;
          border-radius: 8px;
          font-size: 12px;
          padding: 4px;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
    .selectedService {
      .Dropdown-menu {
        &.commonSelect__menu {
          margin-top: 10px;
          border: none;
          box-shadow: 0px 4px 14px 0px rgba(41, 47, 81, 0.08);
          border-radius: 8px;
          padding: 12px;
          overflow: visible;
          &:before {
            content: '';
            position: absolute;
            top: -6px;
            left: 50%;
            transform: translateX(-50%) rotate(45deg);
            z-index: 3;
            background: ${(props) => props.theme.color.bg};
            width: 15px;
            height: 15px;
          }
          .Dropdown-option {
            transition: 0.3s ease;
            &.is-selected {
              background: rgba(73, 111, 255, 0.1);
              border-radius: 8px;
            }
            &:hover {
              background: rgba(73, 111, 255, 0.1);
              border-radius: 8px;
            }
            padding: 12px;
          }
        }
        &.is-open {
          .Dropdown-arrow {
            width: 100px;
          }
        }
      }
    }
    &.error {
      svg,
      label {
        color: ${(props) => props.theme.color.danger};
      }
      input {
        border-color: ${(props) => props.theme.color.danger};
      }
      span {
        position: absolute;
        bottom: -40%;
        width: 100%;
        color: ${(props) => props.theme.color.danger};
      }
      .errorIcon {
        position: absolute;
        top: 18px;
        right: 38px;
      }
    }

    .Dropdown-control.commonSelect__control {
      display: flex;
      height: 56px;
      align-items: center;
      border-color: ${(props) => props.theme.color.mainLight};
      padding-left: 19px;
    }

    > div {
      width: 100%;
      input {
        width: 100%;
        height: 56px;
        padding-left: 19px;
        padding-top: 8px;
      }
      ,
      label {
        padding-left: 19px;
        padding-top: 3px;
      }
    }
    svg {
      position: absolute;
      z-index: 1;
      right: 19px;
    }
    .sc-eGmjcv.kVGLtU {
      width: 100%;
    }
  }
  svg {
    height: 20px;
    width: 20px;
  }
  .btnsWrapper {
    svg {
      color: #fff;
    }
    > div {
      margin-left: auto;
      justify-content: end;
      .deleteButton {
        margin-right: auto;
      }
    }
  }
  .closeBtn{
    svg{
      transform: rotate(45deg);
      transition: .3s ease;
      &:hover{
        color: ${(props) => props.theme.color.mainLight};
      }
    }
    
  }
`;
export const Overlay = styled.div`
  background: rgba(43, 49, 59, 0.6);
  position: absolute;
  z-index: 2;
  inset: 0;
  width: 100%;
  height: 100%;
`;

export const ModalGrid = styled.div`
  display: grid;
  gap: 40px;
  width: 100%;
  grid-template-columns: 1fr 1fr;
`;
