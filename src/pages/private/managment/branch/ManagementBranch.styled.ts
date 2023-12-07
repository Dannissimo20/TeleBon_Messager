import styled from 'styled-components';

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
`;
export const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
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
export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, calc(352 / 1482 * 100%));
  gap: 24px;
  @media (max-width: 1500px) {
    grid-template-columns: repeat(auto-fit, 29%);
  }
  @media (max-width: 1500px) {
    grid-template-columns: repeat(auto-fit, 31%);
  }
`;

export const Card = styled.li`
  padding: 20px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  &.add {
    padding: 0;
    border: none;
  }
`;

export const ButtonAdd = styled.button`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.color.mainLight};
  border: 2px solid ${(props) => props.theme.color.mainLight};
  border-radius: 8px;
  &:hover,
  &:focus {
    color: #fff;
    background-color: ${(props) => props.theme.color.mainLight};
  }
`;
export const Head = styled.div`
  justify-content: space-between;
  button {
    &:hover,
    &:focus {
      color: ${(props) => props.theme.color.mainLight};
    }
  }
`;

export const CardInfo = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CardInfoItem = styled.li`
  display: flex;
  gap: 12px;
  &.delete {
    justify-content: flex-end;
  }
`;

export const DeleteBtn = styled.button`
  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.danger};
  }
`;
