import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import { Wrapper } from './SearchMenu.styled';

import { useOutside } from '../../../hooks/useOutside';
import { ReactComponent as SearchIcon } from '../../../icons/logged-menu/search.svg';

const SearchMenu: FC = () => {
  const { ref, isShow, setIsShow } = useOutside(false);
  const { t } = useTranslation();
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
        placeholder={t('Что хотите найти?')}
      />
    </Wrapper>
  );
};

export default SearchMenu;
