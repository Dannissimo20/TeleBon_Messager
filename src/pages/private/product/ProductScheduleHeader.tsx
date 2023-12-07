import classnames from 'classnames';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { ReactComponent as ArrowIcon } from '../../../components/icons/arrow-switch.svg';
import { ReactComponent as ClockIcon } from '../../../components/icons/clock.svg';

const Wrapper = styled.div`
  display: flex;
  border-radius: 8px 8px 0 0;
  border: 2px solid ${(props) => props.theme.color.secondaryMedium};
  border-bottom: none;
`;
const Time = styled.div`
  width: 84px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 2px solid ${(props) => props.theme.color.secondaryMedium};
`;
const NavigationBox = styled.div`
  display: grid;
  grid-template-columns: 220px auto 220px;
  /* justify-content: space-between; */
  padding: 20px;
  flex-grow: 1;
`;
const Date = styled.div`
  &::first-letter {
    text-transform: capitalize;
  }
`;
const DaySwitcher = styled.div`
  display: flex;
  justify-content: center;
`;
const ViewSwitcher = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ViewTab = styled.div`
  padding: 0 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &.active {
    color: ${(props) => props.theme.color.mainLight};
  }
  &.disabled {
    color: ${(props) => props.theme.color.secondaryMedium};
    cursor: default;
    &:hover {
      opacity: 1;
    }
  }
`;
const Day = styled.div`
  width: 120px;
  text-align: center;
  &::first-letter {
    text-transform: capitalize;
  }
`;
const Arrow = styled.div`
  width: 12px;
  height: 12px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  &:last-of-type {
    svg {
      transform: rotate(180deg);
    }
  }
`;
const Box = styled.div`
  flex-grow: 1;
`;
const Cabinets = styled.div`
  /* display: grid;
  grid-template-columns: auto; */
  display: flex;
  border-top: 2px solid ${(props) => props.theme.color.secondaryMedium};
`;
const Cabinet = styled.div`
  text-align: center;
  opacity: 0.5;
  padding: 19px 0;
  flex-grow: 1;
  flex-basis: 0;
`;

interface IProps {
  choosenDate: string;
  choosenView: 'day' | 'week' | 'month';
  switchView: (view: 'day' | 'week' | 'month') => void;
  schedule?: any;
  setNextDay: () => void;
  setPrevDay: () => void;
}

// eslint-disable-next-line react/prop-types
const ProductScheduleHeader: React.FC<IProps> = ({ choosenDate, choosenView, switchView, schedule, setNextDay, setPrevDay }) => {
  const views = ['day', 'week', 'month'];
  const dayJsDate = dayjs(choosenDate);

  const formatedDate = dayJsDate.locale('ru').format('MMMM D, dddd');
  const formatedWeekDay = dayJsDate.locale('ru').format('dddd');
  const i18n: any = {
    day: 'День',
    week: 'Неделя',
    month: 'Месяц'
  };
  const handleSwitch = (view: 'day' | 'week' | 'month') => {
    if (view !== 'week' && view !== 'month') {
      switchView(view);
    }
  };

  return (
    <Wrapper>
      <Time>
        <ClockIcon />
      </Time>
      <Box>
        <NavigationBox>
          <Date>{formatedDate}</Date>
          <DaySwitcher>
            <Arrow onClick={setPrevDay}>
              <ArrowIcon />
            </Arrow>
            <Day>{formatedWeekDay}</Day>
            <Arrow onClick={setNextDay}>
              <ArrowIcon />
            </Arrow>
          </DaySwitcher>
          <ViewSwitcher>
            {views.map((item: any) => (
              <ViewTab
                className={classnames({
                  active: choosenView === item,
                  disabled: item === 'week' || item === 'month'
                })}
                key={`view-${item}`}
                onClick={() => handleSwitch(item)}
              >
                {i18n[item]}
              </ViewTab>
            ))}
          </ViewSwitcher>
        </NavigationBox>
        {schedule && schedule[0] ? (
          <Cabinets>
            {schedule?.map((cabinet: any, i: number) => (
              <Cabinet key={i}>{cabinet.cabinetName}</Cabinet>
            ))}
          </Cabinets>
        ) : (
          ''
        )}
      </Box>
    </Wrapper>
  );
};

export default ProductScheduleHeader;
