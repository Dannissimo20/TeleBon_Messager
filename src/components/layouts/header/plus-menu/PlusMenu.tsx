import React, { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';
import { inject, observer } from 'mobx-react';

import { Container, Icon, Item, ItemLink, Line, Menu, Wrapper } from './PlusMenu.styled';

import FirstForm from '../../../../pages/private/product/modal/start/FirstForm';
import ClientsStore from '../../../../store/clientsStore';
import FilialStore from '../../../../store/filialStore';
import SidebarStore from '../../../../store/modalStore';
import RecordingStore from '../../../../store/recordingStore';
import UserStore from '../../../../store/userStore';
import { useOutside } from '../../../hooks/useOutside';
import { EIcon, IconNew as IconInstance } from '../../../icons/medium-new-icons/icon';

interface IProps {
  filialStore?: FilialStore;
  userStore?: UserStore;
  clientsStore?: ClientsStore;
  modalStore?: SidebarStore;
  recordingStore?: RecordingStore;
}
const PlusMenu: FC<IProps> = observer((props) => {
  const { ref, isShow, setIsShow } = useOutside(false);
  const { recordingStore } = props;
  const { t } = useTranslation();
  const createEmployeer = () => {
    props.modalStore!.openModal({ name: 'CREATE_EMPLOYEE' });
  };

  const createClient = () => {
    props.modalStore!.openModal({ name: 'CREATE_CLIENT' });
  };

  const menu = [
    {
      title: t('Создать запись'),
      icon: <IconInstance name={EIcon.recording} />,
      action: () => recordingStore?.setIsShow(true)
    },
    {
      title: t('Новый клиент'),
      icon: <IconInstance name={EIcon.user} />,
      action: createClient,
      endTab: true
    },
    // {
    //     title: "Создать задачу",
    //     icon: <IconInstance name={EIcons.calendar} />,
    // },
    {
      title: t('Добавить услугу'),
      icon: <IconInstance name={EIcon.filial} />,
      to: '/management/service-categories'
    },
    {
      title: t('Добавить сотрудника'),
      icon: <IconInstance name={EIcon.users} />,
      action: createEmployeer
    }
  ];

  return (
    <Wrapper ref={ref}>
      <button
        className={classNames(isShow && 'active')}
        onClick={() => setIsShow(!isShow)}
      >
        <IconInstance name={EIcon.plussquare} />
      </button>
      {isShow && (
        <Menu>
          {menu.map((item) => (
            <Fragment key={item.title}>
              <Container>
                {item.to ? (
                  <ItemLink to={item.to}>
                    <Icon>{item.icon}</Icon>
                    <h4>{item.title}</h4>
                  </ItemLink>
                ) : (
                  <Item onClick={item.action}>
                    <Icon>{item.icon}</Icon>
                    <h4>{item.title}</h4>
                  </Item>
                )}
              </Container>
              {item.endTab && <Line />}
            </Fragment>
          ))}
        </Menu>
      )}

      {recordingStore?.isShow && <FirstForm />}
    </Wrapper>
  );
});

export default inject('modalStore', 'clientsStore', 'recordingStore')(PlusMenu);
