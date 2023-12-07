import styled from 'styled-components';

export const RegAuthWrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (max-width: 1500px) {
    gap: 32px;
  }
`;