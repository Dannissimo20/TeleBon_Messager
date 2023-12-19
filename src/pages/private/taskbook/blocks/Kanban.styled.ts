import styled from 'styled-components';

export const NewWrapper = styled.div`
  .wrapperKanban {
    width: 100%;
    margin: 0 auto;
    padding: 0 0.5rem;
    display: flex;
    min-height: 80vh;
    height: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    &::-webkit-scrollbar {
      width: 6px;
      border-radius: 8px;
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      background: ${(props) => props.theme.color.secondaryMedium};
      border-radius: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.color.secondaryDark};
      border-radius: 20px;
    }
    //max-height: calc(100vh - 16.5rem);
    > div {
      > div {
        height: 100%;
      }
    }
  }
`;
