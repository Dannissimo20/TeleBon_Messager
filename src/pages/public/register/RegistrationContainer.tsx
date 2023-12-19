import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import CommonButton from '../../../components/shared/button/CommonButton';
import CommonInput from '../../../components/shared/fields/CommonInput';
import CommonInputPhone from '../../../components/shared/fields/common-input-phone/CommonInputPhone';
import CommonLoader from '../../../components/shared/loader/CommonLoader';
import { CallIcon, UserRegistrationIcon } from '../../../components/icons';

import { ReactComponent as Email } from '../../../components/icons/email.svg';
import { ReactComponent as Lock } from '../../../components/icons/lock.svg';
import UserStore from '../../../store/userStore';
import { apiGet, apiPost, apiPut } from '../../../utils/apiInstance';
import { setCookie } from '../../../utils/cookies';
import { Padding } from '../../../utils/styleUtils';
import { validationSchema } from '../../../utils/validation-input';
import { Colored, Form, LoaderPosition, Policy } from './RegistrationContainer.styled';
import { useTranslation } from 'react-i18next';

const RegistrationContainer: React.FC<{ userStore?: UserStore }> = (props) => {
  const [screen, setScreen] = useState<number>(1);
  const [pending, setPending] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [isFirstFormValid, setIsFirstFormValid] = useState(false);
  const [isSecondFormValid, setIsSecondFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [filials, setFilials] = useState<'1' | 'Несколько' | '0'>('1');
  const { t } = useTranslation();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    brand: '',
    city: '',
    filials: '',
    password: '',
    confirmpassword: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values: any) => {},
    validateOnBlur: true
  });
  useEffect(() => {
    if (
      formik.values.phone.trim() !== '' &&
      formik.values.email.trim() !== '' &&
      formik.values.password.trim() !== '' &&
      formik.values.confirmpassword.trim() !== '' &&
      policy
    ) {
      setIsFirstFormValid(true);
    } else {
      setIsFirstFormValid(false);
    }
  }, [formik.values, policy]);

  useEffect(() => {
    if (formik.values.name.trim() !== '' && formik.values.brand.trim() !== '' && formik.values.city.trim() !== '') {
      setIsSecondFormValid(true);
    } else {
      setIsSecondFormValid(false);
    }
  }, [formik.values]);
  const nav = useNavigate();

  const goTo = (url: string) => {
    nav(url);
  };

  const notify = (msg: string) => {
    toast.error(msg);
  };

  const createService = async (serviceName: string) => {
    setPending(true);
    const res = await apiPut('/product', { name: serviceName });
    setPending(false);
    if (res.status === 200) {
      return res.data.id;
    } else {
      notify(res.data.description);
    }
  };
  const createSubservice = async (subserviceName: string, serviceId: string | undefined) => {
    setPending(true);
    const res = await apiPut(`/subproduct/${serviceId}`, { name: subserviceName, duration: '1' });
    setPending(false);
    if (res.status === 200) {
      console.log('ok');
    } else {
      notify(res.data.description);
    }
  };

  const createKanbanColumn = async () => {
    setPending(true);
    await apiPut('tasker/columns', { name: 'Открыта' });
    await apiPut('tasker/columns', { name: 'В работе' });
    await apiPut('tasker/columns', { name: 'Готова' });
    setPending(false);
  };

  const auth = async () => {
    setPending(true);
    const res = await apiPost('/auth', {
      username: formik.values.email,
      password: formik.values.password
    });
    setPending(false);
    if (res.status === 200) {
      setCookie('auth', res.data.token);
      setCookie('id', res.data.id);
      const productId = await createService('Категория услуг');
      await createSubservice('Ваша услуга', productId);
      await apiGet('/tarif/promo')
      await createKanbanColumn();

      goTo('/products/cabinets');
    } else {
      notify(res.data.description);
    }
  };

  const register = async () => {
    setPending(true);
    const res = await apiPut('/registry', {
      email: formik.values.email,
      phone: formik.values.phone,
      password: formik.values.password,
      confirmpassword: formik.values.confirmpassword
    });
    setPending(false);
    if (res.status === 200) {
      setScreen(2);
    } else {
      notify(res.data.description);
    }
  };
  const registerSecond = async () => {
    setPending(true);
    const res = await apiPost('/registry2', {
      name: formik.values.name,
      email: formik.values.email,
      brand: formik.values.brand,
      city: formik.values.city,
      dolgnost: 'Менеджер',
      filials: filials
    });

    setPending(false);
    if (res.status === 200) {
      auth();
    } else {
      notify(res.data.description);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    registerSecond();
  };

  const firstRegistry = () => {
    register();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <Form onSubmit={(e: any) => handleSubmit(e)}>
      {pending && (
        <LoaderPosition>
          <CommonLoader />
        </LoaderPosition>
      )}
      {screen === 1 && (
        <>
          <h2 className='first'>{t('Регистрация')}</h2>
          <CommonInputPhone
            type={'tel'}
            name={'phone'}
            label={t('Мобильный телефон')}
            value={formik.values.phone}
            onChange={formik.handleChange('phone')}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
            formik={formik}
          >
            <CallIcon />
          </CommonInputPhone>
          <Padding $size='24px' />
          <CommonInput
            type={'email'}
            name={'email'}
            label={t('Email')}
            onBlur={(e: any) => {
              formik.handleBlur(e);
              formik.values.email = e.target.value.toLocaleLowerCase();
            }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email}
            formik={formik}
          >
            <Email />
          </CommonInput>
          <Padding $size='24px' />
          <CommonInput
            name={'password'}
            label={t('Пароль')}
            type={showPassword ? 'text' : 'password'}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            formik={formik}
          >
            <Lock
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
            />
          </CommonInput>
          <Padding $size='24px' />
          <CommonInput
            name={'confirmpassword'}
            label={t('Подтверждение пароля')}
            type={showPassword2 ? 'text' : 'password'}
            onBlur={formik.handleBlur}
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmpassword && formik.errors.confirmpassword}
            formik={formik}
          >
            <Lock
              onClick={togglePasswordVisibility2}
              style={{ cursor: 'pointer' }}
            />
          </CommonInput>
          <Padding $size='24px' />
          <Policy className='flex'>
            <input
              type='checkbox'
              onChange={() => setPolicy(!policy)}
              checked={policy}
            />
            <p>
              <span>{t('Я принимаю условия')} </span>
              <a href='#'>{t('лицензионного договора и разрешаю обработку персональных данных')}</a>
            </p>
          </Policy>
          <Padding $size='60px' />
          <CommonButton
            type='button'
            onClick={firstRegistry}
            typeBtn='primary'
            fullWidth
            disabled={
              !formik.isValid ||
              !policy ||
              formik.values.email === '' ||
              formik.values.phone === '' ||
              formik.values.password === '' ||
              formik.values.confirmpassword === ''
            }
          >
            {t('Зарегистрироваться')}
          </CommonButton>
          <Padding $size='24px' />
          <CommonButton
            fullWidth={true}
            onClick={() => goTo('/auth')}
          >
            <span>{t('Есть аккаунт')}? </span>
            <Colored>{t('Авторизоваться')}</Colored>
          </CommonButton>
        </>
      )}
      {screen === 2 && (
        <>
          <h2 className='second'>{t('Давайте знакомиться')}!</h2>
          <p className='descr'>{t('Расскажите о себе и своей компании. Это займет до 30 секунд.')}</p>
          <Padding $size='34px' />
          <CommonInput
            name={'name'}
            label={t('Ваше имя')}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            formik={formik}
          >
            <UserRegistrationIcon />
          </CommonInput>
          <Padding $size='20px' />
          <CommonInput
            name={'brand'}
            label={t('Наименование бренда')}
            value={formik.values.brand}
            onChange={formik.handleChange}
          >
            <UserRegistrationIcon />
          </CommonInput>
          <Padding $size='20px' />
          <div className='filials'>
            <p className='filials-descr'>{t('Сколько у компании филиалов для обслуживания клиентов')}?</p>
            <div className='filials-btns flex'>
              <button
                className={filials === '1' ? 'active' : ''}
                type='button'
                onClick={() => setFilials('1')}
              >
                {t('Один')}
              </button>
              <button
                className={filials === 'Несколько' ? 'active' : ''}
                type='button'
                onClick={() => setFilials('Несколько')}
              >
                {t('Несколько')}
              </button>
              <button
                className={filials === '0' ? 'active' : ''}
                type='button'
                onClick={() => setFilials('0')}
              >
                {t('Я - частный специалист')}
              </button>
            </div>
            <input
              className='filials-input'
              type='text'
              value={filials}
              name='filials'
              onChange={formik.handleChange}
            />
          </div>
          <Padding $size='20px' />
          <CommonInput
            name={'city'}
            label={t('Город')}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && formik.errors.city}
            formik={formik}
          >
            <UserRegistrationIcon />
          </CommonInput>
          <Padding $size='60px' />
          <CommonButton
            typeBtn='primary'
            fullWidth
            disabled={!formik.isValid || formik.values.city === '' || formik.values.brand === '' || pending}
          >
            {t('Продолжить')}
          </CommonButton>
        </>
      )}
    </Form>
  );
};

export default RegistrationContainer;
