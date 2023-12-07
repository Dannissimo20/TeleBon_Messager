import styled, { keyframes } from 'styled-components';
import { PageTitle } from '../../../utils/styleUtils';


interface ILineProps {
  backgroundcolor?: string;
  $width: string | number;
}
export const Wrapper = styled.div`
  margin-bottom: 40px;
  @media (max-width: 1500px) {
    margin-bottom: 32px;
  }
`;
export const Box = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  span {
    position: relative;
    margin: 0 6px;
    &:before {
      content: '';
      width: 2px;
      border-radius: 8px;
      opacity: 0.5;
      height: 12px;
      background: ${(props) => props.theme.color.mainDark};
      top: 50%;
      transform: translateY(-50%);
      left: -7px;

      position: absolute;
    }
    &:nth-child(2) {
      &:before {
        content: none;
      }
    }
  }
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
    width: 34px;
    height: 34px;
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
  @media (max-width: 1500px) {
    margin-bottom: 32px;
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

export const WrapperAnalyticsContent = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(1150 / 1452 * 100%);
`;

export const fillAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: ${(props: { $width: string | number }) => props.$width}%;
  }
`;

export const Line = styled.div`
  position: relative;
  height: 8px;
  width: 100%;
  border-radius: 4px;
  background: rgba(16, 18, 32, 0.1);
  overflow: hidden;
  margin-top: 4px;
`;
export const Progress = styled.div<ILineProps>`
  position: absolute;
  left: 0;
  border-radius: 4px;
  height: 8px;
  background: ${(props) => props.theme.color.mainLight};
  background: ${(props) => props.backgroundcolor || props.theme.color.mainLight};
  width: ${(props) => props.$width}%;
  animation: ${fillAnimation} 0.5s ease;
`;
export const Container = styled.div``;

export const Info = styled.div`
  font-size: 10px;
  opacity: 0.5;
  text-align: center;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

export const ListAnalyticsContent = styled.ul`
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 184px;
  li {
    padding: 20px 20px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 8px;
    border: 2px solid ${(props) => props.theme.color.secondaryMedium};
    transition: all 0.2s ease;
    .progress {
      > div {
        &:nth-child(2) {
          div {
            animation: ${fillAnimation} 1s ease-in-out;
          }
        }
      }
    }
    h3 {
      font-size: 14px;
      font-weight: 600;
    }
    &:hover {
      background-color: ${(props) => props.theme.color.mainLight};
      border-color: ${(props) => props.theme.color.mainLight};
      color: #fff;
      .progress {
        > div {
          &:nth-child(1) {
            div {
              border: 1px solid ${(props) => props.theme.color.secondaryMedium};
            }
          }
        }
      }
    }
  }
  @media (max-width: 1500px) {
    gap: 16px;
  }
`;
export const ListA = styled.ul`
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
  grid-auto-rows: 289px;
  li {
    padding: 18px;
    width: 366px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    border-radius: 8px;
    border: 2px solid ${(props) => props.theme.color.secondaryMedium};
    transition: all 0.2s ease;
    @media (max-width: 1500px) {
      width: 290px;
    }
    h3 {
      font-size: 14px;
    }
    &:hover {
      background-color: ${(props) => props.theme.color.mainLight};
      border-color: ${(props) => props.theme.color.mainLight};
      color: #fff;
    }
  }
  @media (max-width: 1500px) {
    gap: 16px;
  }
`;