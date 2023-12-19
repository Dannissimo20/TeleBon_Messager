import { styled } from 'styled-components';

export const List = styled.ul`
  position: relative;
  display: flex;
  gap: 20px;
  align-items: center;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: ${(props) => props.theme.color.secondaryMedium};
  }
`;
