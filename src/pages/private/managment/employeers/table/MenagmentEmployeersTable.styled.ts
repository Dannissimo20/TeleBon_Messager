import styled from 'styled-components';
import { FlexContainer } from '../../../../../utils/styleUtils';
import { scaleIn } from '../../../../../components/shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

export const Wrapper = styled.div``;

export const List = styled.div``;

export const SearchWrap = styled(FlexContainer)`
  justify-content: space-between;
  .form-search {
    flex-grow: 1;
  }
  .input-search {
    padding: 15px 20px 15px 45px;
    width: 100%;
    border-radius: 8px;
    background: ${(props) => props.theme.color.secondaryLight};
    border: none;
    font-weight: 600;
    line-height: 18px;
    transition: all 0.3s ease;
    outline: 2px solid transparent;
    &::placeholder {
      opacity: 0.5;
      transition: all 0.3s ease;
    }
    &:focus::placeholder {
      opacity: 0;
    }
    &:focus {
      outline: 2px solid ${(props) => props.theme.color.mainLight};
    }
  }
  label {
    display: flex;
    position: relative;
    button {
      position: absolute;
      top: 15px;
      left: 15px;
    }
    svg {
      width: 18px;
      height: 18px;
    }
  }
  & > button {
    &:hover {
      color: ${(props) => props.theme.color.success};
    }
  }
`;

export const TableHeader = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: 1.5fr repeat(6, 1fr) 0.5fr;
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
`;
export const TableBody = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;
export const TableCol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 500;
  &.fio {
    justify-content: flex-start;
  }
`;
export const TableRow = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: 1.5fr repeat(6, 1fr) 0.5fr;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
  }

  &:hover {
    ${TableCol} {
      color: ${(props) => props.theme.color.mainLight};
    }
  }
`;

export const HeadItem = styled.div`
  text-align: center;
  opacity: 0.5;
  font-weight: 600;
  &:first-child {
    text-align: left;
  }
`;

export const FioWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
  p {
    text-align: left;
  }
  .email {
    margin-top: 4px;
    font-size: 12px;
    line-height: 14px;
    opacity: 0.5;
  }
`;
export const CardInfoItem = styled.li`
  display: flex;
  gap: 40px;
`;

export const DeleteBtn = styled.button`
  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.danger};
  }
`;
export const EditBth = styled.button`
  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.mainLight};
  }
`;

export const ButtonDrugAndDrop = styled.button`
  display: flex;
  cursor: move;
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const EmptyEmployee = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;

  animation: ${scaleIn} 0.5s ease;
`;

export const ButtonInner = styled(FlexContainer)`
  gap: 12px;
`;
