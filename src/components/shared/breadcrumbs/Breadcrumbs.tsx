import { ReactComponent as Arrow } from '../../icons/arrow-switch.svg';
import { Item, List } from './Breadcrumbs.styled';

interface IProps {
  crumbs: string[];
}

const Breadcrumbs: React.FC<IProps> = ({ crumbs }) => {
  return (
    <List>
      {crumbs.map((item: any, i: number) => (
        <Item key={i}>
          <span>{item}</span>
          <Arrow />
        </Item>
      ))}
    </List>
  );
};

export default Breadcrumbs;
