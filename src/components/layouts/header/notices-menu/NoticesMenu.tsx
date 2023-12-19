import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import { Menu, Wrapper } from './NoticesMenu.styled';

import { FlexContainer } from '../../../../utils/styleUtils';
import { useOutside } from '../../../hooks/useOutside';
import { ReactComponent as CheckedIcon } from '../../../icons/checked.svg';
import { EIcon, IconNew as IconInstance } from '../../../icons/medium-new-icons/icon';
import { ReactComponent as SettingsIcon } from '../../../icons/settings.svg';

const NoticesMenu: FC = () => {
  const { ref, isShow, setIsShow } = useOutside(false);
  const { t } = useTranslation();

  return (
    <Wrapper ref={ref}>
      <button
        className={classNames(isShow && 'active')}
        onClick={() => {}}
        style={{ cursor: 'no-drop' }}
      >
        <IconInstance name={EIcon.ticket} />
      </button>
      <Menu className={classNames(isShow && 'active')}>
        <FlexContainer className='header'>
          <button
            onClick={() => setIsShow(false)}
            className='close'
          >
            <IconInstance name={EIcon.plus} />
          </button>
          <h1>{t('Уведомления')}</h1>
          <FlexContainer>
            <button>
              <CheckedIcon />
            </button>
            <button>
              <SettingsIcon />
            </button>
          </FlexContainer>
        </FlexContainer>
        <div className='content'>
          <FlexContainer
            $gap='25px'
            $column
            className='empty'
          >
            <IconInstance name={EIcon.ticket} />
            <h4>{t('Список уведомлений пуст')}</h4>
          </FlexContainer>
        </div>
      </Menu>
    </Wrapper>
  );
};

export default NoticesMenu;
