import React, { FC, Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

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
  const { userStore } = props;
  const { ref, isShow, setIsShow } = useOutside(false);
  const { t } = useTranslation();
  const fetchUserInfo = async () => {
    await userStore?.fetchUserById(getCookie('id'));
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const users = userStore!;

  const name = users ? users?.onlyUser?.users?.fio : t('Пользователь');
  const email = users ? users?.onlyUser?.users?.Email : 'example.example.com';
  const nav = useNavigate();

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

  const menu = [
    {
      title: t('Личный кабинет'),
      icon: <IconInstance name={EIcons.loggeduser} />,
      to: '/profile',
      click: true
    },
    {
      title: t('Персонализация'),
      icon: <IconInstance name={EIcons.loggedsettings} />,
      endTab: true,
      click: false
    },
    {
      title: t('Мой тариф'),
      icon: <IconInstance name={EIcons.loggedtarif} />,
      click: false
    },
    {
      title: t('Настройки портала'),
      icon: <IconInstance name={EIcons.loggedportal} />,
      endTab: true,
      click: false
    },
    {
      title: t('Безопасность'),
      icon: <IconInstance name={EIcons.password} />,
      click: false
    },
    {
      title: t('Центр помощи'),
      icon: <IconInstance name={EIcons.question} />,
      click: false
    },
    {
      title: t('Выход'),
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
                ) : item.to ? (
                  <Link
                    to={item.to}
                    onClick={() => setIsShow(false)}
                  >
                    <Icon>{item.icon}</Icon>
                    {item.title}
                  </Link>
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
