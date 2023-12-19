import { Link, NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { scaleIn } from '../../shared/modal/create/service/sidebar/CreateServiceSidebar.styled';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background: ${(props) => props.theme.color.secondaryLight};
  min-width: 305px;
  max-width: 305px;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  padding: 25px 28px 0px 28px;
  @media (max-width: 1700px) {
    padding: 25px 28px 0px 28px;
    min-width: auto;
  }
`;

export const MenuSubMenu = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 12px;
  @media (max-width: 1500px) {
    gap: 0px;
  }
`;

export const Head = styled.div`
  margin-bottom: 49px;
  padding-left: 12px;
  padding-right: 13px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1500px) {
    margin-bottom: 40px;
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  gap: 12px;
  align-items: center;
  &:first-child {
    color: ${(props) => props.theme.color.mainLight};
  }
`;

export const SwitchButton = styled.button`
  padding: 3px;
  border: 3px solid ${(props) => props.theme.color.success};
  border-radius: 20px;
  position: relative;
  width: 48px;
  height: 28px;
  div {
    position: absolute;
    right: 2px;
    transition: 0.3s ease;
    top: 2px;
    svg {
      color: ${(props) => props.theme.color.success};
    }
  }
  &.locked {
    border-color: ${(props) => props.theme.color.danger};
    div {
      position: absolute;
      right: 20px;
      top: 2px;
      svg {
        color: ${(props) => props.theme.color.danger};
      }
    }
  }
`;

export const MenuItem = styled.li`
  max-width: 249px;
  width: 100%;
  position: relative;
  border-radius: 8px;
  gap: 24px;
  padding: 12px;
  overflow: hidden;
  color: ${(props) => props.theme.color.mainDark};
  svg {
    transition: 0.3s ease;
  }
  &.disable {
    color: rgba(148, 151, 168, 1);
    &:hover {
      svg {
        color: rgba(148, 151, 168, 1);
      }
      cursor: no-drop;
      color: rgba(148, 151, 168, 1);
    }
  }
  div {
    transition: color 0.3s ease;
  }
  &:before {
    content: '';
    position: absolute;
    animation: ${scaleIn} 0.3s ease;
    inset: 0;
    width: 100%;
    height: 100%;
    display: none;
    background: rgba(73, 111, 255, 0.1);
  }
  &:hover {
    color: ${(props) => props.theme.color.mainLight};
    svg {
      color: ${(props) => props.theme.color.mainLight};
    }
  }
  &.active {
    color: ${(props) => props.theme.color.mainLight};
    &:before {
      display: block;
    }
    svg {
      color: ${(props) => props.theme.color.mainLight};
    }
  }
  @media (max-width: 1500px) {
    gap: 16px;
  }
  &.last {
    background: rgba(73, 111, 255, 0.1);
    list-style: none;
    max-width: 100%;

    display: flex;
    justify-content: center;
    width: 100%;
    svg {
      color: ${(props) => props.theme.color.mainLight};
    }
    div {
      color: ${(props) => props.theme.color.mainLight};
    }
    a {
      position: relative;
      gap: 24px;
      justify-content: center;
    }
  }
`;

export const MenuLink = styled(NavLink)`
  font-weight: 600;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

export const Dis = styled.div`
  padding: 12px 40px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
  background: rgba(73, 111, 255, 0.1);
  svg {
    color: ${(props) => props.theme.color.mainLight};
  }
  div {
    color: ${(props) => props.theme.color.mainLight};
  }
  p {
    position: relative;
    gap: 24px;
    justify-content: center;
  }
`;

export const PortalLink = styled(NavLink)`
  padding: 12px 40px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
  background: rgba(73, 111, 255, 0.1);
  color: ${(props) => props.theme.color.mainLight};

  &.active {
    background: ${(props) => props.theme.color.mainLight};
    color: ${(props) => props.theme.color.bg};
  }
`;

export const PortalLinkInner = styled.div`
  padding: 12px;
  font-weight: 600;
  inset: 0;
  width: 100%;
  height: 100%;
  gap: 12px;
`;

export const Item = styled.p`
  font-weight: 600;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 12px 0;
  text-align: center;
`;

export const Line = styled.span`
  position: relative;
  max-width: 14.875rem;
  width: 100%;
  height: 2px;
  margin: 24px 0;
  background: ${(props) => props.theme.color.secondaryMedium};
  @media (max-width: 1500px) {
    margin: 10px 0;
  }
`;

export const Icon = styled.div`
  display: flex;
  svg {
    width: 17px;
  }
`;

export const Title = styled.div`
  font-weight: 600;
`;
