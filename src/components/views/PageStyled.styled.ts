import styled from 'styled-components';
import { scaleIn } from '../shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

export const RegAuthWrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (max-width: 1500px) {
    gap: 32px;
  }
`;

export const InformationWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.color.secondaryLight};
  border-radius: 20px;
  width: 100%;
  box-shadow: 0 3.2px 9px 0 rgba(0, 0, 0, 0.16), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.1), 0px -1.5px 6px 0px rgba(0, 0, 0, 0.06);
  padding: 20px;
  animation: ${scaleIn} 0.3s ease;
`;