import { styled } from 'styled-components';
import { FlexContainer } from '../../../../../utils/styleUtils';

export const IconWrap = styled.div`
  display: flex;
  position: relative;
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.color.danger};
`;

export const Notifications = styled.div`
  position: absolute;
  top: -8px;
  right: -10px;
  border: 2px solid #fff;
  color: #fff;
  font-size: 12px;
  line-height: 100%;
  background: ${(props) => props.theme.color.danger};
  border-radius: 24px;
  padding: 2px 8px;
`;

export const Box = styled(FlexContainer)``;

export const TimeWrap = styled.div`
  .text {
    display: inline-block;
    font-weight: 600;
    line-height: 18px;
    color: rgba(41, 47, 81, 0.5);
    max-width: 157px;
  }
  .time {
    display: inline-block;
    margin-left: 6px;
    color: ${(props) => props.theme.color.success};
  }
`;
export const ContentTable = styled.ul`
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  width: 100%;
`;

export const TableRow = styled.li`
  display: grid;
  grid-template-columns: repeat(auto-fill, 20%);
  padding: 18px;
  font-size: 14px;
  letter-spacing: 0.14px;

  &:not(:last-child) {
    border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
  }
  &.head {
    font-weight: 600;
  }
`;