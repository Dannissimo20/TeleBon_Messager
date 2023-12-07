import styled from 'styled-components';

export const Item = styled.li`
  a {
    position: relative;
    padding-bottom: 18px;
    font-weight: 600;
    line-height: normal;
    opacity: 0.5;
    transition: all 0.4s ease;
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      border-radius: 2px;
      background-color: transparent;
    }
    &.active,
    &:hover {
      opacity: 1;
    }
    &:hover::after,
    &.active::after {
      background-color: ${(props) => props.theme.color.mainLight};
      filter: drop-shadow(0px 4px 24px rgba(73, 111, 255, 0.48));
    }
  }
`;
