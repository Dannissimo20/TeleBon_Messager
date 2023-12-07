import { useTranslation } from 'react-i18next';

import { Wrapper } from './PortalSettingsTopbar.styled';

import CommonNavMenu from '../../../../components/shared/nav/CommonNavMenu';
import { CommonPageTitle } from '../../../../components/shared/title/CommonPageTitle';

const portalMenu = [
  {
    title: 'Тариф',
    to: '/portalsettings/tarif'
  }
];
export default function PortalSettingsTopbar() {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <CommonPageTitle title={t('Портал')} />
      <CommonNavMenu list={portalMenu} />
    </Wrapper>
  );
}
