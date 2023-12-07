import CommonNavMenuItem, { INavMenuItem } from './item/CommonNavMenuItem';
import { List } from './CommonNavMenu.styled';

interface IProps {
  list: INavMenuItem[];
}

const CommonNavMenu = (props: IProps) => {
  const { list } = props;

  return (
    <List>
      {list.map(({ title, to }) => (
        <CommonNavMenuItem
          key={title}
          title={title}
          to={to}
        />
      ))}
    </List>
  );
};

export default CommonNavMenu;
