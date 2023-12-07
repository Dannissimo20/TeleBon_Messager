import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  .heading {
    > div {
      > div {
        max-width: 320px;
        width: 100%;
      }
    }
  }
  .content {
    flex-wrap: wrap;
    > div {
      border: 2px solid ${(props) => props.theme.color.mainLight};
      padding: 12px 24px;
      border-radius: 8px;
      color: ${(props) => props.theme.color.mainLight};
    }
  }
`;
