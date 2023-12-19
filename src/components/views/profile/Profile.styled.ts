import styled from 'styled-components';

export const ProfilePageWrapper = styled.div`
  width: 100%;
  > div {
    &:nth-child(2) {
      margin-top: 40px;
    }
    > div {
      width: 100%;
      > div {
        width: 100%;
      }
    }
  }
  .left {
    min-width: 320px;
    max-width: 320px;
    width: 100%;
  }
  .right {
    width: 100%;
  }
`;
