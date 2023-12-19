import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { ButtonInner, Icon, Notifications, Wrapper, Text } from './CreateTicketButton.styled';

import ModalStore from '../../../../store/modalStore';
import { EIcon, IconNew as IconInstance } from '../../../icons/medium-new-icons/icon';
import CommonButton from '../CommonButton';

interface IProps {
  modalStore?: ModalStore;
  payload?: any;
}

const CreateTicketButton: React.FC<IProps> = observer((props) => {
  const { modalStore, payload } = props;
  const { t } = useTranslation();
  const openTicketModal = () => {
    modalStore?.openModal({
      name: 'TICKET',
      payload: payload,
      isDanger: true,
      classModal: 'ticket'
    });
  };

  return (
    <Wrapper>
      <CommonButton
        gap={'12px'}
        //onClick={() => openTicketModal()}
        onClick={() => {}}
      >
        <ButtonInner className='flex'>
          <Icon>
            <IconInstance name={EIcon.ticket} />
          </Icon>
          <Text>{t('Тикет')}</Text>
        </ButtonInner>
      </CommonButton>
      {payload.length ? <Notifications>{payload.length ? payload.length : null}</Notifications> : null}
    </Wrapper>
  );
});

export default inject('modalStore')(CreateTicketButton);
