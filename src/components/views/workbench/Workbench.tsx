import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { Wrapper } from './Workbench.styled';

import Calendar from '../../../pages/private/workbench/calendar/Calendar';
import Clients from '../../../pages/private/workbench/clients/Clients';
import ConfirmSettings from '../../../pages/private/workbench/confirm-settings/ConfirmSettings';
import Tasks from '../../../pages/private/workbench/tasks/Tasks';
import FilialStore from '../../../store/filialStore';
import UserStore from '../../../store/userStore';
import { FlexContainer } from '../../../utils/styleUtils';
import { CommonPageTitle } from '../../shared/title/CommonPageTitle';

interface IProps {
  filialStore?: FilialStore;
  userStore?: UserStore;
}

const Workbench: FC<IProps> = observer((props) => {
  const { filialStore, userStore } = props;
  const { activeFilial, fetch } = filialStore!;
  const { user, fetchUsers } = userStore!;
  const { t } = useTranslation();

  const fetchInfo = async () => {
    await fetch();
    await fetchUsers();
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <Wrapper>
      <CommonPageTitle
        title={activeFilial?.name}
        subtitle={`${t('Добрый день')}, ${user && user[0].fio}!`}
      />
      <FlexContainer $gap={'40px'}>
        <FlexContainer
          className={'left'}
          $column
          $gap={'40px'}
        >
          <Tasks />
          <Clients />
        </FlexContainer>
        <FlexContainer
          className={'right'}
          $column
          $gap={'16px'}
        >
          <ConfirmSettings />
          <Calendar />
        </FlexContainer>
      </FlexContainer>
    </Wrapper>
  );
});

export default inject('filialStore', 'userStore')(Workbench);
