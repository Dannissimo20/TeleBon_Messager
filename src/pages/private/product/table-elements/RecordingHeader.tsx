import React, { FC } from 'react';
import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import classnames from 'classnames';
import { ReactComponent as FilterIcon } from '../../../../components/icons/filter.svg';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { inject, observer } from 'mobx-react';
import CalendarStore from '../../../../store/calendarStore';
import CommonButton from '../../../../components/shared/button/CommonButton';
import { FlexWithAlign, Partition } from '../../../../utils/styleUtils';
import { CalendarWrapper, DateManipulation, Header, HeaderWrapper, Menu } from './RecordingHeader.styled';
import ProductsCalendar from '../ProductsCalendar';
import { useOutside } from '../../../../components/hooks/useOutside';
import CommonDropdown from '../../../../components/shared/dropdawn/CommonDropdown';
import SidebarStore from '../../../../store/sidebarStore';
import { addDateBy } from '../../../../utils/date-events';

interface IProps {
  calendarStore?: CalendarStore;
  refCalendar: any;
  sidebarStore?: SidebarStore;
  setCurrentView: any;
  currentView: 'resourceTimeGridDay' | 'resourceTimeGridWeek' | 'resourceDayGridMonth';
  setIsActiveResource: any;
  setIsOpen: (arg: boolean) => void;
  isOpen: boolean;
  renamedResources: any[];
  isActiveResource: any;
  isToggleEventType: any;
  setIsToggleEventType: any;
}

const RecordingHeader: FC<IProps> = observer(
  ({
    calendarStore,
    refCalendar,
    setCurrentView,
    currentView,
    isToggleEventType,
    setIsToggleEventType,
    setIsActiveResource,
    setIsOpen,
    isOpen,
    sidebarStore,
    renamedResources,
    isActiveResource
  }) => {
    const { activeDate, getMonday } = calendarStore!;

    const { ref, setIsShow, isShow } = useOutside(false);

    const dayJsStartWeek = dayjs(getMonday());
    const dayJsEndWeek = dayjs(addDateBy(getMonday(), 6));
    const dayJsDate = dayjs(activeDate);
    const formatedWeekStart = dayJsStartWeek.locale('ru').format('DD.MM.YYYY');
    const formatedWeekEnd = dayJsEndWeek.locale('ru').format('DD.MM.YYYY');
    const formatedDate = dayJsDate.locale('ru').format('DD.MM.YYYY');
    const switchToDayView = () => {
      if (refCalendar.current) {
        refCalendar.current.getApi().changeView('resourceTimeGridDay');
        setCurrentView('resourceTimeGridDay');
      }
    };

    const switchToWeekView = () => {
      if (refCalendar.current) {
        refCalendar.current.getApi().changeView('resourceTimeGridWeek');
        setCurrentView('resourceTimeGridWeek');
      }
    };

    const switchToMonthView = () => {
      if (refCalendar.current) {
        refCalendar.current.getApi().changeView('resourceDayGridMonth');
        setCurrentView('resourceDayGridMonth');
      }
    };
    const options = [
      {
        value: '0',
        label: 'Все записи'
      },
      {
        value: '1',
        label: 'Только групповые'
      },
      {
        value: '2',
        label: 'Только индивидуальные'
      }
    ];
    const createEmployeer = () => {
      sidebarStore!.openSidebar({ name: 'CREATE_EMPLOYEE' });
    };
    const handleGroup = (selected: any) => {
      setIsToggleEventType(parseInt(selected.value));
    };
    return (
      <HeaderWrapper>
        <Header className='main'>
          <h2>Указание интервала записи</h2>
          <DateManipulation>
            <button
              className={classnames(currentView === 'resourceTimeGridDay' && 'active')}
              onClick={switchToDayView}
            >
              День
            </button>
            <button
              className={classnames(currentView === 'resourceTimeGridWeek' && 'active')}
              onClick={switchToWeekView}
            >
              Неделя
            </button>
            <button
              className={classnames(currentView === 'resourceDayGridMonth' && 'active')}
              onClick={switchToMonthView}
            >
              Месяц
            </button>
          </DateManipulation>
          {currentView !== 'resourceTimeGridDay' && (
            <Header
              className='menu'
              onClick={() => setIsOpen(!isOpen)}
            >
              <button className={classnames('button', isOpen && 'active')}>
                <p>{isActiveResource?.name || isActiveResource?.fio}</p>
                <IconInstance name={EIcon.arrowleft} />
              </button>
              {isOpen && (
                <div>
                  {renamedResources.map((item: any) => (
                    <div
                      onClick={() => {
                        setIsActiveResource(item);
                        setIsOpen(false);
                      }}
                      key={item?.id}
                    >
                      <p>{item?.name || item?.fio}</p>
                    </div>
                  ))}
                </div>
              )}
            </Header>
          )}
          <CalendarWrapper ref={ref}>
            <FlexWithAlign
              className={classnames(isShow && 'active')}
              onClick={() => setIsShow(!isShow)}
              $alignCenter='center'
              $gap='16px'
            >
              <IconInstance name={EIcon.calendar} />
              <p>{currentView === 'resourceTimeGridWeek' ? `${formatedWeekStart} - ${formatedWeekEnd}` : formatedDate}</p>
            </FlexWithAlign>
            {isShow && (
              <Menu>
                <ProductsCalendar currentView={currentView} />
              </Menu>
            )}
          </CalendarWrapper>
        </Header>
        <FlexWithAlign
          $alignCenter='center'
          $gap='8px'
        >
          <FlexWithAlign
            className='filteredRecordingTypeButton'
            $alignCenter='center'
            $gap='16px'
          >
            <IconInstance name={EIcon.users} />
            <CommonDropdown
              options={options}
              currentValue={isToggleEventType === 0 ? '0' : isToggleEventType === 1 ? '1' : isToggleEventType === 2 && '2'}
              onChange={handleGroup}
            />
          </FlexWithAlign>

          <Partition />
          <CommonButton
            typeBtn='ghost'
            className='button'
            onClick={createEmployeer}
          >
            <FlexWithAlign
              $alignCenter='center'
              $gap='16px'
            >
              <FilterIcon /> Фильтр
              <Menu></Menu>
            </FlexWithAlign>
          </CommonButton>
        </FlexWithAlign>
      </HeaderWrapper>
    );
  }
);

export default inject('calendarStore', 'sidebarStore')(RecordingHeader);
