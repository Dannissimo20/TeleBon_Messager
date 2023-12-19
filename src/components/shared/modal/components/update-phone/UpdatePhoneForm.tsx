import { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import { Form } from './UpdatePhoneForm.styled';

import ModalStore from '../../../../../store/modalStore';
import UserStore from '../../../../../store/userStore';
import { FlexContainer, FlexWithAlign } from '../../../../../utils/styleUtils';
import { EIcon, IconNew as IconInstance } from '../../../../icons/medium-new-icons/icon';
import CommonButton from '../../../button/CommonButton';
import CommonInputPhone from '../../../fields/common-input-phone/CommonInputPhone';

interface IProps {
  modalPayload: any;
  userStore?: UserStore;
  modalStore?: ModalStore;
}

const UpdatePhoneForm: React.FC<IProps> = observer(({ modalStore, modalPayload, userStore }) => {
  const { profileUser, updateUser } = userStore!;
  const { t } = useTranslation();

  const initialValues = {
    phone: ''
  };

  const formik = useFormik({
    initialValues: modalPayload ? modalPayload : initialValues,
    onSubmit: () => {}
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    updateUser(profileUser.id, formik.values);
    modalStore?.closeModal();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FlexContainer $column>
        <CommonInputPhone
          label={t('Телефон')}
          value={formik.values.phone}
          onChange={formik.handleChange('phone')}
          name={'phone'}
          simple
        >
          <IconInstance name={EIcon.phone} />
        </CommonInputPhone>
        <FlexWithAlign $alignCenter={'center'}>
          <CommonButton
            typeBtn='ghost'
            onClick={(e) => {
              e.preventDefault();
              modalStore?.closeModal();
            }}
          >
            <span>{t('Отменить')}</span>
          </CommonButton>
          <CommonButton
            typeBtn='primary'
            disabled={!formik.isValid}
          >
            <span>{t('Сохранить')}</span>
          </CommonButton>
        </FlexWithAlign>
      </FlexContainer>
    </Form>
  );
});

export default inject('userStore', 'modalStore')(UpdatePhoneForm);
