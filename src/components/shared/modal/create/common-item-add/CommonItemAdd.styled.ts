import styled, { keyframes } from 'styled-components';

export const itemAdd = keyframes`
  0% {
    transform: scale(0.8);
  }
  
  100% {
    transform: scale(1);
  }
`;

export const Wrapper = styled.div`
  padding: 24px 24px 24px 72px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.mainLight};
  color: ${(props) => props.theme.color.bg};
  animation: ${itemAdd} 0.3s ease;
`;
