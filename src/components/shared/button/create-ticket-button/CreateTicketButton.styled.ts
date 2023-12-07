import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  margin: 0 12px;
  button {
    transition: 0.3s ease;
    &:hover {
      background: rgba(255, 69, 58, 0.1);
      opacity: 1;
      cursor: no-drop;
      color: ${(props) => props.theme.color.danger};
    }
  }
`;
export const ButtonInner = styled.div`
  gap: 12px;
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
export const Icon = styled.div`
  display: flex;
`;

export const Text = styled.span`
  line-height: 18px;
`;
