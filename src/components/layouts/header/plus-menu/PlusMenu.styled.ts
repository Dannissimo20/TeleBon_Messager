import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { scaleIn } from '../../../shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

export const Wrapper = styled.div`
  margin-left: 12px;
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
  z-index: 10;
  padding: 12px 0;
  animation: ${scaleIn} 0.3s ease;
  border-radius: 8px;
  background: ${(props) => props.theme.color.bg};
  max-width: 313px;
  width: 100%;
  filter: drop-shadow(0px 4px 14px rgba(41, 47, 81, 0.14));
`;
export const Line = styled.span`
  position: relative;
  width: 100%;
  height: 1px;
  background: ${(props) => props.theme.color.secondaryMedium};
  display: block;
  margin: 12px 0;
`;
export const Icon = styled.div`
  display: flex;
  svg {
    width: 16px;
    height: 16px;
  }
`;
export const Container = styled.div`
  padding: 0 12px;
`;
export const Item = styled.div`
  display: flex;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  gap: 12px;
  transition: 0.3s ease;
  cursor: pointer;
  h4 {
    font-weight: 600;
  }
  &:hover {
    background: rgba(73, 111, 255, 0.1);
  }
`;
export const ItemLink = styled(Link)`
  display: flex;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  gap: 12px;
  transition: 0.3s ease;
  cursor: pointer;
  h4 {
    font-weight: 600;
  }
  &:hover {
    background: rgba(73, 111, 255, 0.1);
  }
`;
