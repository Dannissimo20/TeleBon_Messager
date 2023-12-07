import styled from 'styled-components';
import { FlexContainer } from '../../../../utils/styleUtils';

export const Wrapper = styled.div`
  width: 100%;
`;
export const Table = styled.div``;
export const TableHeader = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: 1.5fr repeat(2, 1fr) 0.5fr;
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
`;
export const TableBody = styled.div`
  overflow: hidden;
`;
export const TableCol = styled.div`
  text-align: center;
  font-weight: 600;

  &.name {
    text-align: left;
  }
  @media (max-width: 1500px) {
    word-break: break-all;
  }
`;
export const TableRow = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: 1.5fr repeat(2, 1fr) 0.5fr;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
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

export const Controls = styled(FlexContainer)`
  justify-content: flex-end;
  svg {
    width: 24px;
    height: 24px;
  }
  .edit:hover {
    color: ${(props) => props.theme.color.mainLight};
  }
  .delete:hover {
    color: ${(props) => props.theme.color.danger};
  }
`;

export const ButtonInner = styled(FlexContainer)`
  gap: 12px;
`;
