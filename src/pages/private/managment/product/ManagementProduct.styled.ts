import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (max-width: 1500px) {
    gap: 32px;
  }
  @media (max-width: 1280px) {
    gap: 24px;
  }
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (max-width: 1500px) {
    gap: 32px;
  }
  @media (max-width: 1280px) {
    gap: 24px;
  }
  .createProduct {
    padding: 12px 26px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${(props) => props.theme.color.success};
    border: 2px solid ${(props) => props.theme.color.success};
    border-radius: 8px;
    font-weight: 600;
    &:hover,
    &:focus {
      background-color: ${(props) => `${props.theme.color.success}11`};
    }
    &:active {
      background-color: ${(props) => props.theme.color.success};
      color: ${(props) => props.theme.color.bg};
    }
    &.disabled {
      border: 2px solid ${(props) => props.theme.color.secondaryMedium};
      background: ${(props) => props.theme.color.secondaryMedium};
      color: ${(props) => props.theme.color.bg};
      pointer-events: none;
    }
  }
`;
export const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  gap: 24px;
`;

export const TopBtnWrapper = styled.div`
  display: flex;
  gap: 24px;
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
