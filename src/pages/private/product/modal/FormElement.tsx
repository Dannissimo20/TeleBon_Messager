import React, { FC, useEffect, useState } from 'react';

import { inject, observer } from 'mobx-react';

import FormSingle from './FormSingle';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../components/shared/button/CommonButton';
import CommonLoader from '../../../../components/shared/loader/CommonLoader';
import CabinetsStore from '../../../../store/cabinetsStore';
import CalendarStore from '../../../../store/calendarStore';
import ClassificatorsStore from '../../../../store/classificatorsStore';
import ClientsStore, { IClient } from '../../../../store/clientsStore';
import FilialStore from '../../../../store/filialStore';
import LessonsStore from '../../../../store/lessonsStore';
import ModalStore from '../../../../store/modalStore';
import SubproductsStore from '../../../../store/subProductsStore';

import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line import/order
import { useLocation, useParams } from 'react-router-dom';

import UserStore from '../../../../store/userStore';

// eslint-disable-next-line import/order
import { toast } from 'react-toastify';

import { apiPost, apiPut } from '../../../../utils/apiInstance';
import { PENDING } from '../../../../utils/state';
import { FlexWithAlign } from '../../../../utils/styleUtils';

// eslint-disable-next-line import/order
import FullCalendar from '@fullcalendar/react';

// eslint-disable-next-line import/order
import RecordingStore from '../../../../store/recordingStore';

// eslint-disable-next-line import/order
import { ModalContainer } from './start/FirstForm.styled';

import { validationRecordingModal } from '../../../../utils/validation-input';

// eslint-disable-next-line import/order
import { useFormik } from 'formik';
// eslint-disable-next-line import/order

