import { Outlet } from 'react-router-dom';

import { Wrapper } from './PortalSettings.styled';

import PortalSettingsTopbar from '../../../pages/private/portalsettings/topbar/PortalSettingsTopbar';

export default function PortalSettings() {
  return (
    <Wrapper>
      <PortalSettingsTopbar />
      <Outlet />
    </Wrapper>
  );
}
