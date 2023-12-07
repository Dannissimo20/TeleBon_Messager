import styled from 'styled-components';
import { Card } from '../../../../../../utils/styleUtils';

export const Grid = styled.div`
  &.full {
    display: grid;
    grid-template-columns: repeat(auto-fit, calc(352 / 1482 * 100%));
    gap: 24px;
  }
`;

export const CardItem = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 196px;
  &.add {
    border: none;
  }
  .addLink {
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
  }
`;

export const Head = styled.div`
  justify-content: space-between;
  .editLink {
    display: flex;
    &:hover,
    &:focus {
      color: ${(props) => props.theme.color.mainLight};
    }
  }
`;

export const ItemInfo = styled.div`
  gap: 12px;
  justify-content: flex-start;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  &.delete {
    margin-top: auto;
    justify-content: flex-end;
  }
`;
export const DeleteBtn = styled.button`
  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.danger};
  }
`;