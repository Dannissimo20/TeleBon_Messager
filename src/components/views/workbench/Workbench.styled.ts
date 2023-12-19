import styled from 'styled-components';
import { scaleIn } from '../../../components/shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  .left {
    min-width: 320px;
    max-width: 320px;
    width: 100%;
  }
  .right {
    width: 100%;
  }
`;

export const WorkbenchSubTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg{
    transform: rotate(180deg);
    transition: .3s ease;
    &:hover{
      color: ${(props) => props.theme.color.mainLight};
    }
  }
`;


export const WorkbenchText = styled.h4`
  font-size: 14px;
  font-weight: 600;
`;
export const WorkbenchSubText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color ${(props) => props.theme.color.secondaryMedium};
  opacity: .6;
`;

export const CalendarContent = styled.div`
  animation: ${scaleIn} 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid ${(props) => props.theme.color.secondaryMedium};
  > div {
    svg {
      color: rgba(164, 183, 255, 1);
    }
    > div {
      p {
        font-size: 14px;
        width: fit-content;
        margin-left: auto;
        font-weight: 600;
        padding: 4px 8px;
        background: rgba(242, 201, 76, 1);
        color: #fff;
        border-radius: 8px;
        &.confirmed {
          background: rgba(111, 207, 151, 1);
        }
      }
    }
  }
  &.clients,
  &.tasks {
    > span {
      position: absolute;
      top: 10px;
      right: 12px;
      background: rgba(86, 204, 242, 1);
      border-radius: 8px;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      padding: 4px 8px;
    }
    > div {
      width: 80%;
    }
  }
  &.tasks {
    height: 64px;
    min-height: 66px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 6px;
      border-radius: 8px;
    }
    &::-webkit-scrollbar-track {
      background: ${(props) => props.theme.color.secondaryMedium};
      border-radius: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.color.secondaryDark};
      border-radius: 20px;
    }
  }
`;
