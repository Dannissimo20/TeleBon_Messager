import styled from 'styled-components';

import 'dayjs/locale/ru';

import { inject, observer } from 'mobx-react';
import CalendarStore from '../../../store/calendarStore';
import FilialStore from '../../../store/filialStore';
import LessonsStore from '../../../store/lessonsStore';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(1150 / 1452 * 100%);
`;
const LoaderLayout = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.color.mainLight}1A;
  z-index: 10;
`;

interface IProps {
  calendarStore?: CalendarStore;
  filialStore?: FilialStore;
  lessonsStore?: LessonsStore;
}

const ProductSchedule: React.FC<IProps> = observer(({ calendarStore, filialStore, lessonsStore }) => {
  const { activeDate, setNextDay, setPrevDay } = calendarStore!;
  const { fetchScheduleByDay, cabinets, state } = lessonsStore!;
  const formatedDate = dayjs(activeDate).format('YYYY-MM-DD');
  const { productId } = useParams();

  const { activeFilial } = filialStore!;

  const schedule = cabinets;

  return <Wrapper></Wrapper>;
});

export default inject('calendarStore', 'filialStore', 'lessonsStore')(ProductSchedule);
