import React, { FC } from 'react';
import moment from 'moment-timezone';
import { calculateBusyAndFreeHours } from '../helpers/helperFunctions';
import { useParams } from 'react-router-dom';

interface IProps {
  arg: any;
  isActiveResource: any;
  myEvents: any;
}

const RenderDayCell: FC<IProps> = ({ arg, isActiveResource, myEvents }) => {
  const { productId } = useParams();
  const selectedDate = moment.tz(arg.date, 'Europe/Moscow').format('YYYY-MM-DD');
  const formattedDate = moment.tz(arg.date, 'Europe/Moscow').format('D');
  const resourceId = isActiveResource?.id;
  const { busyHours, freeHours } = calculateBusyAndFreeHours(selectedDate, resourceId, myEvents);
  return (
    <div className='cell-content'>
      <div className='month-summary'>
        <span className='date'>{formattedDate}</span>
        <div className={`${busyHours === 0 && freeHours === 24 ? 'hidden' : ''}`}>
          <div className='green'>
            Свободно: <span>{freeHours}</span>
          </div>
          <div className='red'>
            Занято: <span>{busyHours}</span>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderDayCell;
