import { pathOr } from 'rambda';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 84px;
  display: flex;
  flex-direction: column;
  border-right: 2px solid ${(props) => props.theme.color.secondaryMedium};
`;

interface IProps {
  schedule: any;
}

// eslint-disable-next-line react/prop-types
const ProductScheduleHours: React.FC<IProps> = ({ schedule }) => {
  const timeLine: any = pathOr([], ['0', 'schedule'], schedule);

  return <Wrapper></Wrapper>;
};

export default ProductScheduleHours;
