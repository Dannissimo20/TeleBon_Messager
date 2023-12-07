import styled, { keyframes } from 'styled-components';

export const sidebar = keyframes`
  0% {
    transform: translateX(105%);
  }
  
  100% {
    transform: translateX(0);
  }
`;

export const Close = styled.button`
  display: flex;
  padding: 4px;
  position: absolute;
  top: 40px;
  left: -20px;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) => props.theme.color.bg};
  filter: drop-shadow(0px 4px 14px rgba(41, 47, 81, 0.08));
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  svg {
    width: 24px;
    height: 24px;
  }
  &:hover {
    border-color: ${(props) => props.theme.color.mainLight};
    svg {
      color: ${(props) => props.theme.color.mainLight};
    }
  }
`;

export const Wrapper = styled.div`
  padding: 40px;
  position: fixed;
  display: flex;
  align-items: stretch;
  top: 73px;
  z-index: 5;
  right: 0;
  min-height: calc(100vh - 72px);
  background-color: ${(props) => props.theme.color.bg};
  border: 2px solid ${(props) => props.theme.color.secondaryLight};
  box-shadow: 0px 4px 14px 0px rgba(41, 47, 81, 0.08);
  transition: all 0.3s ease;
  animation: ${sidebar} 0.3s ease;
  &.active {
    transform: none;
  }
`;

export const SidebarContent = styled.div``;
