import { useTranslation } from 'react-i18next';

import { Item, List } from './Breadcrumbs.styled';

import { ReactComponent as Arrow } from '../../icons/arrow-switch.svg';

interface IProps {
  crumbs: string[];
}

const Breadcrumbs: React.FC<IProps> = ({ crumbs }) => {
  const { t } = useTranslation();

  return (
    <List>
      {crumbs.map((item: any, i: number) => (
        <Item key={i}>
          <span>{t(item)}</span>
          <Arrow />
        </Item>
      ))}
    </List>
  );
};

export default Breadcrumbs;
