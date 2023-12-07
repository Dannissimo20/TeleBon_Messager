import Calendar from 'react-calendar';

import { inject, observer } from 'mobx-react';

import { ReactComponent as NextIcon } from '../../icons/arrownext.svg';
import { ReactComponent as PrevIcon } from '../../icons/arrowprev.svg';

import CalendarStore from '../../../store/calendarStore';
import { WrapperCalendar } from './CommonCalendar.tsyled';
import { addDateBy } from '../../../utils/date-events';

interface IProps {
  calendarStore?: CalendarStore;
  currentView?: 'resourceTimeGridDay' | 'resourceTimeGridWeek' | 'resourceDayGridMonth';
}
const CommonCalendar: React.FC<IProps> = observer(({ calendarStore, currentView }) => {
  const { activeDate, getMonday, setActiveDate } = calendarStore!;
  const isDate = (date: any): date is Date => date instanceof Date;
  const generateDateArray = (startDate: Date, endDate: Date) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toDateString());
      currentDate = addDateBy(currentDate, 1);
    }

    return dates;
  };
  const days = generateDateArray(getMonday(), addDateBy(getMonday(), 6));
  const currentDate = isDate(activeDate) ? activeDate : new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const month = Array.from({ length: 6 }, (_, i) => addDateBy(firstDayOfMonth, i).toDateString());

  const changeDate = (value: any) => {
    setActiveDate(value);
  };

  const tileClassNameFunction = ({ date }: { date: Date; view: string }) => {
    if (currentView === 'resourceTimeGridDay') {
      return undefined;
    } else if (currentView === 'resourceTimeGridWeek') {
      return days.some((selectedDate) => date.getDate() === new Date(selectedDate).getDate()) ? 'selected' : undefined;
    } else if (currentView === 'resourceDayGridMonth') {
      return month.some((selectedDate) => {
        const selectedDateObj = new Date(selectedDate);
        return (
          date.getFullYear() === selectedDateObj.getFullYear() &&
          date.getMonth() === selectedDateObj.getMonth() &&
          date.getDate() === selectedDateObj.getDate()
        );
      })
        ? 'month'
        : undefined;
    }
  };
  const calculateValue = (): any => {
    if (currentView === 'resourceTimeGridDay') {
      return activeDate;
    } else if (currentView === 'resourceTimeGridWeek') {
      return days;
    } else if (currentView === 'resourceDayGridMonth') {
      return null;
    }
    return undefined;
  };
  return (
    <WrapperCalendar>
      <Calendar
        nextLabel={<NextIcon />}
        prevLabel={<PrevIcon />}
        maxDetail={currentView === 'resourceDayGridMonth' ? 'year' : 'month'}
        prevAriaLabel={'Предыдущий месяц'}
        nextAriaLabel={'Следующий месяц'}
        onClickMonth={(val) => changeDate(val)}
        defaultView={currentView === 'resourceDayGridMonth' ? 'year' : 'month'}
        tileClassName={tileClassNameFunction}
        showNeighboringMonth={false}
        onClickDay={(val) => changeDate(val)}
        value={calculateValue()}
      />
    </WrapperCalendar>
  );
});

export default inject('calendarStore')(CommonCalendar);
