import { inject, observer } from 'mobx-react';

import CommonButton from '../CommonButton';
import { EIcon, IconNew as IconInstance } from '../../../icons/medium-new-icons/icon';
import ModalStore from '../../../../store/modalStore';
import { ButtonInner, Icon, Notifications, Wrapper, Text } from './CreateTicketButton.styled';

interface IProps {
  modalStore?: ModalStore;
  payload?: any;
}

const CreateTicketButton: React.FC<IProps> = observer((props) => {
  const { modalStore, payload } = props;

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
          <Text>Тикет</Text>
        </ButtonInner>
      </CommonButton>
      {payload.length ? <Notifications>{payload.length ? payload.length : null}</Notifications> : null}
    </Wrapper>
  );
});

export default inject('modalStore')(CreateTicketButton);
