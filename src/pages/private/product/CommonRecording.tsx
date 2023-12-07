import React, { FC, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ruLocale from '@fullcalendar/core/locales/ru';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import FullCalendar from '@fullcalendar/react';
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import scrollgridPlugin from '@fullcalendar/scrollgrid';
import dayjs from 'dayjs';
import { inject, observer } from 'mobx-react';

import FirstForm from './modal-elements/form-start/FirstForm';
import ProductsContent from './recorging-topbar/ProductsContent';
import RecordingEvent from './RevordingEvent';
import { LoadingAbsoluteWrapper } from './styles/Recording.styled';
import RecordingHeader from './table-elements/RecordingHeader';
import RenderDayCell from './table-elements/RenderDayCell';

import CommonLoader from '../../../components/shared/loader/CommonLoader';
import CabinetsStore from '../../../store/cabinetsStore';
import CalendarStore from '../../../store/calendarStore';
import ClientsStore from '../../../store/clientsStore';
import FilialStore from '../../../store/filialStore';
import LessonsStore from '../../../store/lessonsStore';
import ModalStore from '../../../store/modalStore';
import ProductsStore from '../../../store/productsStore';
import RecordingStore from '../../../store/recordingStore';
import SubproductsStore from '../../../store/subProductsStore';
import UserStore from '../../../store/userStore';
import { apiPost } from '../../../utils/apiInstance';
import { PENDING } from '../../../utils/state';

interface IProps {
  calendarStore?: CalendarStore;
  filialStore?: FilialStore;
  lessonsStore?: LessonsStore;
  cabinetsStore?: CabinetsStore;
  modalStore?: ModalStore;
  clientsStore?: ClientsStore;
  subproductsStore?: SubproductsStore;
  userStore?: UserStore;
  recordingStore?: RecordingStore;
  productsStore?: ProductsStore;
  renamedResources: any;
  handleSelect: any;
  filteredEvents: any;
  myEvents: any;
  setMyEvents: any;
  isActiveResource: any;
  setIsActiveResource: any;
}

const CommonRecording: FC<IProps> = observer(
  ({
    userStore,
    handleSelect,
    cabinetsStore,
    filteredEvents,
    myEvents,
    setMyEvents,
    renamedResources,
    isActiveResource,
    setIsActiveResource,
    calendarStore,
    recordingStore,
    subproductsStore,
    clientsStore,
    lessonsStore
  }) => {
    const refCalendar = useRef<FullCalendar>(null);
    const [, setEventUpdating] = useState(false);
    const [isToggleEventType, setIsToggleEventType] = useState(0);
    const { pathname } = useLocation();
    const newPathname = pathname.replace(/\/\w{24}$/, '');

    const { activeDate } = calendarStore!;
    const { cabinets } = cabinetsStore!;
    const { fetchClients } = clientsStore!;
    const { fetchLessons, state } = lessonsStore!;
    const { fetchUsers } = userStore!;
    const { fetchSubproducts, subproducts } = subproductsStore!;
    const { productId } = useParams();

    const fetchData = async () => {
      await fetchSubproducts(productId || '');
      await fetchClients();
      await fetchUsers();
      const response = await fetchLessons();

      setMyEvents(response);

      if (refCalendar.current) {
        refCalendar.current.getApi().refetchEvents();
      }
    };
    const onlySingle = filteredEvents.filter((item: any) => {
      const sas = subproducts.filter((itemTwo) => itemTwo.id === item.subproductId);

      return sas.some((item) => item.group === 'no');
    });
    const onlyGroup = filteredEvents.filter((item: any) => {
      const sas = subproducts.filter((itemTwo) => itemTwo.id === item.subproductId);

      return sas.some((item) => item.group === 'yes');
    });
    const fetchLessonData = async () => {
      await fetchLessons();
    };

    useEffect(() => {
      fetchData();
    }, [productId]);

    useEffect(() => {
      if (refCalendar.current) {
        refCalendar.current.getApi().refetchEvents();
      }
    }, [activeDate, productId]);

    useEffect(() => {
      const updateCalendarDate = async () => {
        const formattedDate = dayjs(activeDate).format('YYYY-MM-DD');
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (refCalendar.current) {
          refCalendar.current.getApi().gotoDate(formattedDate);
        }
      };
      updateCalendarDate();
    }, [activeDate, myEvents]);

    const handleClick = (info: any) => {
      console.log(info);
      const event = info.event;
      const start = new Date(event.start);
      const end = new Date(event.end);
      const id = event.id;
      const resourceId: string = event?._def?.resourceIds[0] || '';
      recordingStore?.setInputStart(start);
      recordingStore?.setInputEnd(end);
      recordingStore?.setIsCabinetId(resourceId);
      recordingStore?.setIsId(id);
      recordingStore?.setIsShow(true);
    };

    const handleEventResize = async (info: any) => {
      setEventUpdating(true);
      const event = info.event;
      const start = new Date(event.start);
      const end = new Date(event.end);
      const formattedStart = start.toISOString().replace('T', ' ').replace('Z', '');
      const formattedEnd = end.toISOString().replace('T', ' ').replace('Z', '');
      const updatedEvent = {
        id: event.id,
        start: formattedStart,
        end: formattedEnd,
        ClientId: event._def.extendedProps.ClientId,
        comments: event._def.extendedProps.comments,
        productId: event._def.extendedProps.productId,
        employedid: event._def.extendedProps.employedid
      };
      try {
        const response = await apiPost(`/lesson/${updatedEvent.id}`, updatedEvent);
        if (response.status === 200) {
          setMyEvents((prevEvents: { id: string }[]) => {
            const updatedEvents = prevEvents.map((event: { id: string }) => {
              if (event.id === updatedEvent.id) {
                return updatedEvent;
              }

              return event;
            });
            fetchLessonData();
            setEventUpdating(false);

            return updatedEvents;
          });
          if (refCalendar.current) {
            refCalendar.current.getApi().refetchEvents();
          }
        }
      } catch (error) {
        console.error('Ошибка при обновлении события');
        setEventUpdating(false);
      }
    };

    const [currentView, setCurrentView] = useState<'resourceTimeGridDay' | 'resourceTimeGridWeek' | 'resourceDayGridMonth'>(
      'resourceTimeGridDay'
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <>
        <ProductsContent />
        <RecordingHeader
          refCalendar={refCalendar}
          setCurrentView={setCurrentView}
          currentView={currentView}
          setIsActiveResource={setIsActiveResource}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          renamedResources={renamedResources}
          isActiveResource={isActiveResource}
          isToggleEventType={isToggleEventType}
          setIsToggleEventType={setIsToggleEventType}
        />
        {recordingStore?.isShow && <FirstForm refCalendar={refCalendar} />}
        {state === PENDING && (
          <LoadingAbsoluteWrapper>
            <CommonLoader />
          </LoadingAbsoluteWrapper>
        )}
        <FullCalendar
          plugins={[interactionPlugin, resourceTimeGridPlugin, resourceDayGridPlugin, scrollgridPlugin, momentTimezonePlugin]}
          initialView={currentView}
          contentHeight={'auto'}
          schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
          locale={ruLocale}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false
          }}
          editable={true}
          eventResize={handleEventResize}
          firstDay={1}
          slotMinTime={'08:00'}
          slotMaxTime={'23:00'}
          scrollTime='08:00:00'
          scrollTimeReset={false}
          selectable={true}
          selectMirror={true}
          navLinks={true}
          eventDrop={handleEventResize}
          slotDuration={{ hours: 1 }}
          allDaySlot={false}
          nowIndicator={true}
          dayCellContent={(arg) => (
            <RenderDayCell
              arg={arg}
              isActiveResource={isActiveResource}
              myEvents={myEvents}
            />
          )}
          navLinkDayClick={'resourceTimeGridDay'}
          resources={renamedResources}
          eventAllow={(dropInfo, draggedEvent) => {
            const isDisabled = draggedEvent?.extendedProps?.ClientId === null;

            return !isDisabled;
          }}
          ref={refCalendar}
          eventClassNames={(arg) => {
            const isSingleEvent = arg.event._def.extendedProps?.ClientId?.length === 1;
            const isClientIdEmpty = arg.event._def.extendedProps?.ClientId === null;
            const filteredGroup = subproducts.find((item) => item.id === arg.event._def.extendedProps.subproductId);

            if (isSingleEvent && filteredGroup?.group === 'no') {
              const additionalClass = renamedResources.length > 4 || arg.view.type === 'resourceTimeGridWeek' ? 'singleLargeEvent' : '';

              return `singleEvent ${isClientIdEmpty ? 'disabledElement ' : ''}${additionalClass}`;
            } else {
              const additionalClass = renamedResources.length > 4 || arg.view.type === 'resourceTimeGridWeek' ? 'groupLargeEvent' : '';

              return `groupEvent  ${isClientIdEmpty ? 'disabledElement ' : ''}${additionalClass}`;
            }
          }}
          eventContent={(arg) => {
            const event = arg.event;
            const type = arg.view.type;
            if (event._def.extendedProps.productId === productId && type === 'resourceTimeGridDay') {
              const seatsLength =
                newPathname === '/products/employee'
                  ? cabinets.find((item: { id: string }) => item.id === event._def.extendedProps.cabinetId)
                  : renamedResources.find((item: any) => item.id === event?._def?.resourceIds?.[0]);

              return (
                <RecordingEvent
                  event={event}
                  type={type}
                  seatsLength={seatsLength}
                  renamedResources={renamedResources}
                />
              );
            } else {
              const seatsLength =
                newPathname === '/products/employee'
                  ? cabinets.find((item: { id: string }) => item.id === event._def.extendedProps.cabinetId)
                  : renamedResources.find((item: any) => item.id === event?._def?.resourceIds?.[0]);

              return (
                <RecordingEvent
                  event={event}
                  type={type}
                  seatsLength={seatsLength}
                  renamedResources={renamedResources}
                />
              );
            }
          }}
          eventClick={handleClick}
          select={handleSelect}
          events={isToggleEventType === 0 ? filteredEvents : isToggleEventType === 1 ? onlyGroup : isToggleEventType === 2 && onlySingle}
          eventDurationEditable={true}
          eventOverlap={false}
        />
      </>
    );
  }
);
export default inject(
  'calendarStore',
  'recordingStore',
  'userStore',
  'productsStore',
  'clientsStore',
  'userStore',
  'subproductsStore',
  'productsStore',
  'filialStore',
  'cabinetsStore',
  'lessonsStore',
  'modalStore'
)(CommonRecording);
