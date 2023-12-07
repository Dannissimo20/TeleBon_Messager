import styled from 'styled-components';

export const Close = styled.button`
  position: absolute;
  top: 47px;
  right: 67px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  svg {
    transform: rotate(45deg);
    transition: 0.3s ease;
  }
  &:hover {
    svg {
      color: ${(props) => props.theme.color.mainLight};
    }
  }
`;
