import styled from 'styled-components';

import CommonCalendar from '../../../components/shared/calendar/CommonCalendar';
import { scaleIn } from '../../../components/shared/modal/create/service/sidebar/CreateServiceSidebar.styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${scaleIn} 0.3s ease;
  border-radius: 8px;
  margin-top: 12px;
  min-width: 249px;
  max-width: 249px;
  background: rgba(73, 111, 255, 0.1);
  width: 100%;
`;

const ProductsCalendar = ({ currentView }: any) => {
  return (
    <Wrapper>
      <CommonCalendar currentView={currentView} />
    </Wrapper>
  );
};

export default ProductsCalendar;
