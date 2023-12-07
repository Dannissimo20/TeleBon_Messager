import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserRegistrationIcon } from '../../../../components/icons';
import CommonInput from '../../../../components/shared/fields/CommonInput';
import { Padding } from '../../../../utils/styleUtils';
import CommonButton from '../../../../components/shared/button/CommonButton';

import { useFormik } from 'formik';

import { validationSchema } from '../../../../utils/validation-input';
import { toast } from 'react-toastify';
import { Form } from './RegistrationConfirm.styled';
import { useTranslation } from 'react-i18next';

export const RegistrationConfirmContainer: React.FC = () => {
  const [isSecondFormValid, setIsSecondFormValid] = useState(false);
  const [filials, setFilials] = useState<'1' | 'Несколько' | '0'>('1');
  const { t } = useTranslation();

  const initialValues = {
    name: '',
    brand: '',
    city: '',
    filials: ''
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values: any) => {},
    validateOnBlur: true
  });
  useEffect(() => {
    if (formik.values.name.trim() !== '' && formik.values.brand.trim() !== '' && formik.values.city.trim() !== '') {
      setIsSecondFormValid(true);
    } else {
      setIsSecondFormValid(false);
    }
  }, [formik.values]);

  const notify = (msg: string) => {
    toast.error(msg);
  };

  const nav = useNavigate();

  const goTo = (url: string) => {
    nav(url);
  };

  return (
    <Form>
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
        disabled={!formik.isValid || formik.values.city === '' || formik.values.brand === ''}
      >
        {t('Продолжить')}
      </CommonButton>
    </Form>
  );
};
