import { FC, useEffect, useState } from 'react';
import { optionsDateInModal } from '../../../../utils/date-events';
import { EIcons, Icon as IconInstance } from '../../../../components/icons';
import styled from 'styled-components';

const TimerWrapper = styled.h2`
  display: flex;
  gap: 12px;
  align-items: center;
`;
const Timer: FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <TimerWrapper>
      <IconInstance name={EIcons.calendar} />
      {currentDateTime.toLocaleDateString('ru-RU', optionsDateInModal).replace('. в', ' ,')}
    </TimerWrapper>
  );
};

export default Timer;
