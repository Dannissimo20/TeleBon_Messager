import styled from 'styled-components';
import { PageTitle } from '../../../../utils/styleUtils';

export const Wrapper = styled.div`
  margin-bottom: 50px;
  margin-top: 10px;
`;
export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(PageTitle)`
  display: flex;
  align-items: center;
  gap: 24px;
  svg {
    width: 30px;
    height: 30px;
  }
`;

export const NavMenuWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: rgba(41, 47, 81, 0.1);
  }
`;
export const List = styled.ul`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const NavMenuItem = styled.li`
  display: flex;
  position: relative;
  padding-bottom: 20px;
  transition: all 0.4s ease;
  font-weight: 600;
  opacity: 0.5;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: transparent;
    transition: all 0.4s ease;
  }
  &.active {
    opacity: 1;
    &::after {
      background-color: ${(props) => props.theme.color.mainLight};
      filter: drop-shadow(0px 4px 24px rgba(73, 111, 255, 0.48));
    }
  }
`;