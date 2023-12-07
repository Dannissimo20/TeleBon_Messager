import styled from 'styled-components';

export const CardContent = styled.div`
  min-height: 2.5rem;
  max-width: 475px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  margin: 0.5rem 0 0;

  background: #fff;
  border-radius: 8px;

  border: 2px solid rgba(73, 111, 255, 0.3);

  position: relative;

  .card-title-container {
    width: 100%;
    height: 100%;
    position: relative;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    transition: background-color 0.1s;
    > div {
      width: 100%;
      height: 70%;
      background: none;
      > button {
        border: none;
        position: relative;
        z-index: 5;
        padding: 5px;
        margin-right: 25px;
        margin-top: 4px;
        &:hover{
          border: none;
          color: ${(props) => props.theme.color.mainLight};
        }
      }
    }
    .content{
      width: 100%;
      height: 100%;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      p {
        padding: 12px;
        max-width: 90%;
        overflow: hidden;
        overflow-y: auto;
        word-wrap: break-word;
      }
    }
    .tag {
      position: sticky;
      bottom: 7px;
      padding: 12px;
      height: 45px;
      left: 12px;
      span {
        padding: 8px;
        border-radius: 8px;
        font-size: 16px;
        color: #fff;
      }
      .blue {
        background: rgba(86, 204, 242, 1);
      }
      .purple {
        background: rgba(187, 107, 217, 1);
      }
    }
    .list-button {
      height: 1.5rem;
      border: none;

      cursor: pointer;

      transition: background-color 0.2s;

      &:hover {
        border: none;
      }
    }

    .menu-card {
      position: absolute;
      right: -10px;
      top: 40px;
      width: 320px;
      box-shadow: 0px 3.2px 9px 0px rgba(0, 0, 0, 0.16), 0px 0.6px 1.8px 0px rgba(0, 0, 0, 0.1), 0px -1.5px 6px 0px rgba(0, 0, 0, 0.06);
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

  .input-card-title {
    width: 100%;
    height: 100% !important;

    padding: 0.7rem 0.5rem 0.5rem;
    outline: none;
    resize: none;
    overflow: hidden;

    border-color: transparent;
    border-radius: 3px;
    font-size: 15px;

    transition: border-color 0.2s;

    &:focus {
      border: 1px solid #e22bba;
    }
  }
`;
