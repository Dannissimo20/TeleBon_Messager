import { Head, Html, Text } from '@react-email/components';
import { LoginLogo } from '../../../../components/icons';
import { EmailContainer } from './EmailConfirm.styled';
import { useTranslation } from 'react-i18next';

interface IEmailPasswordRecoveryProps {
  name?: string;
  link?: string;
}

export const EmailPasswordRecovery: React.FC<IEmailPasswordRecoveryProps> = (props) => {
  const { name, link } = props;
  const { t } = useTranslation();
  return (
    <Html>
      <Head />
      <EmailContainer>
        <Text className='logo'>
          <LoginLogo />
        </Text>
        <Text>
          {t('Здравствуйте')}, {name}!<br />
          {t('Вы получили это сообщение, так как Ваш адрес электронной почты был указан при регистрации на сайте')}{' '}
          <a href='#'>
            <strong>telebon.ru</strong>
          </a>
          .
        </Text>
        <Text>
          {t('Перейдите по')}{' '}
          <a
            className='link-confirm'
            href={link}
          >
            <strong>{t('ссылке')}</strong>
          </a>{' '}
          {t('для восстановления пароля на сайте')}{' '}
          <a href='#'>
            <strong>Telebon.ru</strong>
          </a>
        </Text>
      </EmailContainer>
    </Html>
  );
};
