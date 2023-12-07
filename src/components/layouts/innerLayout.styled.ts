import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  font-size: 16px;
  line-height: 125%;
  max-width: 100%;
`;
export const Content = styled.div`
  height: 100%;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(1608 / 1920 * 100%);
  @media (max-width: 1700px) {
    max-width: calc(100% - 305px);
    width: calc(1573 / 1920 * 100%);
  }
`;
export const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
  @media (max-width: 1700px) {
    padding: 22px 40px 32px 32px;
  }
`;