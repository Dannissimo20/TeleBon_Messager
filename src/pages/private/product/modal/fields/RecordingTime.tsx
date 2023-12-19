import React, { FC, useState } from 'react';
import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { FlexContainer } from '../../../../../utils/styleUtils';
import { inject, observer } from 'mobx-react';
import RecordingStore from '../../../../../store/recordingStore';
import { ModalGrid } from '../start/FirstForm.styled';

interface IProps {
  recordingStore?: RecordingStore;
}

const DateElement: FC<IProps> = observer((props) => {
  const { recordingStore } = props;
  const [date, setDate] = useState<Date | null>(recordingStore?.inputStart ? dayjs(recordingStore?.inputStart).toDate() : null);

  const handleDateChange = (selectedDate: Date | null) => {
    if (!selectedDate) return;

    const newStartDate = new Date(selectedDate);
    const newEndDate = new Date(selectedDate);

    recordingStore?.setInputStart(newStartDate);
    recordingStore?.setInputEnd(newEndDate);

    setDate(selectedDate);
  };

  const handleStartTimeChange = (selectedTime: Date) => {
    const auto = recordingStore?.inputEnd;

    if (selectedTime >= auto!) {
      return toast.error('Время начала не может быть больше времени окончания');
    }

    recordingStore?.setInputStart(selectedTime);
  };

  const handleEndTimeChange = (selectedTime: Date) => {
    const auto = recordingStore?.inputStart;

    if (selectedTime <= auto!) {
      return toast.error('Время окончания не может быть меньше времени начала');
    }

    recordingStore?.setInputEnd(selectedTime);
  };

  return (
    <>
      <ModalGrid className='dateWrapper'>
        <FlexContainer className='dateInput formElement'>
          <DatePicker
            dateFormat='yyyy/MM/d'
            locale={ru}
            selected={date}
            name='inputDate'
            onChange={handleDateChange}
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
                name='inputStartTime'
                onChange={handleStartTimeChange}
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
                name='inputEndTime'
                onChange={handleEndTimeChange}
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
