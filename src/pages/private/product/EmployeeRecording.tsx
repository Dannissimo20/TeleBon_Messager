import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import CommonRecording from './CommonRecording';
import { renameEmployedIdToResourceId, renameFioToTitle } from './helpers/helperFunctions';
import { Wrapper } from './styles/Recording.styled';

import CabinetsStore from '../../../store/cabinetsStore';
import CalendarStore from '../../../store/calendarStore';
import ClientsStore from '../../../store/clientsStore';
import FilialStore from '../../../store/filialStore';
import LessonsStore from '../../../store/lessonsStore';
import { INIT } from '../../../utils/state';

import 'react-datepicker/dist/react-datepicker.css';
import ModalStore from '../../../store/modalStore';
import EmployeeRecordingStore from '../../../store/recordingStore';
import SubproductsStore from '../../../store/subProductsStore';
import UserStore, { IUser } from '../../../store/userStore';

interface IProps {
  calendarStore?: CalendarStore;
  filialStore?: FilialStore;
  lessonsStore?: LessonsStore;
  cabinetsStore?: CabinetsStore;
  modalStore?: ModalStore;
  clientsStore?: ClientsStore;
  subproductsStore?: SubproductsStore;
  userStore?: UserStore;
  recordingStore?: EmployeeRecordingStore;
}

const EmployeeRecording: React.FC<IProps> = observer(({ userStore, recordingStore, lessonsStore, filialStore, cabinetsStore }) => {
  const { pathname } = useLocation();
  const newPathname = pathname.replace(/\/\w{24}$/, '');

  const { fetch } = cabinetsStore!;
  const { filials } = filialStore!;
  const { lessons } = lessonsStore!;
  const cabinetsState = cabinetsStore!.state;
  const lessonsState = lessonsStore!.state;
  const { user, fetchUsers } = userStore!;

  const { productId } = useParams();
  const fetchUserInfo = async () => {
    await fetchUsers();
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const renamedResources = renameFioToTitle(user);

  const [, setInputPlaceholder] = useState('Создать');

  const [isActiveResource, setIsActiveResource] = useState(renamedResources?.[0]);
  const [myEvents, setMyEvents] = useState<any>(lessons);

  useEffect(() => {
    setMyEvents(lessons);
  }, [lessonsState]);

  useEffect(() => {
    if (filials && filials[0] && cabinetsState === INIT) {
      fetch(filials[0]?.id);
    }
    if (renamedResources?.length > 0) {
      setIsActiveResource(renamedResources?.[0]);
    }
  }, [filials, cabinetsState]);

  const filteredEvents = renameEmployedIdToResourceId(myEvents.filter((event: any) => event.productId === productId));

  const handleSelect = (selectInfo: any) => {
    const start: Date = new Date(selectInfo.startStr);
    const end: Date = new Date(selectInfo.endStr);
    if (newPathname === '/products/employee') {
      const employeeId = selectInfo.resource._resource.id;
      const filterIdToFio = user.find((item: IUser) => item.id === employeeId);
      recordingStore?.setIsEmployeeId(employeeId);
      recordingStore?.setIsEmployee(filterIdToFio?.fio);
    }

    start.setHours(start.getHours());
    end.setHours(end.getHours());
    let id: string | null = null;

    if (selectInfo.resource && selectInfo.resource._resource) {
      id = selectInfo.resource._resource?.id;
    }
    recordingStore?.setIsCabinetId(id || '');
    recordingStore?.setInputStart(selectInfo.start);
    recordingStore?.setInputEnd(selectInfo.end);

    recordingStore?.setIsShow(true);
    setInputPlaceholder('Создать');
  };

  const props = { renamedResources, isActiveResource, setIsActiveResource, handleSelect, filteredEvents, myEvents, setMyEvents };

  return (
    <Wrapper
      className='demo-app'
      itemID={isActiveResource?.id}
    >
      <CommonRecording {...props} />
    </Wrapper>
  );
});

export default inject(
  'calendarStore',
  'recordingStore',
  'clientsStore',
  'userStore',
  'subproductsStore',
  'productsStore',
  'filialStore',
  'cabinetsStore',
  'lessonsStore',
  'modalStore'
)(EmployeeRecording);
