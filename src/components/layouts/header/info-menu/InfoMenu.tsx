import { FC } from 'react';

import classNames from 'classnames';

import { useOutside } from '../../../hooks/useOutside';
import { EIcon, IconNew as IconInstance } from '../../../icons/medium-new-icons/icon';
import { Wrapper } from './InfoMenu.styled';

const InfoMenu: FC = () => {
  const { ref, isShow, setIsShow } = useOutside(false);

  return (
    <Wrapper ref={ref}>
      <button
        className={classNames(isShow && 'active')}
        onClick={() => {}}
        style={{ cursor: 'no-drop' }}
      >
        <IconInstance name={EIcon.message} />
      </button>
      {/*{isShow && <Menu>*/}
      {/*    sd*/}
      {/*</Menu>}*/}
    </Wrapper>
  );
};

export default InfoMenu;
