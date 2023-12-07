import { inject, observer } from 'mobx-react';

import { Title } from './ProfileManagementModal.styled';

import UserStore from '../../../../../store/userStore';
import { FlexContainer } from '../../../../../utils/styleUtils';
import UpdatePasswordForm from '../../components/update-password/UpdatePasswordForm';
import UpdatePhoneForm from '../../components/update-phone/UpdatePhoneForm';

interface IProps {
  closeModal?: () => void;
  modalPayload?: any;
  userStore?: UserStore;
}

const ProfileManagementModal: React.FC<IProps> = observer(({ closeModal, modalPayload, userStore }) => {
  const { profileUser, updateUser } = userStore!;

  const dateRegistr = new Date(profileUser.dtreg);

  return (
    <div>
      <Title>Управление профилем</Title>
      <FlexContainer>
        <span>Имя: {profileUser.fio ? profileUser.fio : 'Пользователь'}</span>
        <span>Email: {profileUser.Email ? profileUser.Email : 'example@example.com'}</span>
        <span>Зарегистрирован: {dateRegistr.toISOString().split('T')[0]}</span>
      </FlexContainer>
      <UpdatePhoneForm modalPayload={modalPayload} />
      <UpdatePasswordForm />
    </div>
  );
});

export default inject('userStore')(ProfileManagementModal);
