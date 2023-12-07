import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import { Form } from './UpdatePasswordForm.styled';

import UserStore from '../../../../../store/userStore';
import { apiPost } from '../../../../../utils/apiInstance';
import { FlexContainer } from '../../../../../utils/styleUtils';
import { validationPasswordSchema } from '../../../../../utils/validation-input';
import { ReactComponent as HidePassword } from '../../../../icons/hidepassword.svg';
import { ReactComponent as ShowPassword } from '../../../../icons/showpassword.svg';
import CommonButton from '../../../button/CommonButton';
import CommonInput from '../../../fields/CommonInput';

interface IProps {
  userStore?: UserStore;
}

const UpdatePasswordForm: React.FC<IProps> = observer(({ userStore }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { t } = useTranslation();

  const initialValues = {
    password: '',
    confirmpassword: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {},
    validateOnMount: true,
    validationSchema: validationPasswordSchema
  });

  const newPassword = async (values: any) => {
    const res = await apiPost('/users/changepassword', values);

    if (res.status === 200) {
      toast.success('Пароль обновлен');
    } else {
      toast.error(res.data.description);
    }
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    newPassword(formik.values);
  };

  return (
    <Form
      className='password-form'
      onSubmit={handleSubmit}
    >
      <FlexContainer className='password-form-wrapper'>
        <CommonInput
          label={'Новый пароль'}
          name={'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type={!showPassword ? 'password' : 'text'}
          error={formik.touched.password && formik.errors.password}
        >
          {!showPassword ? (
            <ShowPassword
              className='icon flex'
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <HidePassword
              onClick={() => setShowPassword(false)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </CommonInput>
        <CommonInput
          label={'Подтверждение пароля'}
          name={'confirmpassword'}
          value={formik.values.confirmpassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type={!showConfirmPassword ? 'password' : 'text'}
          error={formik.touched.confirmpassword && formik.errors.confirmpassword}
        >
          {!showConfirmPassword ? (
            <ShowPassword
              className='icon flex'
              onClick={() => setShowConfirmPassword(true)}
            />
          ) : (
            <HidePassword
              onClick={() => setShowConfirmPassword(false)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </CommonInput>
        <CommonButton
          colored={true}
          typeBtn='success'
          disabled={!formik.isValid}
        >
          <span>{t('Сохранить пароль')}</span>
        </CommonButton>
      </FlexContainer>
    </Form>
  );
});

export default inject('userStore')(UpdatePasswordForm);
