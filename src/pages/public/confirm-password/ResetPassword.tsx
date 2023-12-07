import { FormEvent, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import { FormResetPassword, Login, LogoPasswordNoFlex, RecoveryText, WrapperPassword } from './Password.styled';

import { LoginLogo } from '../../../components/icons';
import { ReactComponent as Email } from '../../../components/icons/email.svg';
import CommonButton from '../../../components/shared/button/CommonButton';
import CommonInput from '../../../components/shared/fields/CommonInput';
import { apiPost } from '../../../utils/apiInstance';
import { validationSchema } from '../../../utils/validation-input';

export const ResetPassword: React.FC = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const initialValues = {
    email: ''
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {},
    validationSchema,
    validateOnChange: true
  });

  useEffect(() => {
    if (formik.errors.email === undefined && formik.touched.email && formik.values.email.trim() !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formik.values, formik.errors, formik.touched]);

  const notify = (msg: string) => {
    toast.error(msg);
  };

  const resetPassword = async () => {
    setPending(true);
    const res = await apiPost('/recovery', {
      email: formik.values.email
    });
    setPending(false);
    if (res.status === 200) {
      toast.success(`Ссылка для сброса пароля отправлена на ${formik.values.email}`);
      formik.resetForm();
    } else {
      notify('На данную электронную почту пользователь не зарегистрирован');
    }
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    resetPassword();
  };

  return (
    <WrapperPassword>
      <RecoveryText>{t('Восстановление пароля')}</RecoveryText>
      <FormResetPassword onSubmit={handleSubmit}>
        <CommonInput
          name='email'
          label='email'
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          formik={formik}
        >
          <Email />
        </CommonInput>
        <CommonButton
          color={'mainLight'}
          highlighted
          disabled={!isValid}
          fullWidth
        >
          {t('Сброс пароля')}
        </CommonButton>
      </FormResetPassword>
      <Login>
        <LogoPasswordNoFlex>
          <LoginLogo />
        </LogoPasswordNoFlex>
      </Login>
    </WrapperPassword>
  );
};
