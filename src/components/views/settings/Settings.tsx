import { FC } from 'react';
import SettingsPage from '../../../pages/private/settings/SettingsPage';
import SettingsTopbar from '../../../pages/private/service/topbar/SettingsTopbar';

const Settings: FC = () => {
  return (
    <div>
      <SettingsTopbar />
      <SettingsPage />
    </div>
  );
};

export default Settings;
