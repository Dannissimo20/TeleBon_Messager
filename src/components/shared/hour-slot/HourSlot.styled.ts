import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  padding: 10px 20px;
  height: 54px;
  &:not(:last-of-type) {
    border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
  }
`;
export const InnerContainer = styled.div`
  position: relative;
  display: flex;
  background: ${(props) => props.theme.color.mainLight}1a;
  padding: 7px 0;
  border-radius: 8px;
  min-height: 34px;

  &.disabled {
    background: ${(props) => props.theme.color.secondaryLight};
  }
`;
export const Value = styled.div`
  position: relative;
  display: flex;
  color: ${(props) => props.theme.color.mainLight};
  font-size: 14px;
  padding-left: 12px;
  svg {
    position: absolute;
    left: 0;
    top: -2px;
    height: 24px;
  }
`;
export const Box = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;

  &:last-of-type {
    justify-content: space-between;

    ${Value} {
      padding-right: 12px;
      color: ${(props) => props.theme.color.success};
      svg {
        left: unset;
        top: -2px;
        right: 0;
      }
    }
  }
`;
export const Appointments = styled.div`
  position: relative;
  margin-right: 12px;
  &.inverted {
    margin-left: 12px;
  }
`;
export const Divider = styled.div`
  position: absolute;
  left: 50%;
  opacity: 0.1;
  background: ${(props) => props.theme.color.mainDark};
  width: 1px;
  height: 21px;
`;
export const ManWrap = styled.a<any>`
  position: absolute;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #fff;
  top: -2px;
  background: ${(props) => props.theme.color[props.$color]};
  right: ${(props) => (props.$inverted ? 'unset' : props.$margin)};
  left: ${(props) => (props.$inverted ? props.$margin : 'unset')};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const TooltipsContainer = styled.div`
  .tooltip {
    -webkit-box-shadow: 0px 3px 10px 0px rgba(41, 47, 81, 0.5);
    -moz-box-shadow: 0px 3px 10px 0px rgba(41, 47, 81, 0.5);
    box-shadow: 0px 3px 10px 0px rgba(41, 47, 81, 0.5);
  }
`;
