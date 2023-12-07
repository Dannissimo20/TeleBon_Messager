import styled from 'styled-components';
import { FlexContainer } from '../../../../../../utils/styleUtils';

export const Item = styled.li`
  padding: 24px 24px 24px 14px;
  display: grid;
  align-items: start;
  grid-template-columns: auto auto 1fr;
  gap: 24px;
  border-radius: 8px;
  font-weight: 600;
  border: 2px solid ${(props) => props.theme.color.mainLight};
  &.active {
    border: 2px solid ${(props) => props.theme.color.mainLight};
  }
`;
export const Point = styled.div`
  position: relative;
  width: 5px;
  height: 5px;
  background: ${(props) => props.theme.color.mainDark};
  border-radius: 50%;
`;

export const ItemForm = styled.form`
  padding: 24px 24px 24px 72px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.mainLight};
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  color: ${(props) => props.theme.color.bg};
  .seatslimit {
    gap: 12px;
  }
  input {
    border: 1px solid ${(props) => props.theme.color.bg};
    background-color: transparent;
    border-radius: 4px;
    color: ${(props) => props.theme.color.bg};
    height: 22px;
    &::placeholder {
      color: ${(props) => props.theme.color.bg};
    }
  }
  .customInput {
    border-bottom: 1px solid ${(props) => props.theme.color.bg};
    color: ${(props) => props.theme.color.bg};
    &:focus {
      outline: 1px solid ${(props) => props.theme.color.bg};
    }
  }
  .seatslimit {
    input {
      width: 80px;
      &:focus {
        outline: 1px solid ${(props) => props.theme.color.bg};
      }
    }
  }
  .workHoursRangeWrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .workHoursRange {
    input {
      &:focus {
        outline: 1px solid ${(props) => props.theme.color.bg};
      }
    }
  }
`;

export const CabinetName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  line-height: 26px;
`;

export const CabinetLimit = styled.p`
  line-height: 18px;
  opacity: 0.5;
`;

export const ItemNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OperatingMode = styled.div``;

export const Label = styled.span`
  margin-bottom: 4px;
  display: inline-block;
  font-weight: 600;
  line-height: 18px;
`;

export const TimeInterval = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 12px;
  opacity: 0.5;
`;

export const TimeIntervalDivider = styled.span`
  display: inline-block;
  margin: 0 2px;
`;

export const Planning = styled.div`
  button {
    font-weight: 600;
  }
`;

export const Controls = styled(FlexContainer)`
  justify-content: flex-end;
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const SubmitBtn = styled.div`
  margin-left: auto;
  gap: 12px;
  button {
    border-color: ${(props) => props.theme.color.bg};
    color: ${(props) => props.theme.color.mainLight};
    background: ${(props) => props.theme.color.bg};
    &:not([disabled]):hover {
      border-color: ${(props) => props.theme.color.bg};
      color: ${(props) => props.theme.color.bg};
      background: ${(props) => props.theme.color.success};
    }
    &:disabled {
    }
  }
  .backButton {
    padding: 12px 28px;
    border-radius: 8px;
    border: 2px solid ${(props) => props.theme.color.bg};
    &:hover {
      border-color: ${(props) => props.theme.color.bg};
      color: ${(props) => props.theme.color.bg};
      background: ${(props) => props.theme.color.mainLight};
    }
  }
`;

export const ButtonEdit = styled.button`
  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.mainLight};
  }
`;

export const ButtonDrugAndDrop = styled.button`
  padding-top: 5px;
`;

export const ButtonDelete = styled.button`
  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.danger};
  }
`;
