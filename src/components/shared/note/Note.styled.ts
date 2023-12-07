import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  background: ${(props) => props.theme.color.yellow}33;
  border-radius: 8px;
  padding: 12px 38px 12px 12px;
  margin-bottom: 12px;
  width: 100%;
`;
export const Text = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.color.mainDark};
`;
export const Date = styled.div`
  margin-top: 24px;
  font-size: 12px;
  color: ${(props) => props.theme.color.mainDark};
`;
export const CloseBtn = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  svg {
    color: ${(props) => props.theme.color.mainDark};
    opacity: 1;
  }
`;
