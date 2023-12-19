import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { Title, Wrapper } from './AppointmentModal.styled';
import NewAppointmentForm from './new/NewAppointmentForm';

import { Padding } from '../../../../../utils/styleUtils';
import Breadcrumbs from '../../../breadcrumbs/Breadcrumbs';

interface IProps {
  closeModal?: () => void;
  modalPayload?: any;
}

const AppointmentModal: React.FC<IProps> = observer(({ modalPayload }) => {
  const { t } = useTranslation();
  const crumbs = ['Первичное', 'Запись'];

  return (
    <Wrapper>
      <Title>{t('Новая запись')}</Title>
      <Padding $size='12px' />
      <Breadcrumbs crumbs={crumbs} />
      <NewAppointmentForm payload={modalPayload} />
    </Wrapper>
  );
});

export default inject()(AppointmentModal);
