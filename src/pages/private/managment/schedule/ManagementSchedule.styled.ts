import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 1500px) {
  }
  @media (max-width: 1280px) {
  }
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1500px) {
    gap: 20px;
  }
  @media (max-width: 1280px) {
    gap: 20px;
  }
`;


export const Title = styled.div`
  gap: 20px;
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