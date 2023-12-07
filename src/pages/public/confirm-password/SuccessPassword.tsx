import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LinkWrap, Login, LogoPasswordFlex, SuccessText, TopWrap, WrapperPassword } from './Password.styled';

import { LoginLogo } from '../../../components/icons';

export const SuccessPassword: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <WrapperPassword>
      <TopWrap>
        <SuccessText>{t('Пароль успешно обновлен')}</SuccessText>
        <LinkWrap>
          <Link to={'/auth'}>{t('Перейти на страницу авторизации')}</Link>
        </LinkWrap>
      </TopWrap>
      <Login>
        <LogoPasswordFlex href='/'>
          <LoginLogo />
        </LogoPasswordFlex>
      </Login>
    </WrapperPassword>
  );
};
