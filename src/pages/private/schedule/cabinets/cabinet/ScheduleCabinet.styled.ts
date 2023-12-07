import styled from 'styled-components';

export const Item = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.color.secondaryLight};
  font-weight: 600;
  padding: 12px 16px 12px 26px;
  cursor: pointer;
  background: ${props => props.theme.color.secondaryLight};
  svg {
    margin-left: 20px;
    opacity: 0.5;
    &:hover {
      opacity: 0.2;
    }
  }
  
  &.active {
    border: 2px solid ${props => props.theme.color.mainLight};
  }
`;
