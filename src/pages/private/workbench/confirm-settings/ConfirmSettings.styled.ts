import styled from 'styled-components';
import { scaleIn } from '../../../../components/shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

export const ConfirmButton = styled.button`
  background: linear-gradient(92deg, #a56eff 6.01%, #bc93ff 83.02%);
  border: none;
  border-radius: 16px;
  padding: 20px 32px 32px 26px;
  position: relative;
  overflow: hidden;
  animation: ${scaleIn} 0.5s ease;
  &:before {
    content: '';
    width: 356px;
    height: 356px;
    background: linear-gradient(110deg, #ccacff 6.41%, rgba(190, 149, 255, 0) 73.11%);
    position: absolute;
    right: 0;
    top: 24px;
    border-radius: 50%;
  }
  display: flex;
  flex-direction: column;
  gap: 8px;
  p,
  h2 {
    color: #fff;
  }
  p {
    font-size: 18px;
  }
  svg {
    color: #fff;
    transform: rotate(45deg);
    position: absolute;
    top: 20px;
    right: 32px;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
      transform: rotate(45deg) scale(1.2);
    }
  }
`;
