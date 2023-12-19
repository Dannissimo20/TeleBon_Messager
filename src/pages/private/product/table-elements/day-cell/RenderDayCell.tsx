import React, { FC } from 'react';

import dayjs from 'dayjs';

import 'dayjs/locale/ru';
import { inject, observer } from 'mobx-react';

import { DayCellWrapper } from './RenderDayCell.styled';

import RecordingStore from '../../../../../store/recordingStore';

import { useParams } from 'react-router-dom';

import classnames from 'classnames';
import {useTranslation} from 'react-i18next';

interface IProps {
  arg: any;
  recordingStore?: RecordingStore;
  isActiveResource: any;
  myEvents: any;
}

const RenderDayCell: FC<IProps> = observer((props) => {
  const { arg, isActiveResource, myEvents } = props;
  const { productId } = useParams();
  const {t} = useTranslation()
  dayjs.locale('ru');

  const currentDate = dayjs(arg.date);
  const nextMonthDate = currentDate.add(0, 'month');
  const monthName = nextMonthDate.format('MMMM');
  const day = currentDate.format('D');

  const filteredEvents = myEvents
    .filter(
      (item: any) =>
        item.productId === productId &&
        item.resourceId === isActiveResource.id &&
        item.ClientId !== null &&
        dayjs(item.start).format('YYYY-MM-DD') === dayjs(arg.date).format('YYYY-MM-DD')
    )
    .map((item: any) => <div key={item.id}>{item.start}</div>);

  return (
    <DayCellWrapper className='cell-content'>
      <div className='month-summary'>
        <p className={classnames((arg.dow === 6 || arg.dow === 0) && 'weekend', 'date')}>
          <span>{day}</span>
          <span>{monthName}</span>
        </p>
        <div>
          {myEvents
            .filter(
              (item: any) =>
                item.productId === productId &&
                item.resourceId === isActiveResource.id &&
                item.ClientId !== null &&
                dayjs(item.start).format('YYYY-MM-DD') === dayjs(arg.date).format('YYYY-MM-DD')
            )
            .map((item: any) => (
              <p key={item.id}>
                <span>
                  {dayjs(item.start).format('HH:mm')} - {dayjs(item.end).format('HH:mm')}{' '}
                </span>
                <span>{item.SubproductFull.name}</span>
              </p>
            ))
            .slice(0, 3)}
        </div>
        {filteredEvents.length > 0 ? (
          <p className={'eventsLength'}>{filteredEvents.length > 3 && <p>+{filteredEvents.length - 3}</p>}</p>
        ) : (
          <p className={'emptyEvents'}>{t('Нет запланированных событий')}</p>
        )}
      </div>
    </DayCellWrapper>
  );
});

export default inject('recordingStore')(RenderDayCell);
