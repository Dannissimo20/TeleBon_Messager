import { FC } from 'react';

import SettingsTopbar from '../../../pages/private/service/topbar/SettingsTopbar';
import SettingsPage from '../../../pages/private/settings/SettingsPage';
import { FlexContainer } from '../../../utils/styleUtils';

const Settings: FC = () => {
  return (
    <FlexContainer
      $column
      $gap={'20px'}
    >
      <SettingsTopbar />
      <SettingsPage />
    </FlexContainer>
  );
};

export default Settings;
