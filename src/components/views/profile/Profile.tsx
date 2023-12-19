import { FC, useEffect } from 'react';

import { inject, observer } from 'mobx-react';

import { ProfilePageWrapper } from './Profile.styled';

import ProfilePersonal from '../../../pages/private/profile/personal/ProfilePersonal.';
import ProfileSchedule from '../../../pages/private/profile/schedule/ProfileSchedule';
import Calendar from '../../../pages/private/workbench/calendar/Calendar';
import Tasks from '../../../pages/private/workbench/tasks/Tasks';
import FilialStore from '../../../store/filialStore';
import KanbanStore from '../../../store/kanbanStore';
import UserStore from '../../../store/userStore';
import { FlexWithAlign } from '../../../utils/styleUtils';
import { CommonPageTitle } from '../../shared/title/CommonPageTitle';

interface IProps {
  kanbanStore?: KanbanStore;
  filialStore?: FilialStore;
  userStore?: UserStore;
}

const Profile: FC<IProps> = observer((props) => {
  const { filialStore, userStore } = props;
  const { fetch } = filialStore!;
  const { fetchUsers } = userStore!;

  const fetchInfo = async () => {
    await fetch();
    await fetchUsers();
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <ProfilePageWrapper>
      <CommonPageTitle title={'Личный кабинет'} />
      <FlexWithAlign $column>
        <ProfilePersonal />
        <FlexWithAlign>
          <FlexWithAlign
            className={'left'}
            $column
          >
            <ProfileSchedule />
            <Tasks />
          </FlexWithAlign>
          <FlexWithAlign
            className={'right'}
            $column
          >
            <Calendar />
          </FlexWithAlign>
        </FlexWithAlign>
      </FlexWithAlign>
    </ProfilePageWrapper>
  );
});

export default inject('kanbanStore', 'filialStore', 'userStore')(Profile);
