import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { NavMenuItem } from './CommonNavMenuItem.styled';

export interface INavMenuItem {
  title: string;
  to: string;
}

const CommonNavMenuItem = (props: INavMenuItem) => {
  const { title, to } = props;
  const { t } = useTranslation();

  return (
    <NavMenuItem>
      <NavLink
        to={to}
        className={({ isActive, isPending }) => (isActive ? 'flex active' : 'flex')}
      >
        {t(title)}
      </NavLink>
    </NavMenuItem>
  );
};

export default CommonNavMenuItem;
