import React, { FC, Fragment } from 'react';
import { ReactComponent as PlusIcon } from '../../../icons/logged-menu/hplus.svg';
import { inject, observer } from 'mobx-react';
import FilialStore from '../../../../store/filialStore';
import UserStore from '../../../../store/userStore';
import ClientsStore from '../../../../store/clientsStore';
import { EIcons, Icon as IconInstance } from '../../../icons';
import { useOutside } from '../../../hooks/useOutside';
import classNames from 'classnames';
import SidebarStore from '../../../../store/modalStore';
import RecordingStore from '../../../../store/recordingStore';
import FirstForm from '../../../../pages/private/product/modal-elements/form-start/FirstForm';
import { Container, Icon, Item, ItemLink, Line, Menu, Wrapper } from './PlusMenu.styled';

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
  const createEmployeer = () => {
    props.modalStore!.openModal({ name: 'CREATE_EMPLOYEE' });
  };

  const createClient = () => {
    props.modalStore!.openModal({ name: 'CREATE_CLIENT' });
  };

  const menu = [
    {
      title: 'Создать запись',
      icon: <IconInstance name={EIcons.entry} />,
      action: () => recordingStore?.setIsShow(true)
    },
    {
      title: 'Новый клиент',
      icon: <IconInstance name={EIcons.clientIcon} />,
      action: createClient,
      endTab: true
    },
    // {
    //     title: "Создать задачу",
    //     icon: <IconInstance name={EIcons.calendar} />,
    // },
    {
      title: 'Добавить услугу',
      icon: <IconInstance name={EIcons.productIcon} />,
      to: '/management/service-categories'
    },
    {
      title: 'Добавить сотрудника',
      icon: <IconInstance name={EIcons.loggeduser} />,
      action: createEmployeer
    }
  ];

  return (
    <Wrapper ref={ref}>
      <button
        className={classNames(isShow && 'active')}
        onClick={() => setIsShow(!isShow)}
      >
        <PlusIcon />
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

export default inject('modalStore',  'clientsStore', 'recordingStore')(PlusMenu);
