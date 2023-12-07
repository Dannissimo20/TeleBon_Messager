import styled from 'styled-components';
import { PageTitle } from '../../../../utils/styleUtils';

export const Wrapper = styled.div`
  margin-bottom: 47px;
  margin-top: 8px;
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
