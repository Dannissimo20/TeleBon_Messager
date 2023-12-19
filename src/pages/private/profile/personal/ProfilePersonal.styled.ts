import styled from 'styled-components';

export const ProfileAvatarBox = styled.div`
  position: relative;
  border-radius: 50%;
  width: 80px;
  min-width: 80px;
  height: 80px;
  overflow: hidden;
`;

export const ProfileAvatar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.color.mainLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.color.bg};
  inset: 0;
`;
export const PersonalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;
export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  p {
    font-size: 16px;
    font-weight: 500;
    &.gray {
      color: rgba(108, 110, 124, 1);
    }
  }
`;

export const PersonalTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
  align-items: center;
  justify-content: space-between;
  svg {
    color: ${(props) => props.theme.color.success};
    margin-left: 20px;
  }
  span {
    font-weight: 500;
    &.dot {
      display: block;
      position: relative;
      width: 4px;
      height: 4px;
      background: ${(props) => props.theme.color.mainDark};
      border-radius: 50%;
    }
  }
`;
export const EditWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  background: rgba(237, 241, 255, 1);
  border-radius: 16px;
  font-size: 14px;
  padding: 12px 20px;
  align-items: center;
  justify-content: space-between;
  button{
    padding: 0;
    font-size: 14px;
  }
`;
