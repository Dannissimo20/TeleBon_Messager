import { PropsWithChildren } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface IProps extends PropsWithChildren {
  [key: string]: any;
}

const Tooltip: React.FC<IProps> = ({ children, ...restProps }) => {
  return <ReactTooltip {...restProps}>{children}</ReactTooltip>;
};

export default Tooltip;
