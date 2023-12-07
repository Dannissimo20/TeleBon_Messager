import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (max-width: 1500px) {
    gap: 32px;
  }
`;

export const Box = styled.div`
  display: flex;
  gap: 24px;
`;

export const EmptyContent = styled.div`
  padding: 20px;
  width: calc(1150 / 1452 * 100%);
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
`;
