import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import Cookies from 'js-cookie';
import { inject, observer } from 'mobx-react';

import { TasksWrapper } from './Tasks.styled';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import {
  CalendarContent,
  WorkbenchContainer,
  WorkbenchSubText,
  WorkbenchSubTitle,
  WorkbenchText
} from '../../../../components/views/workbench/Workbench.styled';
import KanbanStore from '../../../../store/kanbanStore';
import UserStore from '../../../../store/userStore';
import { FlexContainer } from '../../../../utils/styleUtils';

interface IProps {
  kanbanStore?: KanbanStore;
  userStore?: UserStore;
}

const Tasks: FC<IProps> = observer((props) => {
  const { kanbanStore, userStore } = props;
  const { fetchColumns, columns } = kanbanStore!;
  const { user } = userStore!;
  const { t } = useTranslation();

  const fetchColumnsInfo = async () => {
    await fetchColumns();
  };
  useEffect(() => {
    fetchColumnsInfo();
  }, []);

  return (
    <WorkbenchContainer>
      <WorkbenchSubTitle>
        {t('Мои задачи')}
        <Link to={'/taskbook'}>
          <IconInstance name={EIcon.arrowleft} />
        </Link>
      </WorkbenchSubTitle>
      <TasksWrapper>
        {columns &&
          columns.map(
            (item) =>
              item?.task &&
              item?.task
                ?.filter((task) => task.employeetaskid === user?.[0].id)
                .slice(0, 6)
                .map((task) => (
                  <CalendarContent
                    key={task.id}
                    className={'tasks'}
                  >
                    <FlexContainer
                      $gap={'0'}
                      $column
                    >
                      <WorkbenchText>{item.name}</WorkbenchText>
                      <WorkbenchSubText>{task.content}</WorkbenchSubText>
                    </FlexContainer>
                    <span>
                      {user &&
                        user
                          ?.filter((userItem) => userItem.id === Cookies.get('id'))
                          .map((filteredUser) => (
                            <span
                              className={classnames(filteredUser.id === task.employeetaskid ? 'blue' : 'purple')}
                              key={filteredUser.id}
                            >
                              {filteredUser.id === task.employeetaskid && t('Мой')}
                            </span>
                          ))}
                    </span>
                  </CalendarContent>
                ))
          )}
      </TasksWrapper>
    </WorkbenchContainer>
  );
});

export default inject('kanbanStore', 'userStore')(Tasks);
