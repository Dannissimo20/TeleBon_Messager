import { ReactNode } from 'react';
import { Wrapper } from './CommonItemAdd.styled';

interface IProps {
  children?: ReactNode;
}
const CommonItemAdd: React.FC<IProps> = (props) => {
  const { children } = props;

  return <Wrapper>{children}</Wrapper>;
};

export default CommonItemAdd;
