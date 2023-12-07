import React, { FC, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import { Avatar, AvatarBox, Box, Icon, Line, Menu, Name } from './LoggedMenu.styled';

import ModalStore from '../../../../store/modalStore';
import UserStore from '../../../../store/userStore';
import { delCookie, getCookie } from '../../../../utils/cookies';
import { FlexContainer } from '../../../../utils/styleUtils';
import { useOutside } from '../../../hooks/useOutside';
import { EIcons, Icon as IconInstance } from '../../../icons';

interface IProps {
  userStore?: UserStore | any;
  modalStore?: ModalStore;
}

const LoggedMenu: FC<IProps> = observer((props) => {
  const { userStore, modalStore } = props;
  const { ref, isShow, setIsShow } = useOutside(false);
  const fetchUserInfo = async () => {
    await userStore?.fetchUserById(getCookie('id'));
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const users = userStore!;

  const name = users ? users?.onlyUser?.users?.fio : 'Пользователь';
  const email = users ? users?.onlyUser?.users?.Email : 'example.example.com';
  const nav = useNavigate();

  const profileUser = users ? users?.onlyUser?.users : {};
  const getInitials = (name: string) => {
    const nameArray = name?.split(' ');
    const initials = nameArray?.map((word: string) => word[0]);

    return initials?.join('');
  };

  const logOut = () => {
    delCookie('auth');
    delCookie('id');
    nav('/auth');
  };

  const editProfile = () => {
    setIsShow(!isShow);
    modalStore?.openModal({ name: 'PROFILE_MANAGEMENT', payload: profileUser });
  };
  const menu = [
    {
      title: 'Управление профилем',
      icon: <IconInstance name={EIcons.loggeduser} />,
      to: '/workbench',
      click: true,
      action: editProfile
    },
    {
      title: 'Персонализация',
      icon: <IconInstance name={EIcons.loggedsettings} />,
      to: '/workbench',
      endTab: true,
      click: false
    },
    {
      title: 'Мой тариф',
      icon: <IconInstance name={EIcons.loggedtarif} />,
      to: '/workbench',
      click: false
    },
    {
      title: 'Настройки портала',
      icon: <IconInstance name={EIcons.loggedportal} />,
      to: '/workbench',
      endTab: true,
      click: false
    },
    {
      title: 'Безопасность',
      icon: <IconInstance name={EIcons.password} />,
      to: '/workbench',
      click: false
    },
    {
      title: 'Центр помощи',
      icon: <IconInstance name={EIcons.question} />,
      to: '/workbench',
      click: false
    },
    {
      title: 'Выход',
      icon: <IconInstance name={EIcons.loggedexit} />,
      action: logOut
    }
  ];

  return (
    <Box ref={ref}>
      <FlexContainer
        $gap='12px'
        onClick={() => setIsShow(!isShow)}
      >
        <Name className={'name'}>{name}</Name>
        <AvatarBox>
          <Avatar>{getInitials(name)}</Avatar>
        </AvatarBox>
      </FlexContainer>
      {isShow && (
        <Menu>
          <div className='user'>
            <AvatarBox>
              <Avatar>{getInitials(name)}</Avatar>
            </AvatarBox>
            <FlexContainer
              $column
              $gap='0'
            >
              <h4>{name}</h4>
              <p>{email}</p>
            </FlexContainer>
          </div>
          <Line />
          {menu.map((item) => (
            <Fragment key={item.title}>
              <li>
                {item.action ? (
                  <button onClick={item.action}>
                    <Icon>{item.icon}</Icon>
                    <span>{item.title}</span>
                  </button>
                ) : (
                  <p>
                    <Icon>{item.icon}</Icon>
                    {item.title}
                  </p>
                )}
              </li>
              {item.endTab && <Line />}
            </Fragment>
          ))}
        </Menu>
      )}
    </Box>
  );
});

export default inject('userStore', 'modalStore')(LoggedMenu);
