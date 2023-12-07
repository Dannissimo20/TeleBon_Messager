import styled, { keyframes } from 'styled-components';
import { scaleIn } from '../../../../components/shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

export const checkAnim = keyframes`
  0% {
    height: 0;
  }

  100% {
    height: 10px;
  }
`;

export const ModalMenu = styled.div`
  position: absolute;
  top: 100%;
  background: ${(props) => props.theme.color.bg};
  z-index: 3;
  left: 0;
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
  border-radius: 8px;
  animation: ${scaleIn} 0.3s ease;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  border-top: none;
  border-top-left-radius: 0;
  li {
    margin: 5px 0;
    transition: 0.3s ease;
    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.color.mainLight};
    }
  }
`;

export const Calculate = styled.div`
  width: 320px;
  min-width: 320px;
  display: flex;
  align-items: center;
  height: 56px;
  justify-content: space-between;
  border-bottom: 2px solid ${(props) => props.theme.color.mainLight};
  padding-left: 19px;
  padding-right: 19px;
  div {
    > button {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.color.mainLight};
      animation: ${scaleIn} 0.3s ease;
      transition: 0.3s ease;
      &:active {
        transform: scale(1.2);
      }
      &.hidden {
        display: none;
      }
      svg {
        cursor: pointer;
      }
    }
  }
`;

export const Table = styled.div`
  height: auto;
  overflow-y: auto;
  @media (max-width: 1500px) {
    height: 200px;
  }
  .header {
    display: grid;
    grid-template-columns: 3fr 2fr 2fr 0.5fr;
    justify-items: start;
    div {
      position: relative;
      p {
        span {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
  .header {
    background: rgba(237, 241, 255, 1);
    padding: 16px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p {
      color: ${(props) => props.theme.color.mainLight};
      font-weight: 600;
      text-align: center;
    }
    border-radius: 8px;
  }
  .content {
    width: 100%;
    border-bottom: 2px solid ${(props) => props.theme.color.mainLight};
    display: flex;
    flex-direction: column;
    .gridWrapper {
      &.active {
        border: 2px solid ${(props) => props.theme.color.mainLight};
        &:first-child{
          border-top: none;
        }
        border-radius: 8px;
        margin: 1px 0;
      }
      .gridContent {
        padding: 16px;
        display: grid;
        grid-template-columns: 3fr 2fr 2fr 0.5fr;
        .client {
          display: flex;
          flex-direction: column;
          p{
            font-size: 14px;
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
        }
        .confirmation {
          display: flex;
          align-items: center;
          justify-content: start;
          div {
            display: flex;
            gap: 8px;
            align-items: center;
            justify-content: center;
            padding: 8px;
            background: rgba(237, 241, 255, 1);
            border-radius: 8px;
            &.activeY {
              background: rgba(237, 241, 255, 1);
              color: ${(props) => props.theme.color.mainLight};
              svg {
                color: ${(props) => props.theme.color.mainLight};
              }
            }
            &.activeN {
              //background: rgba(242, 201, 76, 0.1);
              color: ${(props) => props.theme.color.mainLight};
              svg {
                color: ${(props) => props.theme.color.mainLight};
              }
            }
            svg {
              width: 12px;
              height: 12px;
            }
            p {
              font-size: 12px;
              font-weight: 600;
            }
          }
        }
        .paymentComplete {
          display: flex;
          align-items: center;
          justify-content: start;
          div {
            padding: 6px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
            &.activeY {
              background: ${(props) => props.theme.color.success};
              color: ${(props) => props.theme.color.bg};
            }
            &.activeN {
              background: ${(props) => props.theme.color.danger};
              color: ${(props) => props.theme.color.bg};
            }
          }
        }
        .manipulation {
          button {
            padding: 0;
            border: none;
            svg{
              color: ${(props) => props.theme.color.mainLight};
              transform: rotate(-90deg);
              transition: .3s ease;
            }
          }
          &.active{
            button{
              svg{
                transform: rotate(0);
              }
            }
          }
        }
      }
    }
  }
`;
