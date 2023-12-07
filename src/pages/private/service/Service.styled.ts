import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 2px solid ${(props) => props.theme.color.mainLight};
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;
export const List = styled.ul``;

export const ListHead = styled.li`
  padding: 24px;
  display: grid;
  align-items: center;
  grid-template-columns: 0.8fr 2fr 2fr 2fr 1.5fr 1fr;
  border-bottom: 1px solid #eaebee;
  font-weight: 600;
  font-size: 20px;
  line-height: 18px;
  color: rgba(41, 47, 81, 0.5);
  .price,
  .duration,
  .type {
    text-align: center;
  }
`;

export const ListItem = styled.li`
  padding: 24px 12px;
  display: grid;
  align-items: center;
  grid-template-columns: 0.8fr 2fr 2fr 2fr 1.5fr 1fr;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.color.secondaryMedium};
  }
  &:first-child {
    border-top: none;
  }
  .price,
  .duration,
  .type {
    text-align: center;
  }
`;

export const ListItemBtnEmpty = styled.div`
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: start;
  justify-content: start;
  border-bottom: 1px solid ${(props) => props.theme.color.secondaryMedium};
  button {
    gap: 12px;
    font-weight: 600;
  }
`;

export const BtnAddWrap = styled.div`
  margin: 24px 12px;
  display: flex;
  justify-content: start;
  button {
    gap: 12px;
    font-weight: 600;
  }
`;

export const TitleWrap = styled.div`
  gap: 12px;
  svg {
    width: 18px;
    height: 18px;
  }
`;
export const ButtonDrugAndDrop = styled.button`
  cursor: move;
`;
export const ControlsWrap = styled.div`
  justify-content: flex-end;
  gap: 30px;
  height: 100%;
`;

export const ButtonEdit = styled.button`
  height: 100%;
  svg {
    width: 17.8px;
    height: 17.8px;
  }
  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.mainLight};
  }
`;

export const ButtonDelete = styled.button`
  svg {
    width: 19.8px;
    height: 20.8px;
  }
  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.danger};
  }
`;
