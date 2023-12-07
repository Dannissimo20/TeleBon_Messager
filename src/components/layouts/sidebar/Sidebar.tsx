import React, { Fragment, PropsWithChildren, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import classnames from 'classnames';

import { submenu } from './sidebar.data';
import {
  Container,
  Head,
  Icon,
  Line,
  LogoLink,
  MenuItem,
  MenuLink,
  MenuSubMenu,
  PortalLink,
  PortalLinkInner,
  SwitchButton,
  Title,
  Wrapper
} from './Sidebar.styled';

import { EIcon, IconNew as IconInstance } from '../../icons/medium-new-icons/icon';

interface IProps extends PropsWithChildren {
  toggleTheme: (name: 'dark' | 'default') => void;
  currentTheme: string;
}

const Sidebar = (props: IProps) => {
  const { currentTheme, toggleTheme } = props;
  const [islocked, setIsLocked] = useState(false);

  const { pathname } = useLocation();

  const { t } = useTranslation();
  const isLinkActive = (to: string, pathname: string) => {
    const toPath = to.split('/')[1];
    const locationPath = pathname.split('/')[1];

    return toPath === locationPath;
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Head className='flex'>
            <LogoLink to={'/'}>
              <IconInstance name={EIcon.logofirst} />
              <IconInstance name={EIcon.logo} />
            </LogoLink>
            <SwitchButton
              onClick={() => toggleTheme(currentTheme === 'dark' ? 'default' : 'dark')}
              className={currentTheme === 'dark' ? 'locked' : ''}
            >
              <div className={currentTheme === 'dark' ? 'locked' : ''}>
                <IconInstance name={EIcon.switch} />
              </div>
            </SwitchButton>
          </Head>
          <MenuSubMenu>
            {submenu.map(({ title, click, icon, to, endTab }) => (
              <Fragment key={title}>
                <MenuItem className={classnames(isLinkActive(to, pathname) && 'active', 'flex', !click && 'disable')}>
                  {!click ? null : (
                    <MenuLink
                      className='flex'
                      to={to}
                    />
                  )}
                  <Icon>{icon}</Icon>
                  <Title>{t(title)}</Title>
                </MenuItem>
                {endTab && <Line />}
              </Fragment>
            ))}
          </MenuSubMenu>
        </Wrapper>
        <PortalLink
          className='flex'
          to='/portalsettings'
        >
          <PortalLinkInner className='flex'>
            <Icon>
              <IconInstance name={EIcon.settingprotal} />
            </Icon>
            <Title>{t('Портал')}</Title>
          </PortalLinkInner>
        </PortalLink>
      </Container>
    </>
  );
};

export default Sidebar;
