import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import dayjs from 'dayjs';
import { inject, observer } from 'mobx-react';

import { CalendarHeader, CalendarWrapper } from './Calendar.styled';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import {
  CalendarContent,
  WorkbenchSubText,
  WorkbenchSubTitle,
  WorkbenchText
} from '../../../../components/views/workbench/Workbench.styled';
import CabinetsStore from '../../../../store/cabinetsStore';
import ClientsStore from '../../../../store/clientsStore';
import FilialStore from '../../../../store/filialStore';
import LessonsStore from '../../../../store/lessonsStore';
import { FlexContainer, FlexWithAlign } from '../../../../utils/styleUtils';
import { InformationWrapper } from '../../../../components/views/PageStyled.styled';

interface IProps {
  lessonsStore?: LessonsStore;
  clientsStore?: ClientsStore;
  cabinetsStore?: CabinetsStore;
  filialStore?: FilialStore;
}

const Calendar: FC<IProps> = observer((props) => {
  const { lessonsStore, filialStore, clientsStore, cabinetsStore } = props;
  const { t } = useTranslation();
  const { lessons, fetchLessons } = lessonsStore!;
  const { activeFilial } = filialStore!;
  const { fetch, cabinets } = cabinetsStore!;
  const { clients } = clientsStore!;
  const formatedTime = dayjs(new Date()).format('DD');
  const formattedDate = dayjs(new Date()).format('DD.MM.YYYY');
  const location = useLocation();

  const { pathname } = location;
  const fetchLessonsInfo = async () => {
    await fetchLessons();
    if (activeFilial?.id) {
      await fetch(activeFilial?.id);
    }
  };

  useEffect(() => {
    fetchLessonsInfo();
  }, []);


  return (
    <InformationWrapper>
      <WorkbenchSubTitle>
        {t('Календарь')}
        {pathname === '/workbench' && (
          <Link to={'/products/cabinets'}>
            <IconInstance name={EIcon.arrowleft} />
          </Link>
        )
        }
      </WorkbenchSubTitle>
      <CalendarWrapper>
        <FlexContainer $gap={'12px'}>
          {cabinets &&
            cabinets
              .map((cabinet) => (
                <FlexContainer
                  $gap={'12px'}
                  $column
                  key={cabinet.id}
                >
                  <CalendarHeader>
                    <WorkbenchText>{cabinet.name}</WorkbenchText>
                    <WorkbenchSubText>
                      {lessons &&
                        lessons.filter((item) => dayjs(item.start).format('DD') === formatedTime && item.resourceId === cabinet.id)
                          .length}{' '}
                      {t('записи на сегодня')} {formattedDate}
                    </WorkbenchSubText>
                  </CalendarHeader>
                  <FlexContainer
                    $column
                    $gap={'12px'}
                  >
                    {lessons &&
                      lessons
                        .filter((item) => dayjs(item.start).format('DD') === formatedTime && item.resourceId === cabinet.id && item.ClientId !== null)
                        .map((item) => (
                          <CalendarContent key={item.id}>
                            <FlexWithAlign
                              $justify={'between'}
                              $alignCenter={'center'}
                            >
                              <FlexWithAlign $alignCenter={'center'}>
                                <IconInstance name={EIcon.calendar} />
                                <WorkbenchText>
                                  {dayjs(item.start).format('HH:mm')} - {dayjs(item.end).format('HH:mm')}
                                </WorkbenchText>
                              </FlexWithAlign>
                              <div>
                                {item.comfirmationCopmlete && item.comfirmationCopmlete === 'no' ? (
                                  <p>{t('Не подтверждена')}</p>
                                ) : (
                                  <p className={'confirmed'}>{t('Подтверждена')}</p>
                                )}
                              </div>
                            </FlexWithAlign>
                            <FlexWithAlign
                              $column
                              $gap='4px'
                            >
                              <WorkbenchSubText>
                                {item.SubproductFull.group === 'no' ? t('Занятие индивидуальное') : t('Групповое занятие')} "
                                {item.SubproductFull.name}"
                              </WorkbenchSubText>
                              <WorkbenchText>
                                {item.SubproductFull.group === 'no'
                                  ? clients.find((client) => client.id === item.ClientId?.[0]?.idclient)?.name
                                  : `${item.ClientId?.length} ${t('из')} ${item.seats}`}
                              </WorkbenchText>
                            </FlexWithAlign>
                          </CalendarContent>
                        ))}
                  </FlexContainer>
                </FlexContainer>
              ))
              .slice(0, 3)}
        </FlexContainer>
      </CalendarWrapper>
    </InformationWrapper>
  );
});

export default inject('lessonsStore', 'clientsStore', 'cabinetsStore', 'clientsStore', 'filialStore')(Calendar);
