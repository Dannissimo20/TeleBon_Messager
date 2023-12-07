import React, { FC } from 'react';

import classNames from 'classnames';

import { FlexContainer } from '../../../../utils/styleUtils';
import { useOutside } from '../../../hooks/useOutside';
import { EIcon, IconNew as IconInstance } from '../../../icons/medium-new-icons/icon';
import { ReactComponent as CheckedIcon } from '../../../icons/checked.svg';
import { ReactComponent as SettingsIcon } from '../../../icons/settings.svg';
import { Menu, Wrapper } from './NoticesMenu.styled';

const NoticesMenu: FC = () => {
  const { ref, isShow, setIsShow } = useOutside(false);

  return (
    <Wrapper ref={ref}>
      {/*<button className={classNames(isShow && 'active')} onClick={() => setIsShow(!isShow)}>*/}
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
          <h1>Уведомления</h1>
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
            <h4>Список уведомлений пуст</h4>
          </FlexContainer>
        </div>
      </Menu>
    </Wrapper>
  );
};

export default NoticesMenu;
