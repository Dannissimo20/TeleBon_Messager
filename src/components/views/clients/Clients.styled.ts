import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 1500px) {
    gap: 0;
  }
`;
export const Box = styled.div`
  display: flex;
  gap: 24px;
  &:last-of-type {
    // margin-top: 20px;
  }
  @media (max-width: 1500px) {
    gap: 16px;
    &:last-of-type {
      margin-top: 16px;
    }
  }
  @media (max-width: 1500px) {
    gap: 16px;
    &:last-of-type {
      margin-top: 16px;
    }
  }
`;
export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavMenuWrapper = styled.div`
  margin-top: 16px;
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