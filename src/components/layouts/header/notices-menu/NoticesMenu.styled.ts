import styled from 'styled-components';

export const Wrapper = styled.div`
  > button {
    border-radius: 8px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s ease;
    &:hover {
      color: ${(props) => props.theme.color.mainLight};
      background: rgba(73, 111, 255, 0.1);
    }
    &.active {
      background: ${(props) => props.theme.color.mainLight};
      color: #fff;
    }
  }
`;
export const Menu = styled.div`
  position: absolute;
  top: calc(100%);
  z-index: 10;
  transform: rotate(45deg);
  right: -100%;
  padding: 40px;
  transition: 0.3s ease;
  background: ${(props) => props.theme.color.bg};
  max-width: 750px;
  height: 100vh;
  width: 100%;
  border: 2px solid #f9f9f9;
  background: #fff;
  box-shadow: 0 4px 14px 0 rgba(41, 47, 81, 0.08);
  &.active {
    right: 0;
  }
  .header {
    justify-content: space-between;
    align-items: center;
    > div {
      button {
        svg {
          color: ${(props) => props.theme.color.mainDark};
        }
      }
    }
    .close {
      position: absolute;
      filter: drop-shadow(0px 4px 14px rgba(41, 47, 81, 0.08));
      padding: 7px;
      left: -25px;
      top: 40px;
      background: ${(props) => props.theme.color.bg};
      border-radius: 50%;
      border: 2px solid ${(props) => props.theme.color.secondaryMedium};
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        transition: 0.3s ease;
      }
      &:hover {
        svg {
          transform: scale(1.2);
          color: ${(props) => props.theme.color.mainLight};
        }
        border: 2px solid ${(props) => props.theme.color.mainLight};
      }
    }
  }
  .content {
    width: 100%;
    height: calc(100% - 74px);
    display: flex;
    align-items: center;
    justify-content: center;
    .empty {
      max-width: 161px;
      width: 100%;
      align-items: center;
      svg {
        height: 57px;
        width: 53px;
        color: ${(props) => props.theme.color.mainLight};
      }
      h4 {
        font-weight: 600;
        text-align: center;
      }
    }
  }
`;