import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import { Login, LogoPasswordFlex, RecoveryText, WrapperPassword, FormNewPassword } from './Password.styled';

import { LoginLogo } from '../../../components/icons';
import { ReactComponent as HidePassword } from '../../../components/icons/hidepassword.svg';
import { ReactComponent as Lock } from '../../../components/icons/lock.svg';
import { ReactComponent as ShowPassword } from '../../../components/icons/showpassword.svg';
import CommonButton from '../../../components/shared/button/CommonButton';
import CommonInput from '../../../components/shared/fields/CommonInput';
import { apiPost } from '../../../utils/apiInstance';
import { validationPasswordSchema } from '../../../utils/validation-input';

export const NewPassword: React.FC = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation();

  const { refreshToken } = useParams();

  const initialValues = {
    password: '',
    confirmpassword: ''
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {},
    validationSchema: validationPasswordSchema,
    validateOnMount: true,
    validateOnChange: true
  });

  const nav = useNavigate();

  const goTo = (url: string) => {
    nav(url);
  };

  const notify = (msg: string) => {
    toast.error(msg);
  };

  const newPassword = async () => {
    setPending(true);
    const res = await apiPost('/update', {
      ...formik.values,
      refreshtoken: refreshToken
    });
    setPending(false);

    if (res.status === 200) {
      goTo('/password/success');
    } else {
      notify(res.data.description);
    }
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    newPassword();
  };

  return (
    <WrapperPassword>
      <RecoveryText>{t('Новый пароль')}</RecoveryText>
      <FormNewPassword onSubmit={handleSubmit}>
        <CommonInput
          name={'password'}
          label={'Новый пароль'}
          type={showPassword ? 'text' : 'password'}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
          formik={formik}
        >
          {!showPassword ? (
            <ShowPassword
              onClick={() => setShowPassword(true)}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <HidePassword
              onClick={() => setShowPassword(false)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </CommonInput>
        <CommonInput
          name={'confirmpassword'}
          label={'Подтверждение пароля'}
          type={showPassword ? 'text' : 'password'}
          onBlur={formik.handleBlur}
          value={formik.values.confirmpassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmpassword && formik.errors.confirmpassword}
          formik={formik}
        >
          <Lock style={{ cursor: 'pointer' }} />
        </CommonInput>
        <CommonButton
          color={'mainLight'}
          highlighted
          disabled={!formik.isValid}
          fullWidth
        >
          {t('Установить пароль')}
        </CommonButton>
      </FormNewPassword>
      <Login>
        <LogoPasswordFlex href='/'>
          <LoginLogo />
        </LogoPasswordFlex>
      </Login>
    </WrapperPassword>
  );
};
