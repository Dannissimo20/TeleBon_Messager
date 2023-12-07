import styled from 'styled-components';
import { scaleIn } from '../../../shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

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
  top: calc(100% + 6px);
  z-index: 1;
  animation: ${scaleIn} 0.3s ease;
  border-radius: 8px;
  background: ${(props) => props.theme.color.bg};
  max-width: 313px;
  width: 100%;
  filter: drop-shadow(0px 4px 14px rgba(41, 47, 81, 0.14));
`;
