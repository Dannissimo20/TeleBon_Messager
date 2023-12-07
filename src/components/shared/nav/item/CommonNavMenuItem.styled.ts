import { styled } from 'styled-components';

export const NavMenuItem = styled.li`
  z-index: 1;
  a {
    display: flex;
    position: relative;
    padding-bottom: 20px;
    transition: all 0.4s ease;
    opacity: 0.5;
    font-weight: 600;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      border-radius: 2px;
      background-color: transparent;
      transition: all 0.4s ease;
    }
    &:hover::after,
    &.active::after {
      background-color: ${(props) => props.theme.color.mainLight};
      filter: drop-shadow(0px 4px 24px rgba(73, 111, 255, 0.48));
    }
    &:hover,
    &.active {
      opacity: 1;
    }
  }
`;
