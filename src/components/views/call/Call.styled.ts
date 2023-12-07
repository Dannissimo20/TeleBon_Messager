import { styled } from 'styled-components';
import { FlexContainer } from '../../../utils/styleUtils';

export const Wrapper = styled(FlexContainer)`
  @media (max-width: 1500px) {
    gap: 32px;
  }
`;

export const PageHeader = styled(FlexContainer)`
  justify-content: space-between;
`;

export const Title = styled(FlexContainer)`
  align-items: center;
  svg {
    width: 34px;
    height: 34px;
  }
`;

export const ControlBtns = styled(FlexContainer)`
  button {
    gap: 12px;
  }
`;

export const PageContent = styled(FlexContainer)`
  @media (max-width: 1500px) {
    gap: 32px;
  }
`;

export const NavMenuWrapper = styled.div`
  position: relative;
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
