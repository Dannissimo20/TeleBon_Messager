import styled from 'styled-components';

export const List = styled.div`
  display: flex;
`;
export const Item = styled.div`
  display: flex;
  align-items: center;
  span {
    opacity: 0.5;
  }
  svg {
    margin-bottom: -2px;
    transform: rotate(180deg);
    margin-left: 8px;
    margin-right: 8px;
  }

  &:last-of-type {
    span {
      color: ${(props) => props.theme.color.mainLight};
      opacity: 1;
    }
    svg {
      display: none;
    }
  }
`;