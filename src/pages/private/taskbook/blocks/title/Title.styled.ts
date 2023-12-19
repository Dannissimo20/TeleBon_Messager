import styled from 'styled-components';

export const TitleWrapper = styled.div`
  border: 2px solid rgba(73, 111, 255, 0.3);
  border-radius: 8px;
  .confirm {
    width: 268px;
    margin: 0.2rem auto;
    display: flex;
    align-items: center;
    .button-confirm {
      height: 2rem;
      width: 6rem;
      background: #525252;
      cursor: pointer;
      border: none;
      border-radius: 7px;
      color: #fff;
      font-weight: bold;
      margin-right: 0.5rem;
    }
    &:hover {
      background: #e22bba;
    }
  }

  .editable-title-container {
    position: relative;
    display: flex;
    cursor: pointer;
    padding-left: 19px;
    height: 56px;
    align-items: center;
    .disabled {
      margin-left: auto;
    }
    .editable-title,
    .input-title {
      flex-grow: 1;
      padding-left: 20px;
      font-size: 16px;
      font-weight: 600;
      &.indexNumber {
        position: absolute;
        padding-left: 0;
        z-index: 3;
      }
    }
    .input-title {
      width: 100%;
      left: 0;
      padding-left: 38px;
      position: absolute;
      outline: 2px solid transparent;
      display: flex;
      border-radius: 8px;
      height: 56px;
      border: none;
      &.indexNumber {
        position: absolute;
        z-index: 3;
        padding-left: 19px;
        top: 19px;
        outline: none;
      }
      &:focus,
      &:focus-within {
        background: #fff;
        border: 2px solid ${(props) => props.theme.color.mainLight};
      }
    }
    .list-button {
      height: 1.5rem;
      border: none;
      cursor: pointer;
      padding: 0 30px 0 0;
      background: none;
      transition: 0.3s ease;
      &:hover {
        color: ${(props) => props.theme.color.mainLight};
        border: none;
      }
    }

    .menu-card {
      position: absolute;
      right: 25px;
      top: 40px;
      width: 320px;
      box-shadow: 0 3.2px 9px 0 rgba(0, 0, 0, 0.16), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.1), 0px -1.5px 6px 0px rgba(0, 0, 0, 0.06);
      background-color: #fff;
      border: 1px solid #ddd;
      padding: 10px 7px;
      border-radius: 8px;
      z-index: 999;
      list-style-type: none;
      cursor: default;

      li {
        font-size: 16px;
        border-radius: 8px;
        padding: 12px;
        cursor: pointer;
        &:hover {
          background-color: ${(props) => props.theme.color.secondaryLight};
        }
      }
    }
  }
`;