interface IProps {
  calendarStore?: CalendarStore;
  filialStore?: FilialStore;
  lessonsStore?: LessonsStore;
  cabinetsStore?: CabinetsStore;
  modalStore?: ModalStore;
  clientsStore?: ClientsStore;
  subproductsStore?: SubproductsStore;
  userStore?: UserStore;
  classificatorsStore?: ClassificatorsStore;
  recordingStore?: RecordingStore;
  refCalendar?: React.RefObject<FullCalendar>;
  chat: number;
}
const FormElement: FC<IProps> = observer((props) => {
  const {
    recordingStore,
    classificatorsStore,
    refCalendar,
    modalStore,
    userStore,
    clientsStore,
    subproductsStore,
    lessonsStore,
    filialStore,
    chat
  } = props;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { activeFilial } = filialStore!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { clients, fetchClients } = clientsStore!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { subproducts, fetchSubproducts } = subproductsStore!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { lessons, state, fetchLessons } = lessonsStore!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { user } = userStore!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { fetchClassificators } = classificatorsStore!;
  const { t } = useTranslation();
  const { productId } = useParams();
  const lessonToUpdate = lessons.find((item: { id: string }) => item.id === recordingStore?.isId);
  const filterGroup = subproducts.find((item) => item.id === lessonToUpdate?.subproductId);
  const { pathname } = useLocation();
  const newPathname = pathname.replace(/\/\w{24}$/, '');

  const initialValues = {
    clientId: [],
    comments: '',
    employedid: newPathname === '/products/employee' ? recordingStore?.isEmployeeId : '',
    end: '',
    filialId: '',
    comfirmationCopmlete: 'no',
    paymentFullComplete: 'no',
    paysFull: 0,
    productId: productId,
    resourceId: recordingStore?.isCabinetId || '',
    seats: 1,
    stage: 1,
    start: '',
    steps: 0,
    subproductId: '',
    typecreatesession: true,
    typeservice: true,
    name: '',
    phone: '',
    idclient: ''
  };
  const clientNames = lessonToUpdate?.ClientId?.map((client: any) => {
    const matchingClient = clients.find((item) => item.id === client.idclient);

    return matchingClient?.name;
  });

  const clientPhone = lessonToUpdate?.ClientId?.map((client: any) => {
    const matchingClient = clients.find((item) => item.id === client.idclient);

    return matchingClient?.phone;
  });

  const formik = useFormik({
    initialValues: lessonToUpdate
      ? {
          subproductId: lessonToUpdate.subproductId,
          end: lessonToUpdate.end,
          start: lessonToUpdate.start,
          productId: lessonToUpdate.productId,
          resourceId: lessonToUpdate.resourceId,
          filialId: lessonToUpdate.filialId,
          paysFull: lessonToUpdate.paysFull,
          employedid: lessonToUpdate.employedid,
          comments: lessonToUpdate.comments,
          comfirmationCopmlete: lessonToUpdate.paymentFullComplete,
          steps: lessonToUpdate.steps,
          typecreatesession: lessonToUpdate.typecreatesession,
          typeservice: lessonToUpdate.typeservice,
          paymentFullComplete: lessonToUpdate.paymentFullComplete,
          confirmationComplete: lessonToUpdate.confirmationComplete,
          seats: lessonToUpdate.seats,
          name: filterGroup?.group === 'no' ? clientNames?.[0] : '',
          phone: filterGroup?.group === 'no' ? clientPhone?.[0] : '',
          clientId: lessonToUpdate.ClientId,
          stage: lessonToUpdate.stage
        }
      : initialValues,
    validationSchema: validationRecordingModal,
    onSubmit: async (values) => {},
    validateOnBlur: true
  });
  const [, setMyEvents] = useState(lessons);

  useEffect(() => {
    recordingStore?.setChatSub(filterGroup && filterGroup?.group === 'yes' ? 1 : 0);
    recordingStore?.setChatsubsingle(filterGroup && filterGroup?.group === 'no' ? 1 : 0);

    if (recordingStore?.isId) {
      const chatValue = filterGroup?.group === 'yes' ? 1 : filterGroup?.group === 'no' ? 0 : lessonToUpdate?.stage === -1 ? 2 : undefined;

      if (chatValue !== undefined) {
        recordingStore?.setChat(chatValue);
      }
    }
  }, []);
  useEffect(() => {}, [formik.values.name, formik.values.phone]);

  const fetchClassificatorsInfo = async () => {
    await fetchClassificators();
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchLessons();
      await fetchClassificatorsInfo();
    };
    fetchData();

    if (refCalendar?.current) {
      refCalendar?.current.getApi().refetchEvents();
    }
  }, []);
  const fetchSubproductsInfo = async (id: string) => {
    await fetchSubproducts(id);
  };

  useEffect(() => {
    fetchSubproductsInfo(formik.values.productId);
  }, [formik.values.productId]);
  useEffect(() => {
    lessonToUpdate
      ? formik.setFieldValue('seats', lessonToUpdate.seats)
      : formik.setFieldValue('seats', subproducts.find((item) => item.id === formik.values.subproductId)?.seatsmin);
  }, [formik.values.subproductId]);

  const deleteLesson = (info: string) => {
    modalStore?.openModal({
      name: 'CONFIRM_DELETE',
      payload: info,
      isDanger: true,
      actionName: 'LESSON',
      classModal: 'danger'
    });
    recordingStore?.handleCloseButtonClick();
  };

  const handleEventUpdate = async (updatedEvent: { id: string }) => {
    setMyEvents((prevEvents) => {
      return prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event));
    });
    await fetchLessons();
    if (refCalendar?.current) {
      refCalendar?.current.getApi().refetchEvents();
    }
  };
  const fetchLesssonsInfo = async () => {
    await fetchLessons();
  };

  const updateEventOnServer = async (updatedEvent: { id: string; start: string; end: string }, recordingType: number) => {
    try {
      const responses = [];

      const response = await apiPut(`/lesson`, updatedEvent);
      responses.push(response);
      if (response.status === 200) {
        recordingStore?.setIsId(response.data.id);
        handleEventUpdate(updatedEvent);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (recordingType === 0) {
          createNewClient(response.data.id);
        }
        if (refCalendar?.current) {
          refCalendar?.current.getApi().refetchEvents();
        }
      } else {
        toast.error('Ошибка при добавлении события');
      }
    } catch (error) {
      toast.error('Ошибка при добавлении события');
    }
  };

  const updateEventOnServerDate = async (updatedEvent: { id: string }) => {
    try {
      const response = await apiPost(`/lesson/${updatedEvent.id}`, updatedEvent);
      if (response.status === 200) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        handleEventUpdate(updatedEvent);
        if (refCalendar?.current) {
          refCalendar?.current.getApi().refetchEvents();
        }
      } else {
        toast.error('Ошибка при обновлении события');
      }
    } catch (error) {
      toast.error('Ошибка при обновлении события');
    }
  };

  const createNewClient = async (lessonId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const existingClient = clientsStore!.clients.find((client: IClient) => client.phone === formik.values.phone);
    if (existingClient) {
      if (existingClient.id) {
        const updatedClientData = {
          action: 'add',
          clientdata: {
            confirmation: 1,
            idclient: existingClient.id,
            paymentComplete: 'no',
            pays: 0
          },
          clientid: existingClient.id,
          lessonsid: lessonId
        };

        const res = await apiPost(`/lessons/addupdateclient`, updatedClientData);
        if (res.status === 200) {
          fetchLesssonsInfo();
          const updatedInputArray = [
            ...formik.values.clientId,
            {
              idclient: existingClient.id,
              confirmation: 1,
              paymentComplete: recordingStore?.isPaymentComplete,
              paymenttype: recordingStore?.isPaymentType,
              pays: 0
            }
          ];
          formik.setFieldValue('clientId', updatedInputArray);
        }
      } else {
        toast.error('Ошибка при создании клиента 1');

        return;
      }
    } else {
      try {
        const newClientData = {
          name: formik.values.name,
          phone: formik.values.phone,
          filial: filialStore?.filials[0].id,
          whatsapp: false,
          telegram: false,
          viber: false,
          sex: false
        };

        const response = await apiPut('/client', newClientData);

        if (response && response.data.id) {
          const updatedClientData = {
            action: 'add',
            clientdata: {
              confirmation: 1,
              idclient: response.data.id,
              paymentComplete: 'no',
              pays: 0
            },
            clientid: response.data.id,
            lessonsid: lessonId
          };

          const res = await apiPost(`/lessons/addupdateclient`, updatedClientData);
          if (res.status === 200) {
            fetchLesssonsInfo();
            const updatedInputArray = [
              ...formik.values.clientId,
              {
                idclient: response.data.id,
                confirmation: 1,
                paymentComplete: 'no',
                paymenttype: '',
                pays: 0
              }
            ];
            formik.setFieldValue('clientId', updatedInputArray);
          }
        } else {
          toast.error('Ошибка при создании клиента 1');

          return;
        }
      } catch (error) {
        console.error('Ошибка при создании клиента 2', error);
        toast.error('Ошибка при создании клиента 2');

        return;
      }
    }
  };

  const handleSubmit = async (recordingType: number) => {
    const start = recordingStore?.inputStart;
    const end = recordingStore?.inputEnd;
    const formattedStart = start?.toISOString().replace('T', ' ').replace('Z', '');
    const formattedEnd = end?.toISOString().replace('T', ' ').replace('Z', '');

    const updatedEvent: any = {
      start: formattedStart,
      end: formattedEnd,
      comments: formik.values.comments,
      typeservice: true,
      employedid: formik.values.employedid,
      resourceId: formik.values.resourceId,
      filialId: activeFilial ? activeFilial.id : '',
      seats: formik.values.seats,
      comfirmationCopmlete: formik.values.comfirmationCopmlete,
      productId: formik.values.productId,
      typecreatesession: true,
      paymentFullComplete: formik.values.paymentFullComplete,
      paysFull: formik.values.clientId?.reduce((acc: number, curr: { pays: number }) => acc + curr.pays, 0),
      stage: formik.values.stage,
      subproductId: formik.values.subproductId,
      steps: formik.values.stage === 1 ? 0 : 3,
      pays: formik.values.stage === 1 ? 0 : undefined
    };

    if (recordingStore?.isId) {
      updatedEvent.id = recordingStore?.isId;
      recordingStore?.setIsContinue(true);
      updateEventOnServerDate(updatedEvent);
    } else {
      updateEventOnServer(updatedEvent, recordingType);
    }
    await fetchClients();
    await fetchLessons();
    if (refCalendar?.current) {
      refCalendar?.current.getApi().refetchEvents();
    }
  };

  function renderClientFormButtons() {
    return (
      <FlexWithAlign $justify='between'>
        {recordingStore?.isId && (
          <CommonButton
            className='deleteButton'
            typeBtn='danger'
            onClick={() => deleteLesson(recordingStore?.isId)}
          >
            <IconInstance name={EIcon.trash} />
          </CommonButton>
        )}
        <FlexWithAlign>
          {((chat === 1 && recordingStore?.chatsub === 1) || (chat === 0 && recordingStore?.chatsubsingle === 1)) && (
            <CommonButton
              typeBtn='ghost'
              className='btn '
              onClick={() => {
                recordingStore?.setChatSub(0);
                recordingStore?.setChatsubsingle(0);
              }}
            >
              {t('Назад')}
            </CommonButton>
          )}
          {chat === 1 && recordingStore?.chatsub === 0 && (
            <CommonButton
              typeBtn='primary'
              className='btn'
              disabled={formik.values.subproductId === '' || formik.values.subproductId === null}
              onClick={() => {
                recordingStore?.setChatSub(1);
                handleSubmit(1);
                formik.setFieldValue('stage', 2);
              }}
            >
              {t('Добавить клиентов')}
            </CommonButton>
          )}

          {chat === 0 && recordingStore?.chatsubsingle === 0 && (
            <CommonButton
              typeBtn='primary'
              className='btn'
              disabled={
                formik.values.subproductId === '' ||
                formik.values.subproductId === null ||
                (formik.values.phone !== '' && formik.values.phone?.length < 12) ||
                formik.values.name === '' ||
                formik.values.phone === ''
              }
              onClick={() => {
                handleSubmit(0);
                recordingStore?.setChatsubsingle(1);
              }}
            >
              {t('Перейти к оплате')}
            </CommonButton>
          )}
          <>
            {((chat === 0 && recordingStore?.chatsubsingle === 1) || (chat === 1 && recordingStore?.chatsub === 1)) && (
              <CommonButton
                typeBtn='primary'
                className='btn'
                onClick={() => {
                  handleSubmit(3);
                  recordingStore?.handleCloseButtonClick();
                }}
                disabled={formik.values.subproductId === ''}
              >
                {state === PENDING ? (
                  <div>
                    <CommonLoader />
                  </div>
                ) : (
                  <span>{recordingStore?.isId ? t('Сохранить') : t('Создать')}</span>
                )}
              </CommonButton>
            )}
          </>
        </FlexWithAlign>
      </FlexWithAlign>
    );
  }

  return (
    <>
      <ModalContainer>
        <form
          autoComplete='off'
          onSubmit={(e) => e.preventDefault()}
        >
          <FormSingle
            chat={chat}
            formik={formik}
          />
        </form>
        <div className='btnsWrapper'>{renderClientFormButtons()}</div>
      </ModalContainer>
    </>
  );
});

export default inject(
  'calendarStore',
  'recordingStore',
  'classificatorsStore',
  'clientsStore',
  'userStore',
  'subproductsStore',
  'productsStore',
  'filialStore',
  'cabinetsStore',
  'lessonsStore',
  'modalStore'
)(FormElement);
