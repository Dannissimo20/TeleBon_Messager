import { Link } from 'react-router-dom';

import { EmptyContent } from '../../../utils/styleUtils';
import { ReactComponent as Plus } from '../../icons/plus.svg';

interface IProps {
  title: string;
  to: string;
}

export const CommonEmptyContent: React.FC<IProps> = (props) => {
  const { title, to } = props;

  return (
    <EmptyContent>
      <Link
        to={to}
        className='addLink'
      >
        <span>
          <Plus />
        </span>
        <h3 className='title'>{title}</h3>
      </Link>
    </EmptyContent>
  );
};
