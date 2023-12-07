import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  button {
    border-radius: 8px;
    position: absolute;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    &:hover {
      color: ${(props) => props.theme.color.mainLight};
      background: rgba(73, 111, 255, 0.1);
    }
    &.active {
      color: ${(props) => props.theme.color.mainLight};
      background: transparent;
    }
  }
  input {
    height: 48px;
    border-radius: 8px;
    border: none;
    outline: none;
    z-index: 3;
    position: relative;
    background: rgba(73, 111, 255, 0.1);
    padding-left: 0;
    width: 0;
    transform: scaleX(0);
    transform-origin: left;
    transition: 0.3s ease;
    &::placeholder {
      display: none;
      color: rgba(73, 111, 255, 0.1);
      transition: 0.3s ease;
    }
    &.active {
      width: 450px;
      transform: scaleX(1);
      padding-left: 61px;
      &::placeholder {
        display: block;
        color: ${(props) => props.theme.color.mainDark};
      }
    }
  }
`;
