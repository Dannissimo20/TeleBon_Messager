import { Link, useNavigate } from 'react-router-dom';
import { LoginLogo } from '../../../../components/icons';
import { LinkAuth, Login, Logo, TextCongrats, Wrapper } from './RegistrationConfirm.styled';
import { useTranslation } from 'react-i18next';

export const RegistrationConfirm: React.FC = () => {
  const nav = useNavigate();
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Login>
        <Logo>
          <LoginLogo />
        </Logo>
      </Login>
      <TextCongrats>{t('Ваша почта подтверждена')}!</TextCongrats>
      <LinkAuth>
        <Link to={'/auth'}> {t('Перейти к странице авторизации')} </Link>
      </LinkAuth>
    </Wrapper>
  );
};
