import styled from 'styled-components';
import { FlexContainer } from '../../../../../utils/styleUtils';
import CommonButton from '../../../../../components/shared/button/CommonButton';

export const Wrapper = styled.div`
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  width: calc(478 / 1482 * 100%);
  min-width: 350px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1500px) {
    min-width: 300px;
    width: calc(400 / 1482 * 100%);
  }
  @media (max-width: 1280px) {
    min-width: auto;
  }
`;

export const Header = styled(FlexContainer)`
  padding: 10px 18px;
  gap: 8px;
`;

export const HeaderTop = styled(FlexContainer)`
  justify-content: space-between;
  span {
    font-weight: 600;
    line-height: 16px;
  }
`;
export const HeaderBottom = styled(FlexContainer)`
  justify-content: space-between;
  span {
    font-size: 14px;
    line-height: 10px;
    opacity: 0.5;
  }
`;
export const Content = styled(FlexContainer)`
  padding: 20px 18px 18px 18px;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

export const ContentItem = styled(FlexContainer)`
  flex-direction: column;
  gap: 8px;
  .label {
    font-weight: 700;
    line-height: normal;
  }
  .value {
    line-height: normal;
    opacity: 0.5;
  }
`;

export const ButtonsWrap = styled.div`
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-columns: 1fr 1fr;
  gap: 20px;
  button {
    gap: 12px;
  }
  span {
    display: flex;
    font-weight: 600;
    line-height: normal;
  }
  @media (max-width: 1800px) {
    grid-template-columns: 1fr;
    grid-auto-columns: 1fr;
  }
`;

export const CallBackButton = styled(CommonButton)``;
export const EditButton = styled(CommonButton)``;
export const CancelButton = styled(CommonButton)``;
export const RecordButton = styled(CommonButton)``;

export const EmptyContent = styled(FlexContainer)`
  padding: 18px;
  justify-content: center;
`;
