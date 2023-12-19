import { inject, observer } from 'mobx-react';

import { ProfileManagementWrapper, Title } from './ProfileManagementModal.styled';

import UserStore from '../../../../../store/userStore';
import { FlexContainer } from '../../../../../utils/styleUtils';
import UpdatePasswordForm from '../../components/update-password/UpdatePasswordForm';
import UpdatePhoneForm from '../../components/update-phone/UpdatePhoneForm';
import UpdateNameForm from '../../components/update-name/UpdateNameForm';
import { useTranslation } from 'react-i18next';

interface IProps {
  closeModal?: () => void;
  modalPayload?: any;
  userStore?: UserStore;
}

const ProfileManagementModal: React.FC<IProps> = observer(({ closeModal, modalPayload, userStore }) => {
  const { profileUser, updateUser } = userStore!;
  const { t } = useTranslation();
  const dateRegistr = new Date(profileUser.dtreg);

  return (
    <ProfileManagementWrapper>
      <Title>
        {modalPayload.type === 'fio'
          ? t('Изменить ФИО')
          : modalPayload.type === 'phone'
          ? t('Изменить телефон')
          : modalPayload.type === 'password' && t('Изменить пароль')}
      </Title>
      {modalPayload.type === 'password' && (
        <p>
          {t(
            'Требования к паролю - он должен: - включать не менее 8 символов - включать маленькие и большие буквы латинского алфавита -включать числа - специальные символы (типа %^& и т.д.)'
          )}
        </p>
      )}
      <FlexContainer></FlexContainer>
      {modalPayload.type === 'fio' && <UpdateNameForm modalPayload={modalPayload.info} />}
      {modalPayload.type === 'phone' && <UpdatePhoneForm modalPayload={modalPayload.info} />}
      {modalPayload.type === 'password' && <UpdatePasswordForm />}
    </ProfileManagementWrapper>
  );
});

export default inject('userStore')(ProfileManagementModal);
