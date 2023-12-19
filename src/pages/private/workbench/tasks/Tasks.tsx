import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import classnames from 'classnames';
import Cookies from 'js-cookie';
import { inject, observer } from 'mobx-react';

import { TasksWrapper } from './Tasks.styled';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../components/shared/button/CommonButton';
import { InformationWrapper } from '../../../../components/views/PageStyled.styled';
import {
  CalendarContent,
  WorkbenchSubText,
  WorkbenchSubTitle,
  WorkbenchText
} from '../../../../components/views/workbench/Workbench.styled';
import KanbanStore from '../../../../store/kanbanStore';
import ModalStore from '../../../../store/modalStore';
import UserStore from '../../../../store/userStore';
import { FlexContainer } from '../../../../utils/styleUtils';

interface IProps {
  kanbanStore?: KanbanStore;
  userStore?: UserStore;
  modalStore?: ModalStore;
}

const Tasks: FC<IProps> = observer((props) => {
  const { kanbanStore, modalStore, userStore } = props;
  const { fetchColumns, columns } = kanbanStore!;
  const location = useLocation();

  const { pathname } = location;
  const { user } = userStore!;
  const { t } = useTranslation();

  const createCategory = () => {
    modalStore!.openModal({
      name: 'CREATE_KANBAN_TASK',
      payload: { columnId: columns?.[0].id, column: columns, setLocalColumns: () => {} }
    });
  };
  const fetchColumnsInfo = async () => {
    await fetchColumns();
  };
  useEffect(() => {
    fetchColumnsInfo();
  }, []);

  return (
    <InformationWrapper>
      <WorkbenchSubTitle>
        {t('Мои задачи')}
        {pathname === '/workbench' && (
          <Link to={'/taskbook'}>
            <IconInstance name={EIcon.arrowleft} />
          </Link>
        )}
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
        {pathname === '/profile' && (
          <CommonButton
            typeBtn={'primary'}
            onClick={createCategory}
          >
            {t('Добавить задачу')}
          </CommonButton>
        )}
      </TasksWrapper>
    </InformationWrapper>
  );
});

export default inject('kanbanStore', 'userStore', 'modalStore')(Tasks);
