import styled from 'styled-components';
import { scaleIn } from '../../../../../components/shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

export const ConfirmationModalWrapper = styled.div`
  animation: ${scaleIn} 0.3s ease;
  padding: 0 16px;
  &.confirmationSingle {
    padding: 0;
    .singleModalTable{
      display: flex;
      flex-direction: column;
      gap: 20px;
      .header{
        background: rgba(237, 241, 255, 1);
        border-radius: 8px;
        padding: 16px;
        p{
          color: ${(props) => props.theme.color.mainLight};
          font-weight: 600;
        }
      }
    }
    .activeCLassificator {
      div{
        background: ${(props) => props.theme.color.mainLight};
        color: #fff;
        font-size: 12px;
        padding: 4px;
        border-radius: 8px;
        width: fit-content;
      }
    }
    > h4,
    .paymentsHeader h4 {
      font-size: 20px;
      margin: 40px 0;
    }
    .paymentsHeader{
      width: 50%;
      justify-content: space-between;
      p{
        font-size: 16px;
      }
    }
  }
  h4 {
    font-size: 16px;
    margin-bottom: 16px;
  }
  .btns {
    gap: 0px;
    border-radius: 12px;
    margin-left: 0;
    height: 36px !important;
    border: 2px solid ${(props) => props.theme.color.mainLight};
    width: fit-content;
    button {
      gap: 8px;
      align-items: center;
      border-radius: 7px;
      margin: 0;
      padding: 9px;
      border: none;
      color: ${(props) => props.theme.color.mainLight};
      &:hover {
        border: none;
        color: ${(props) => props.theme.color.bg};
        background: ${(props) => props.theme.color.mainLight};
        svg {
          color: ${(props) => props.theme.color.bg};
        }
      }
      &.activeConfirmation {
        background: ${(props) => props.theme.color.mainLight};
        color: ${(props) => props.theme.color.bg};
        svg {
          color: ${(props) => props.theme.color.bg};
        }
      }
      svg {
        width: 14px;
        height: 14px;
        color: ${(props) => props.theme.color.mainLight};
      }
      h4 {
        margin: 0;
      }
    }
  }
  .paymentsStatus {
    .paymentsHeader {
      h4 {
        margin: 0;
      }
      margin: 20px 0;
      display: flex;
      gap: 8px;
      align-items: center;
      p {
        font-weight: 500;
        span {
          color: rgba(148, 151, 168, 1);
        }
      }
    }
    > div {
      position: static;
      .paymentType {
        width: 70%;
        > div {
          width: 100%;
          position: relative;
          > button {
            position: absolute;
            z-index: 2;
            max-width: 85%;
            width: 100%;
            bottom: 3px;
          }
        }
        .common {
          position: absolute;
          width: 100%;
          z-index: 5;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          .content {
            background: #fff;
            max-width: 750px;
            border-radius: 8px;
            padding: 40px 60px;
            height: 400px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        }
      }
      margin-bottom: 60px;
    }
  }
`;
