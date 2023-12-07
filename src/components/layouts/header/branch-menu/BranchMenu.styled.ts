import styled from 'styled-components';
import { scaleIn } from '../../../shared/modal/create/service/sidebar/CreateServiceSidebar.styled';


export const Wrapper = styled.div`
  button {
    border-radius: 8px;
    height: 48px;
    min-width: 234px;
    max-width: 234px;
    
    display: flex;
    position: relative;
    padding: 0 12px;
    align-items: center;

    transition: 0.3s ease;
    &:hover {
      color: ${(props) => props.theme.color.mainLight};
    }
    &.active {
      color: ${(props) => props.theme.color.mainLight};
      background: rgba(73, 111, 255, 0.1);
    }
    gap: 12px;
    svg {
      min-width: 20px;
      display: block;
      height: 21.5px;
    }
    h4 {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-weight: 600;
    }
  }
`;
export const Container = styled.div`
  padding: 12px;
  > div {
    padding: 12px 7px 12px 11px;
    transition: 0.3s ease;
    border-radius: 8px;
    cursor: pointer;
    h4 {
      font-weight: 600;
    }
    &:hover {
      background: rgba(73, 111, 255, 0.1);
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    margin: 0;
    background: ${(props) => props.theme.color.mainLight};
    color: ${(props) => props.theme.color.bg};
    &:hover {
      background: rgba(73, 111, 255, 0.1);
    }
  }
`;
export const Menu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  z-index: 4;
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
  margin: 0;
  height: 1px;
  background: ${(props) => props.theme.color.secondaryMedium};
  display: block;
`;