import styled from 'styled-components';

export const ProfileScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  >div{
    display: flex;
    align-items: center;
    gap: 24px;
    h3{
      margin-bottom: 0;
    }
    >div{
      background: rgba(237, 241, 255, 1);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px;
      svg{
        width: 25.6px;
        height: 27.2px;
        color: ${(props) => props.theme.color.mainLight};
      }
    }
  }
`;