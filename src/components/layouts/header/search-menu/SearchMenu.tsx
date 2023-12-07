import { FC, useState } from 'react';

import classNames from 'classnames';

import { useOutside } from '../../../hooks/useOutside';
import { ReactComponent as SearchIcon } from '../../../icons/logged-menu/search.svg';
import { Wrapper } from './SearchMenu.styled';

const SearchMenu: FC = () => {
  const { ref, isShow, setIsShow } = useOutside(false);
  const [value, setValue] = useState('');

  const handleClick = () => {
    setIsShow(!isShow);
    setValue('');
  };

  return (
    <Wrapper ref={ref}>
      <button
        className={classNames(isShow && 'active')}
        onClick={handleClick}
      >
        <SearchIcon />
      </button>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={classNames(isShow && 'active')}
        placeholder='Что хотите найти?'
      />
    </Wrapper>
  );
};

export default SearchMenu;
