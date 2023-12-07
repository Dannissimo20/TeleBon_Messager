import { inject, observer } from 'mobx-react';

import Breadcrumbs from '../../../breadcrumbs/Breadcrumbs';
import NewAppointmentForm from './new/NewAppointmentForm';

import { Padding } from '../../../../../utils/styleUtils';
import { Title, Wrapper } from './AppointmentModal.styled';

interface IProps {
  closeModal?: () => void;
  modalPayload?: any;
}

const AppointmentModal: React.FC<IProps> = observer(({ modalPayload }) => {
  const crumbs = ['Первичное', 'Запись'];

  return (
    <Wrapper>
      <Title>Новая запись</Title>
      <Padding $size='12px' />
      <Breadcrumbs crumbs={crumbs} />
      <NewAppointmentForm payload={modalPayload} />
    </Wrapper>
  );
});

export default inject()(AppointmentModal);
