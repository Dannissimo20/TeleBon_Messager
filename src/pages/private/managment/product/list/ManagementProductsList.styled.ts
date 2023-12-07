import { styled } from 'styled-components';
import { FlexContainer } from '../../../../../utils/styleUtils';

export const Grid = styled.ul`
  &.full {
    display: grid;
    grid-template-columns: repeat(auto-fit, calc(352 / 1482 * 100%));
    gap: 24px;
  }
`;

export const Card = styled.li`
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  min-width: fit-content;
  .subproductsLink {
    gap: 12px;
    &:hover,
    &:focus {
      color: ${(props) => props.theme.color.mainLight};
    }
  }
  .editLink {
    margin-top: auto;
    padding: 2px;
    display: flex;
    align-self: flex-end;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.color.secondaryMedium};
    &:hover,
    &:focus {
      color: ${(props) => props.theme.color.mainLight};
      border-color: ${(props) => props.theme.color.mainLight};
    }
  }
`;

export const TitleWrap = styled(FlexContainer)`
  justify-content: space-between;
  button {
    &:hover,
    &:focus {
      color: ${(props) => props.theme.color.danger};
    }
  }
`;
export const DeleteBtn = styled.button`
  margin-bottom: auto;
`;

export const CardComment = styled.div`
  font-size: 12px;
  line-height: 16px;
`;

export const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
