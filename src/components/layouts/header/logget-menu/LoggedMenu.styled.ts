import styled from 'styled-components';
import { scaleIn } from '../../../shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

export const Box = styled.div`
  display: flex;
  align-items: center;
  > div {
    cursor: pointer;
    .name {
      transition: 0.3s ease;
    }
  }
  &:hover {
    .name {
      color: ${(props) => props.theme.color.mainLight};
    }
  }
  > div {
    align-items: center;
  }
`;
export const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
`;
export const Avatar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.color.mainLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.color.bg};
  inset: 0;
  border-radius: 8px;
`;
export const AvatarBox = styled.div`
  position: relative;
  border-radius: 8px;
  width: 42px;
  height: 42px;
`;
export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 8px);
  max-width: 308px;
  width: 100%;
  right: 40px;
  border-radius: 8px;
  z-index: 10;
  animation: ${scaleIn} .3s ease;
  padding: 12px 0;
  background: ${(props) => props.theme.color.mainLight};
  &:before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    background: ${(props) => props.theme.color.mainLight};
    top: -5px;
    right: 15px;
  }
  .user{
    padding: 0 24px;
    display: flex;
    gap: 12px;
    align-items: center;
    div {
      div{
        background: rgba(255,255,255,.1);
      }
    }
    h4, p{
      color: #fff;
    }
    p{
      font-size: 14px;
      max-width: 157px;
    }
  }
    li{
      padding: 0 24px;
      a, button, p {
        display: flex;
        width: 100%;
        gap: 12px;
        color: #fff;
        align-items: center;
        font-weight: 600;
        padding: 12px;
        border-radius: 8px;
        transition: .3s ease;
        &:hover {
          background: rgba(255,255,255,.1);
        }
      }
        p{
            &:hover {
                cursor: no-drop;
            }
        }
    }
  }

`;
export const Line = styled.span`
  position: relative;
  width: 100%;
  height: 1px;
  margin: 12px 0;
  opacity: 0.2;
  background: ${(props) => props.theme.color.secondaryMedium};
  @media (max-width: 1500px) {
    margin: 10px 0;
  }
`;
export const Icon = styled.div`
  display: flex;
`;