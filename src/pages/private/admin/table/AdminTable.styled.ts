import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 40px;
`;
export const Table = styled.div`
  padding-top: 40px;
`;
export const Heading = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 2fr 1fr 1fr 2fr;
  border-bottom: 2px solid ${(props) => props.theme.color.secondaryMedium};
  border-right: 2px solid ${(props) => props.theme.color.secondaryMedium};
  border-left: 2px solid ${(props) => props.theme.color.secondaryMedium};
  overflow: hidden;
  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &.tableHeader {
    color: #fff;
    border-top: 2px solid ${(props) => props.theme.color.secondaryMedium};
    border-bottom: none;
    text-align: center;
    font-weight: bold;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    > div {
      background: ${(props) => props.theme.color.mainLight};
      border-radius: 8px;
    }
  }
  > div {
    border-right: 2px solid ${(props) => props.theme.color.secondaryMedium};
    border-bottom: none;
    &:last-of-type {
      border-right: none;
    }
    padding: 15px;
  }
`;