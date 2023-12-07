import styled from 'styled-components';

export const Form = styled.div`
  margin-top: 68px;
  width: 100%;
  max-width: 480px;
`;
export const Colored = styled.span`
  color: ${(props) => props.theme.color.mainLight};
`;

export const WrongPassWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
