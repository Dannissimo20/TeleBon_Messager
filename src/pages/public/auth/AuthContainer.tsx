import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import { Colored, Form, WrongPassWrap } from './AuthContainer.styled';

import { ReactComponent as Email } from '../../../components/icons/email.svg';
import { ReactComponent as Lock } from '../../../components/icons/lock.svg';
import CommonButton from '../../../components/shared/button/CommonButton';
import CommonInput from '../../../components/shared/fields/CommonInput';
import UserStore from '../../../store/userStore';
import { apiPost } from '../../../utils/apiInstance';
import { setCookie } from '../../../utils/cookies';
import { Padding } from '../../../utils/styleUtils';

const AuthContainer: React.FC<{ userStore?: UserStore }> = observer(() => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [loginError, setLoginError] = useState(false);
  // const [lang, setLang] = useState('ru'); // remove with changing language example

  const handleEmail = (e: { target: { value: React.SetStateAction<string> } }) => setEmail(e.target.value);
  const handlePassword = (e: { target: { value: React.SetStateAction<string> } }) => setPassword(e.target.value);
  const handleLowerCase = (e: { target: { value: string } }) => setEmail(e.target.value.toLocaleLowerCase());
  const notify = (msg: string) => toast.error(msg);

  const handleSubmit = async () => {
    setPending(true);
    const res = await apiPost('/auth', {
      username: email,
      password
    });
    setPending(false);
    if (res.status === 200) {
      setCookie('auth', res.data.token);
      setCookie('id', res.data.id);
      navigate('/clients');
    } else {
      setLoginError(true);
      notify('Указан неверный логин или пароль.');
    }
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Form>
      <CommonInput
        name={'email'}
        label={t('Email')}
        value={email}
        onChange={handleEmail}
        onKeyDown={handleKeyDown}
        onBlur={handleLowerCase}
      >
        <Email />
      </CommonInput>
      <Padding $size='24px' />
      <CommonInput
        name={'password'}
        label={t('Пароль')}
        type={'password'}
        value={password}
        onChange={handlePassword}
        onKeyDown={handleKeyDown}
      >
        <Lock />
      </CommonInput>

      <Padding $size='40px' />
      <CommonButton
        color={'mainLight'}
        onClick={handleSubmit}
        highlighted
        fullWidth
        disabled={pending}
      >
        {t('Авторизоваться')}
      </CommonButton>
      <Padding $size='24px' />
      {loginError && (
        <>
          <WrongPassWrap>
            <div>{t('Указан неверный логин или пароль.')}</div>
            <div>
              <a href='/password/recovery'>
                <Colored>{t('Забыли пароль?')}</Colored>
              </a>
            </div>
          </WrongPassWrap>
        </>
      )}
      <Padding $size='24px' />

      <CommonButton
        fullWidth
        onClick={() => navigate('/registration')}
      >
        <span>{t('Нет аккаунта?')} </span>
        <Colored>{t('Зарегистрироваться')}</Colored>
      </CommonButton>

      {/* MARK: Example how to change language
      <span
        onClick={() => {
          setLang(lang === 'ru' ? 'en' : 'ru');
          i18n.changeLanguage(lang);
        }}
      >
        {t('Сменить язык')}{' '}
      </span> */}
    </Form>
  );
});

export default inject('userStore', 'rootStore')(AuthContainer);
