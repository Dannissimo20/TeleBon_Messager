import { SyntheticEvent } from 'react';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import UserStore from '../../../../../store/userStore';
import { FlexContainer } from '../../../../../utils/styleUtils';
import CommonButton from '../../../button/CommonButton';
import CommonInputPhone from '../../../fields/common-input-phone/CommonInputPhone';
import { Form } from './UpdatePhoneForm.styled';

interface IProps {
  modalPayload: any;
  userStore?: UserStore;
}

const UpdatePhoneForm: React.FC<IProps> = observer(({ modalPayload, userStore }) => {
  const { profileUser, updateUser } = userStore!;

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
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FlexContainer>
        <CommonInputPhone
          label={'Телефон'}
          value={formik.values.phone}
          onChange={formik.handleChange('phone')}
          name={'phone'}
        />
        <CommonButton
          colored={true}
          typeBtn='success'
        >
          <span>Сохранить телефон</span>
        </CommonButton>
      </FlexContainer>
    </Form>
  );
});

export default inject('userStore')(UpdatePhoneForm);
