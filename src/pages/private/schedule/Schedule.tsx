import React, { useState } from 'react';
import useKeypress from 'react-use-keypress';
export const fullHd = 48;
export const laptop = 32;
import {
  addDateBy,
  calculateEventWidth,
  formatDate,
  formatDay,
  formatMonth,
  formatYear,
  getMonday,
  timeStringToNumber
} from '../../../utils/date-events';
import initialSchedule, { ISlot } from '../../../utils/initialSchedule';
import { PENDING, STATE } from '../../../utils/state';
import CommonButton from '../../../components/shared/button/CommonButton';
import CommonLoader from '../../../components/shared/loader/CommonLoader';
import { EIcons, Icon as IconInstance } from '../../../components/icons';
import { Box, Container, Hours, LoaderLayout, Side, Slot, Table, Wrapper,Event } from './Schedule.styled';



interface IProps {
  schedule?: ISlot[][];
  state?: STATE;
  onSave: (data: any[]) => void;
}

const Schedule: React.FC<IProps> = ({ schedule, state, onSave }) => {
  const hours = [
    'nan',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '00:00'
  ];
  const [mondayDate, setMondayDate] = useState(getMonday());

  const days = [
    { title: 'пн', action: mondayDate?.toDateString(), time: [] },
    { title: 'вт', action: addDateBy(mondayDate, 1).toDateString(), time: [] },
    { title: 'ср', action: addDateBy(mondayDate, 2).toDateString(), time: [] },
    { title: 'чт', action: addDateBy(mondayDate, 3).toDateString(), time: [] },
    { title: 'пт', action: addDateBy(mondayDate, 4).toDateString(), time: [] },
    { title: 'сб', action: addDateBy(mondayDate, 5).toDateString(), time: [] },
    { title: 'вс', action: addDateBy(mondayDate, 6).toDateString(), time: [] }
  ];

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [eventData, setEventData] = useState<{
    day: string;
    date: string;
    time: string;
    timeEnd: string;
    start: Date | null;
    end: Date | null;
  }>({ day: '', date: '', time: '', timeEnd: '', start: null, end: null });

  const [selectedDateTime, setSelectedDateTime] = useState<any>(null);
  const [events, setEvents] = useState<{ day: string; date: string; time: string; timeEnd: string }[]>([]);
  const [postRequest, setPostRequest] = useState<any>();
  const handleSlotClick = (day: any, date: any, time: string) => {
    const startDateTime = new Date(`${date} ${time}`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1);
    const sliceEndTime = `${endDateTime.getHours().toString().padStart(2, '0')}:00`;

    const selectedHour = startDateTime.getHours();
    if (selectedHour < 10 || selectedHour >= 17) {
      alert('Выбранный час не является рабочим часом (10:00 - 17:00).');

      return;
    }

    if (events.some((event) => eventsOverlap(event, startDateTime, endDateTime))) {
      alert('Событие перекрывается с другими событиями. Выберите другое время.');

      return;
    }

    setEventData({
      day,
      date,
      time,
      timeEnd: sliceEndTime,
      start: startDateTime,
      end: endDateTime
    });

    const newEvent: any = {
      id: Math.random(),
      day,
      date,
      time,
      timeEnd: sliceEndTime,
      start: startDateTime,
      end: endDateTime
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);

    setSelectedEvent(newEvent);
  };

  function calculateEventPosition(day: any, startTime: any, width: any) {
    const windowWidth = window.innerWidth;
    const dayIndex = days.findIndex((item) => item.title === day);
    const timeIndex = hours.findIndex((item) => item === startTime);
    const top = dayIndex === 0 ? 0 : dayIndex * (windowWidth > 1500 ? fullHd + 11 : laptop + 11);
    const left = timeIndex * (windowWidth > 1500 ? fullHd + 11 : laptop + 11);

    return { top, left };
  }

  const eventsOverlap = (event: any, newStart: any, newEnd: any) => {
    const eventStart = event.start;
    const eventEnd = event.end;

    return (
      (newStart >= eventStart && newStart < eventEnd) ||
      (newEnd > eventStart && newEnd <= eventEnd) ||
      (newStart <= eventStart && newEnd >= eventEnd)
    );
  };

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (selectedEvent) {
      const updatedEvents = events.map((event: any) => (event.id === selectedEvent.id ? { ...event, ...eventData } : event));
      setEvents(updatedEvents);

      setPostRequest(updatedEvents);
    }
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.map((event: any) => (event.id === selectedEvent.id ? { ...event, ...eventData } : event));
      setEvents(updatedEvents);
      setSelectedEvent(null);
    }
  };

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    for (let hour = 1; hour < 25; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      //@ts-ignore
      day.time.push({ title: `${formattedHour === 24 ? '00' : formattedHour}:00` });
    }
  }
  const dataa = new Date(2023, 10, 21, 17, 0);
  const datab = new Date(2023, 10, 21, 10, 0);

  const isWorkingHour = (hour: any) => {
    const d = `${dataa.getHours()}:${dataa.getMinutes()}0`;
    const a = `${datab.getHours()}:${datab.getMinutes()}0`;

    return hour >= a && hour <= d;
  };

  const [arr, setArr] = useState(initialSchedule);
  useKeypress(['Backspace', 'Delete'], () => {
    unHighlightAll();
  });

  const nextWeek = () => setMondayDate(addDateBy(mondayDate, 7));
  const prevWeek = () => setMondayDate(addDateBy(mondayDate, -7));

  const unHighlightAll = () => {
    const newArray = arr.map((day) => day.map((hour) => ({ ...hour, highlighted: false })));
    setArr(newArray);
  };

  const toggleRow = (dayIndex: number) => {
    const newArray = [...arr];
    newArray[dayIndex] = newArray[dayIndex].map((item) => ({
      ...item,
      active: true
    }));
    setArr(newArray);
  };

  return (
    <Container>
      {state === PENDING && (
        <LoaderLayout>
          <CommonLoader />
        </LoaderLayout>
      )}
      <Wrapper>
        <p>Сегодня: {new Date().toDateString()}</p>
        <p>С: {mondayDate?.toDateString()}</p>
        <p>По: {addDateBy(mondayDate, 6).toDateString()}</p>
        <div>
          <button onClick={prevWeek}>Назад</button>
          <div>
            <IconInstance name={EIcons.calendar} />
            <div>
              <h4>
                {formatDay(mondayDate.toDateString())}-{formatDay(addDateBy(mondayDate, 6).toDateString())}{' '}
                {formatMonth(addDateBy(mondayDate, 6).toDateString())}, {formatYear(addDateBy(mondayDate, 6).toDateString())}
              </h4>
            </div>
          </div>
          <button onClick={nextWeek}>Вперёд</button>
        </div>

        {selectedDateTime && (
          <div>
            Выбранная дата и время: {selectedDateTime?.toDateString()} {selectedDateTime?.toLocaleTimeString()}
          </div>
        )}
        <Table>
          <Hours>
            {hours.map((item: any, index: number) => (
              <Slot key={`hour-${index}`}>{item}</Slot>
            ))}
          </Hours>
          <Side>
            {days.map((item: any, index) => (
              <div key={`day-${index}`}>
                <Slot onClick={() => toggleRow(index)}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    <p>{formatDate(item.action)}</p>
                    <p>{item.title}</p>
                  </div>
                </Slot>
                {item.time.map((time: { title: string }) => (
                  <Slot
                    style={{
                      backgroundColor: isWorkingHour(time.title) ? '#30D158' : ''
                    }}
                    onClick={() => handleSlotClick(item.title, item.action, time.title)}
                    key={time.title}
                  >
                    {/* eslint-disable-next-line array-callback-return */}
                    {events.map((event, index) => {
                      const startTime = timeStringToNumber(event.time);
                      const endTime = timeStringToNumber(event.timeEnd);
                      const width = calculateEventWidth(startTime, endTime);
                      const { top, left } = calculateEventPosition(event.day, event.time, width);

                      if (event.day === item.title && event.date === item.action && event.time === time.title) {
                        return (
                          <Event
                            //@ts-ignore
                            width={width}
                            style={{ top, left }}
                            key={index}
                          >
                            {event.time}-{event.timeEnd}
                          </Event>
                        );
                      }
                    })}
                  </Slot>
                ))}
              </div>
            ))}
          </Side>
        </Table>
      </Wrapper>

      <Box>
        <form onSubmit={handleFormSubmit}>
          <input
            type='text'
            name='day'
            value={eventData.day}
            onChange={handleFormChange}
          />
          <input
            type='text'
            name='date'
            value={eventData.date}
            onChange={handleFormChange}
          />
          <input
            type='text'
            name='time'
            value={eventData.time}
            onChange={handleFormChange}
          />
          <input
            type='text'
            name='timeEnd'
            value={eventData.timeEnd}
            onChange={handleFormChange}
          />
          <button type='submit'>Сохранить</button>
          {selectedEvent && <button onClick={handleSaveEvent}>Редактировать</button>}
        </form>
        <CommonButton>Услуга</CommonButton>
        <CommonButton>Сотрудник</CommonButton>
        <CommonButton>Ответственный</CommonButton>
      </Box>
    </Container>
  );
};

export default Schedule;
