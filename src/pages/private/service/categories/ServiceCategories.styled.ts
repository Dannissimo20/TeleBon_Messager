import styled from 'styled-components';
import { FlexContainer } from '../../../../utils/styleUtils';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 1500px) {
  }
`;
export const TopBar = styled(FlexContainer)`
  margin-top: 7px;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  li:last-child {
    .list-btn {
      border-bottom: 1px solid ${(props) => props.theme.color.secondaryMedium};
    }
  }
`;

export const ButtonWrap = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  button {
    gap: 12px;
    font-weight: 600;
  }
`;
