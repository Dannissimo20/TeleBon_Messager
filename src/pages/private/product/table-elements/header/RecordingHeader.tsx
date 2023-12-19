import React, { FC } from 'react';

import classnames from 'classnames';
import dayjs from 'dayjs';

import { CalendarWrapper, DateManipulation, Header, HeaderWrapper, Menu } from './RecordingHeader.styled';

import { useOutside } from '../../../../../components/hooks/useOutside';
import { ReactComponent as FilterIcon } from '../../../../../components/icons/filter.svg';
import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';

import 'dayjs/locale/ru';
import { inject, observer } from 'mobx-react';

import CommonButton from '../../../../../components/shared/button/CommonButton';
import CommonDropdown from '../../../../../components/shared/dropdawn/CommonDropdown';
import CalendarStore from '../../../../../store/calendarStore';
import SidebarStore from '../../../../../store/sidebarStore';
import { addDateBy } from '../../../../../utils/date-events';
import { FlexWithAlign, Partition } from '../../../../../utils/styleUtils';
import ProductsCalendar from '../../ProductsCalendar';

import { useTranslation } from 'react-i18next';

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
    sidebarStore,
    renamedResources,
    isActiveResource
  }) => {
    const { activeDate, getMonday } = calendarStore!;

    const { ref, setIsShow, isShow } = useOutside(false);
    const { ref: ref1, setIsShow: setIsShow1, isShow: isShow1 } = useOutside(false);
    const { t } = useTranslation();
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
        label: t('Все записи')
      },
      {
        value: '1',
        label: t('Только групповые')
      },
      {
        value: '2',
        label: t('Только индивидуальные')
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
          <h2>{t('Указание интервала записи')}</h2>
          <DateManipulation>
            <button
              className={classnames(currentView === 'resourceTimeGridDay' && 'active')}
              onClick={switchToDayView}
            >
              {t('День')}
            </button>
            <button
              className={classnames(currentView === 'resourceTimeGridWeek' && 'active')}
              onClick={switchToWeekView}
            >
              {t('Неделя')}
            </button>
            <button
              className={classnames(currentView === 'resourceDayGridMonth' && 'active')}
              onClick={switchToMonthView}
            >
              {t('Месяц')}
            </button>
          </DateManipulation>
          {currentView !== 'resourceTimeGridDay' && (
            <Header
              className='menu'
              onClick={() => setIsShow1(!isShow1)}
              ref={ref1}
            >
              <button className={classnames('button', isShow1 && 'active')}>
                <p>{isActiveResource?.name || isActiveResource?.fio}</p>
                <IconInstance name={EIcon.arrowleft} />
              </button>
              {isShow1 && (
                <div>
                  {renamedResources.map((item: any) => (
                    <div
                      onClick={() => {
                        setIsActiveResource(item);
                        setIsShow1(false);
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
              <FilterIcon /> {t('Фильтр')}
              <Menu></Menu>
            </FlexWithAlign>
          </CommonButton>
        </FlexWithAlign>
      </HeaderWrapper>
    );
  }
);

export default inject('calendarStore', 'sidebarStore')(RecordingHeader);
