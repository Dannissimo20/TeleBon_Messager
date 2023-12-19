import styled from 'styled-components';

import { PageTitle } from '../../../../utils/styleUtils';

export const Wrapper = styled.div`
  max-width: 1500px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  margin-top: 24px;
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
      border: 1px solid #555;
      border-radius: 50%;
      position: relative;
      width: 18px;
      height: 18px;
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
      &.telegram-btn {
      }
      &.whatsapp-btn {
      }
      &.viber-btn {
      }
      svg {
        width: 24px;
        height: 24px;
        pointer-events: none;
      }
      &.active {
        background: ${(props) => props.theme.color.mainLight};
        &.telegram-btn {
          background: ${(props) => props.theme.color.mainLight};
          border: 2px solid ${(props) => props.theme.color.mainLight};
        }
        &.whatsapp-btn {
          background: ${(props) => props.theme.color.success};
          border: 2px solid ${(props) => props.theme.color.success};
        }
        &.viber-btn {
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
export const Title = styled(PageTitle)`
  margin: 0;
  font-size: 24px;
`;

export const TableWrapper = styled.div`
  overflow-y: auto;
  min-height: 400px;
`;
export const ExportTextarea = styled.textarea`
  height: 150px;
  border-radius: 8px;
  padding: 16px;
  border: 2px solid ${(props) => props.theme.color.mainLight};
  &:focus-within {
    border: 2px solid ${(props) => props.theme.color.mainLight};
  }
  &:focus {
    outline: none !important;
    border: 2px solid ${(props) => props.theme.color.mainLight};
  }
`;

export const ExportSelect = styled.div`
  height: 56px;
  width: 320px;
  min-width: 320px;
  >div{
    height: 56px;
    width: 320px;

  }
  // outline: none !important;
  // border: none !important;
  // border-bottom: 2px solid ${(props) => props.theme.color.mainLight} !important;
  // option {
  //   cursor: pointer;
  //   width: 300px;
  //   min-height: 60px;
  //   max-height: 300px;
  //   border-radius: 15px;
  //   background-color: rgb(250, 250, 250);
  //   box-shadow: 2px 4px 8px #c5c5c5;
  //   transition: all 300ms;
  // }
`;
export const ExportText = styled.p`
  margin-top: 20px;
  color: rgba(108, 110, 124, 1);
`;
export const ExportFileWrapper = styled.div`
  position: relative;
  #inputGroupFile {
    position: absolute;
    width: 100%;
    opacity: 0;
    height: 100%;
    inset: 0;
  }
  label[for='inputGroupFile'] {
    vertical-align: middle;
    cursor: pointer;
    width: 100%;
    background: rgba(249, 249, 249, 1);
    border-radius: 8px;
    height: 150px;
    border: 2px dashed ${(props) => props.theme.color.secondaryDark};
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    p,
    svg {
      text-align: center;
      width: 350px;
      color: rgba(108, 110, 124, 1);
    }
  }
  label[for='inputGroupFile'] span {
    margin-left: 10px;
  }
`;
