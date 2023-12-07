import styled, { keyframes } from 'styled-components';
import { FlexContainer } from '../../../../../utils/styleUtils';

export const opacity = keyframes`
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0.3;
  }
  100%{
    opacity: 1;
  }
`;

export const Item = styled.li``;

export const ItemHead = styled(FlexContainer)`
  align-items: start;
  padding: 24px 14px;
  border-radius: 8px;
  transition: all 0.3s ease;
  &.opened {
    background-color: ${(props) => props.theme.color.mainLight};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: 2px solid transparent;
    * {
      color: ${(props) => props.theme.color.bg};
    }
  }
  &.closed {
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.color.mainLight};
  }
  button {
    &.flex {
      transform: rotate(-180deg);
      svg {
        color: ${(props) => props.theme.color.mainLight};
      }
    }
    svg {
      width: 24px;
      height: 24px;
    }
  }
  button.open {
    transform: rotate(-90deg);
  }
`;

export const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ItemTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;

export const ItemServicesCount = styled.div`
  font-weight: 600;
  line-height: 16px;
`;
export const ItemContent = styled.div`
  animation: ${opacity} 0.3s ease;
`;

export const ButtonEdit = styled.button`
  display: flex;
  margin-left: auto;
  svg {
    width: 24px;
    height: 24px;
  }
  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.mainLight};
  }
`;

export const ButtonDelete = styled.button`
  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.danger};
  }
`;

export const ButtonDrugAndDrop = styled.button`
  display: flex;
  cursor: move;
`;

export const ClassificatorItem = styled.div`
  padding: 12px;
  color: #fff;
  border-radius: 8px;
`
