import styled from 'styled-components';

export const DayCellWrapper = styled.div`
  > div {
    .date{
      display: flex;
      gap: 4px;
      span{
        font-size: 16px;
        font-weight: 600;
      }
     &.weekend{
       color: ${(props) => props.theme.color.danger};
     } 
    }
    > div {
      display: flex;
      flex-direction: column;
      p {
        font-size: 10px;
        line-height: 14px;
        color: rgba(108, 110, 124, 1);
        position: relative;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .emptyEvents {
    font-size: 10px;
    line-height: 14px;
    position: absolute;
    color: rgba(108, 110, 124, 1);
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  .eventsLength{
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme.color.mainLight};
  }
`;
