import { FC } from 'react';

interface IProps {
  title?: string;
  value: string | number;
  className?: string;
}

const ProgrerssBar: FC<IProps> = ({ title, value, className }) => {
  return <div className={className}></div>;
};

export default ProgrerssBar;
