import React, { FC, useEffect, useRef, useState } from 'react';

import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { FlexContainer } from '../../../../../utils/styleUtils';
import { inject, observer } from 'mobx-react';
import RecordingStore from '../../../../../store/recordingStore';
import { ModalGrid } from '../form-start/FirstForm.styled';

interface IProps {
  recordingStore?: RecordingStore;
}

const DateElement: FC<IProps> = observer((props) => {
  const { recordingStore } = props;
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(recordingStore?.inputStart ? dayjs(recordingStore?.inputStart).toDate() : null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const shiftPressed = useRef(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        shiftPressed.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        shiftPressed.current = false;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  const handleDateChange = (selectedDate: Date | null, event: React.SyntheticEvent<any>) => {
    event.preventDefault(); // Предотвращаем дальнейшее выделение

    if (!selectedDate) return;

    if (shiftPressed.current) {
      setSelectedDates((prevDates) => {
        const newDates = [...prevDates, selectedDate];
        return newDates;
      });
    } else {
      setSelectedDates([selectedDate]);
    }
    setSelectedDates((prevDates) => {
      const newDates = prevDates.map((date) => {
        const newStartDate = new Date(date);
        const newEndDate = new Date(date);

        if (oldStartTime && oldEndTime) {
          newStartDate.setHours(oldStartTime.getHours());
          newStartDate.setMinutes(oldStartTime.getMinutes());
          newEndDate.setHours(oldEndTime.getHours());
          newEndDate.setMinutes(oldEndTime.getMinutes());
        }

        recordingStore?.setInputStart(newStartDate);
        recordingStore?.setInputEnd(newEndDate);
        return newStartDate;
      });

      return newDates;
    });
    const newStartDate = selectedDate ? new Date(selectedDate) : new Date();
    const newEndDate = selectedDate ? new Date(selectedDate) : new Date();

    const oldStartTime = recordingStore?.inputStart;
    const oldEndTime = recordingStore?.inputEnd;

    if (oldStartTime && oldEndTime) {
      newStartDate.setHours(oldStartTime.getHours());

      newStartDate.setMinutes(oldStartTime.getMinutes());

      newEndDate.setHours(oldEndTime.getHours());

      newEndDate.setMinutes(oldEndTime.getMinutes());
    }

    recordingStore?.setInputStart(newStartDate);
    recordingStore?.setInputEnd(newEndDate);
    setDate(selectedDate);

    recordingStore?.setInputStart(newStartDate);
    recordingStore?.setInputEnd(newEndDate);
  };

  const handleStartTimeChange = (selectedTime: Date) => {
    const auto = recordingStore?.inputEnd;

    if (selectedTime >= auto!) return toast.error('Время ничала не может быть больше времени окончания');
    const selectedHours = selectedTime.getHours();
    const selectedMinutes = selectedTime.getMinutes();

    const newStartTime = dayjs(date).set('hour', selectedHours).set('minute', selectedMinutes);

    recordingStore?.setInputStart(newStartTime.toDate());
    recordingStore?.setInputStart(newStartTime.toDate());
  };

  const handleEndTimeChange = (selectedTime: Date) => {
    const auto = recordingStore?.inputStart;

    if (selectedTime <= auto!) return toast.error('Время окончания не может быть меньше времени начала');
    const selectedHours = selectedTime.getHours();
    const selectedMinutes = selectedTime.getMinutes();

    const newEndTime = dayjs(date).set('hour', selectedHours).set('minute', selectedMinutes);

    recordingStore?.setInputEnd(newEndTime.toDate());
    recordingStore?.setInputEnd(newEndTime.toDate());
  };

  const CustomPopperContainer: React.FC<any> = ({ children, ...props }) => (
    <div style={{ visibility: isCalendarOpen ? 'visible' : 'hidden' }} {...props}>
      {children}
    </div>
  );

  const CustomInputComponent: React.FC<any> = ({ onClick, value, ...props }) => (
    <FlexContainer style={{ cursor: 'pointer' }} onClick={onClick}>
      {value}
    </FlexContainer>
  );

  const CustomDatePickerHeader: React.FC<any> = ({ date, decreaseMonth, increaseMonth, ...props }) => (
    <div>
      <div>{dayjs(date).format('MMMM YYYY')}</div>
      <FlexContainer>
        <div onClick={decreaseMonth}>{'<'}</div>
        <div onClick={() => setCurrentDate(new Date())}>Today</div>
        <div onClick={increaseMonth}>{'>'}</div>
      </FlexContainer>
    </div>
  );
  return (
    <>
      <ModalGrid className='dateWrapper'>
        <FlexContainer className='dateInput formElement'>
          <DatePicker
            dateFormat='yyyy/MM/d'
            locale={ru}
            shouldCloseOnSelect={!(!startDate || Boolean(startDate && endDate))}
            selected={date}
            name='inputDate'
            onChange={handleDateChange}
            onCalendarOpen={() => setIsCalendarOpen(true)}
            onCalendarClose={() => setIsCalendarOpen(false)}
            popperContainer={CustomPopperContainer}
            calendarClassName='custom-calendar'
            popperClassName='custom-popper'
            highlightDates={selectedDates}
          />
          <IconInstance name={EIcon.calendar} />
        </FlexContainer>
        <ModalGrid className='dateInputTime'>
          <div>
            <FlexContainer className='formElement'>
              <DatePicker
                dateFormat='HH:mm'
                selected={recordingStore?.inputStart}
                showTimeSelect
                showTimeInput
                timeFormat='HH:mm'
                shouldCloseOnSelect={true}
                popperPlacement='bottom-start'
                timeIntervals={10}
                name='inputStartTime'
                onChange={handleStartTimeChange}
                value={
                  recordingStore?.inputStart
                    ? recordingStore.inputStart.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                      })
                    : ''
                }
              />
              <IconInstance name={EIcon.clock} />
            </FlexContainer>
          </div>

          <div>
            <FlexContainer className='formElement'>
              <DatePicker
                dateFormat='HH:mm'
                selected={recordingStore?.inputEnd}
                showTimeSelect
                showTimeInput
                timeFormat='HH:mm'
                timeIntervals={10}
                name='inputEndTime'
                onChange={handleEndTimeChange}
                value={
                  recordingStore?.inputEnd
                    ? recordingStore?.inputEnd.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                      })
                    : ''
                }
              />
              <IconInstance name={EIcon.clock} />
            </FlexContainer>
          </div>
        </ModalGrid>
      </ModalGrid>
    </>
  );
});

export default inject('recordingStore')(DateElement);
