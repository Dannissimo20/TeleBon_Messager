import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import CommonRecording from './CommonRecording';
import { renameNameToTitle } from './helpers/helperFunctions';
import { Wrapper } from './styles/Recording.styled';

import CabinetsStore from '../../../store/cabinetsStore';
import CalendarStore from '../../../store/calendarStore';
import ClientsStore from '../../../store/clientsStore';
import FilialStore from '../../../store/filialStore';
import LessonsStore from '../../../store/lessonsStore';
import { INIT } from '../../../utils/state';

import 'react-datepicker/dist/react-datepicker.css';

import ModalStore from '../../../store/modalStore';
import ProductsStore from '../../../store/productsStore';
import RecordingStore from '../../../store/recordingStore';
import SubproductsStore from '../../../store/subProductsStore';
import UserStore from '../../../store/userStore';

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
}

const Recording: React.FC<IProps> = observer(({ productsStore, recordingStore, lessonsStore, filialStore, cabinetsStore }) => {
  const { fetch, cabinets } = cabinetsStore!;
  const { filials } = filialStore!;
  const { lessons } = lessonsStore!;
  const cabinetsState = cabinetsStore!.state;
  const lessonsState = lessonsStore!.state;

  const navigate = useNavigate();
  const { productId } = useParams();

  const renamedResources = renameNameToTitle(cabinets);
  const [, setInputPlaceholder] = useState('Создать');

  const [isActiveResource, setIsActiveResource] = useState(renamedResources[0]);
  const [myEvents, setMyEvents] = useState<any>(lessons);

  const fetchProductsInfo = async () => {
    const productsList = await productsStore?.fetchProducts();
    if(productId !== undefined){
      navigate(`/products/cabinets/${productId}`);
    }else{
      productsList && productsList[0] && navigate(`/products/cabinets/${productsList[0].id}`);
    }

  };
  useEffect(() => {
    fetchProductsInfo();
  }, []);

  useEffect(() => {
    setMyEvents(lessons);
  }, [lessonsState]);

  useEffect(() => {
    if (filials && filials[0] && cabinetsState === INIT) {
      fetch(filials[0]?.id);
    }
    if (renamedResources.length > 0) {
      setIsActiveResource(renamedResources[0]);
    }
  }, [filials, cabinetsState]);

  const filteredEvents = myEvents.filter((event: any) => event.productId === productId);

  const handleSelect = (selectInfo: any) => {
    const start: Date = new Date(selectInfo.startStr);
    const end: Date = new Date(selectInfo.endStr);
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
  'productsStore',
  'clientsStore',
  'userStore',
  'subproductsStore',
  'productsStore',
  'filialStore',
  'cabinetsStore',
  'lessonsStore',
  'modalStore'
)(Recording);
