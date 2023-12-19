import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';

import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

import { ConfirmationModalWrapper } from './ConfirmationPayment.styled';

import { useOutside } from '../../../../../components/hooks/useOutside';
import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../../components/shared/button/CommonButton';
import CommonDropdown from '../../../../../components/shared/dropdawn/CommonDropdown';
import cabinetsStore from '../../../../../store/cabinetsStore';
import ClassificatorsStore from '../../../../../store/classificatorsStore';
import ClientsStore, { IClient } from '../../../../../store/clientsStore';
import LessonsStore from '../../../../../store/lessonsStore';
import PaymentsStore from '../../../../../store/paymentsStore';
import RecordingStore from '../../../../../store/recordingStore';
import SubproductsStore from '../../../../../store/subProductsStore';
import UserStore from '../../../../../store/userStore';
import { apiPost } from '../../../../../utils/apiInstance';
import { FlexWithAlign, PageTitle, Text } from '../../../../../utils/styleUtils';
import { ModalGrid } from '../../modal/start/FirstForm.styled';
import { PENDING } from '../../../../../utils/state';

interface IProps {
  item: any;
  formik: any;
  paymentsStore?: PaymentsStore;
  subproductsStore?: SubproductsStore;
  recordingStore?: RecordingStore;
  cabinetsStore?: cabinetsStore;
  userStore?: UserStore;
  className?: string;
  clientsStore?: ClientsStore;
  classificatorsStore?: ClassificatorsStore;
  lessonsStore?: LessonsStore;
}
const ConfirmationPayment: FC<IProps> = observer((props) => {
  const {
    formik,
    item,
    lessonsStore,
    paymentsStore,
    classificatorsStore,
    clientsStore,
    userStore,
    cabinetsStore,
    recordingStore,
    className,
    subproductsStore
  } = props;

  const { payments } = paymentsStore!;
  const { subproducts } = subproductsStore!;
  const { user } = userStore!;
  const { classificators } = classificatorsStore!;
  const { cabinets } = cabinetsStore!;
  const { clients } = clientsStore!;
  const { fetchLessons, state } = lessonsStore!;

  const filteredSubproductByTarif = subproducts.find((item) => item.id === formik.values.subproductId);
  const filteredCabinet = cabinets.find((item) => item.id === formik.values.resourceId);
  const filteredEmployeed = user.find((item) => item.id === formik.values.employedid);
  const existingClient = clients.find((client: IClient) => client.phone === formik.values.phone && client.name === formik.values.name);

  const { ref, setIsShow, isShow } = useOutside(false);
  const [activeButton, setActiveButton] = useState('');
  const [isPays, setIsPays] = useState(filteredSubproductByTarif ? filteredSubproductByTarif?.tarif : '');

  const fetchLesssonsInfo = async () => {
    await fetchLessons();
  };

  const handlePaymentTypeChange = async (clientId: string, paymenttype: { label: string }) => {
    try {
      const updatedData = {
        action: 'update',
        clientdata: {
          paymenttype: paymenttype.label,
          idclient: clientId
        },
        clientid: clientId,
        lessonsid: recordingStore?.isId
      };
      const response = await apiPost(`/lessons/addupdateclient`, updatedData);

      if (response.status === 200) {
        fetchLesssonsInfo();
        const updatedArray = (formik.values.clientId || []).map((item: { idclient: string; paymenttype: string }) => {
          if (item.idclient === clientId) {
            return {
              ...item,
              paymenttype: paymenttype.label
            };
          }

          return item;
        });
        formik.setFieldValue('clientId', updatedArray);
        toast.success(`Тип оплаты обновлён на "${paymenttype.label}"`);
      } else {
        toast.error('Ошибка при добавлении события');
      }
    } catch (error) {
      toast.error('Ошибка при добавлении события');
    }
  };

  const confirmPayment = async (clientId: string) => {
    try {
      const updatedData = {
        action: 'update',
        clientdata: {
          paymentComplete: item.paymentComplete === 'yes' ? 'no' : 'yes',
          pays: item.paymentComplete === 'yes' ? 0 : parseInt(isPays),
          idclient: clientId
        },
        clientid: clientId,
        lessonsid: recordingStore?.isId
      };
      const response = await apiPost(`/lessons/addupdateclient`, updatedData);

      if (response.status === 200) {
        fetchLesssonsInfo();
        const updatedArray = (formik.values.clientId || []).map((item: { idclient: string; paymentComplete: string }) => {
          if (item.idclient === clientId) {
            return {
              ...item,
              paymentComplete: updatedData.clientdata.paymentComplete,
              pays: updatedData.clientdata.pays
            };
          }

          return item;
        });
        formik.setFieldValue('clientId', updatedArray);
        const allPaymentsComplete =
          updatedArray?.length !== 0 ? updatedArray.every((item: { paymentComplete: string }) => item.paymentComplete === 'yes') : false;
        formik.setFieldValue('paymentFullComplete', allPaymentsComplete ? 'yes' : 'no');

        toast.success(`Уплата успешно ${item.paymentComplete === 'yes' ? 'отменена' : 'подтверждена'}`);
        setIsShow(false);
      } else {
        toast.error('Ошибка при добавлении события');
      }
    } catch (error) {
      toast.error('Ошибка при добавлении события');
    }
  };
  const clientConfirmation = async (confirmationStatus: number, clientId: string) => {
    setActiveButton(clientId);
    try {
      const updatedData = {
        action: 'update',
        clientdata: {
          confirmation: confirmationStatus,
          idclient: clientId
        },
        clientid: clientId,
        lessonsid: recordingStore?.isId
      };
      const response = await apiPost(`/lessons/addupdateclient`, updatedData);

      if (response.status === 200) {
        fetchLesssonsInfo();
        const updatedArray = (formik.values.clientId || []).map((item: { idclient: string; paymenttype: string }) => {
          if (item.idclient === clientId) {
            return {
              ...item,
              confirmation: confirmationStatus
            };
          }

          return item;
        });
        formik.setFieldValue('clientId', updatedArray);
        const allConfirmationComplete = updatedArray.every(
          (item: { confirmation: number }) => item.confirmation === 2 || item.confirmation === 3
        );
        formik.setFieldValue('comfirmationCopmlete', allConfirmationComplete ? 'yes' : 'no');
        toast.success(
          `Статус изменен на "${
            confirmationStatus === 1
              ? 'В ожидании'
              : confirmationStatus === 2
              ? 'Подтверждена'
              : confirmationStatus === 3
              ? 'Пришел'
              : confirmationStatus === 4 && 'Не пришел'
          }"`
        );
        const allConfirmation = updatedArray.every((item: { confirmation: number }) => item.confirmation === 1);
        formik.setFieldValue('stage', allConfirmation ? 2 : 3);
      } else {
        toast.error('Ошибка при добавлении события');
      }
    } catch (error) {
      toast.error('Ошибка при добавлении события');
    }
  };

  return (
    <ConfirmationModalWrapper
      className={className}
      ref={ref}
    >
      {recordingStore?.chatsubsingle === 1 && (
        <>
          <Text>Данные клиента</Text>
          <div className='singleModalTable'>
            <ModalGrid className='header'>
              <p>Клиент</p>
              <p>Услуга</p>
            </ModalGrid>
            <ModalGrid>
              <FlexWithAlign
                $column
                $gap='4px'
              >
                <p>{formik.values.name}</p>
                <p>{formik.values.phone}</p>
                <div className='activeCLassificator'>
                  {classificators &&
                    existingClient &&
                    classificators
                      .filter((item) => item.productid === formik.values.productId && item.clientid === existingClient.id)
                      .slice(-1)
                      .map((item) => (
                        <div
                          style={{ background: item.color }}
                          key={item.name}
                        >
                          {item.name}
                        </div>
                      ))}
                </div>
              </FlexWithAlign>
              <FlexWithAlign
                $column
                $gap='4px'
              >
                <FlexWithAlign
                  $alignCenter='center'
                  $gap='4px'
                >
                  <p>{filteredSubproductByTarif && filteredSubproductByTarif.name}</p>
                  <p>({filteredSubproductByTarif && filteredSubproductByTarif.duration} мин.)</p>
                </FlexWithAlign>
                <FlexWithAlign
                  $alignCenter='center'
                  $gap='4px'
                >
                  <p>{filteredCabinet && filteredCabinet.name}</p> -
                  <FlexWithAlign
                    $alignCenter='center'
                    $gap='4px'
                  >
                    <p>{`${recordingStore?.inputStart.toLocaleDateString()} - ( ${recordingStore?.inputStart.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}`}</p>{' '}
                    -<p>{recordingStore?.inputEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>)
                  </FlexWithAlign>
                </FlexWithAlign>
                <FlexWithAlign>
                  <p>Исполнитель: {filteredEmployeed && filteredEmployeed.fio}</p>
                </FlexWithAlign>
              </FlexWithAlign>
            </ModalGrid>
          </div>
        </>
      )}
      <Text>Статус клиента</Text>

      <div className='btns'>
        <CommonButton
          disabled={state === PENDING}
          className={classnames(item?.confirmation === 1 && 'activeConfirmation', activeButton === item?.idclient && 'active')}
          onClick={() => clientConfirmation(1, item?.idclient)}
        >
          <>
            <IconInstance name={EIcon.clock} />
            <Text>В ожидании</Text>
          </>
        </CommonButton>
        <CommonButton
          disabled={state === PENDING}
          className={classnames(item?.confirmation === 2 && 'activeConfirmation', activeButton === item?.idclient && 'active')}
          onClick={() => clientConfirmation(2, item?.idclient)}
        >
          <>
            <IconInstance name={EIcon.succesoutline} />
            <Text>Подтверждена</Text>
          </>
        </CommonButton>
        <CommonButton
          disabled={state === PENDING}
          className={classnames(item?.confirmation === 3 && 'activeConfirmation', activeButton === item?.idclient && 'active')}
          onClick={() => clientConfirmation(3, item?.idclient)}
        >
          <IconInstance name={EIcon.thumbsupoutline} />
          <Text>Пришел</Text>
        </CommonButton>
        <CommonButton
          disabled={state === PENDING}
          className={classnames(item?.confirmation === 4 && 'activeConfirmation', activeButton === item?.idclient && 'active')}
          onClick={() => clientConfirmation(4, item?.idclient)}
        >
          <IconInstance name={EIcon.thumbsdownoutline} />
          <Text>Не пришел</Text>
        </CommonButton>
      </div>

      <div className='paymentsStatus'>
        <FlexWithAlign $column>
          <div className='paymentsHeader'>
            <Text>Статус оплаты</Text>{' '}
            <p>
              <span>Итого:</span>{' '}
              <input
                value={isPays}
                type={'number'}
                onChange={(e) => setIsPays(e.target.value)}
              />
              ₽
            </p>
          </div>
          <div className='paymentType'>
            {isShow && (
              <div className='common'>
                <div className='content'>
                  <FlexWithAlign
                    $column
                    $gap='20px'
                  >
                    <PageTitle>{item.paymentComplete === 'yes' ? 'Отменить оплату' : 'Подтвердить оплату'}</PageTitle>
                    <p>
                      {item.paymentComplete === 'yes'
                        ? 'Нажимая на "подтвердить" вы соглашаетесь с тем, что оплата не прошла, и ее нужно отменить'
                        : 'Нажимая на "подтвердить" вы соглашаетесь с тем, что данная оплата прошла успешно'}
                    </p>
                  </FlexWithAlign>
                  <FlexWithAlign>
                    <CommonButton
                      typeBtn='ghost'
                      onClick={() => setIsShow(false)}
                    >
                      Отменить
                    </CommonButton>
                    <CommonButton
                      typeBtn='primary'
                      onClick={() => confirmPayment(item.idclient)}
                    >
                      {item.paymentComplete === 'yes' ? 'Подтвердить' : 'Подтвердить'}
                    </CommonButton>
                  </FlexWithAlign>
                </div>
              </div>
            )}
            <div>
              {item?.paymenttype ? (
                <CommonButton
                  typeBtn='primary'
                  onClick={() => setIsShow((prev) => !prev)}
                >
                  {item?.paymenttype}
                </CommonButton>
              ) : null}
              <CommonDropdown
                currentValue={item?.paymenttype}
                options={payments}
                placeholder={'Укажите способ оплаты'}
                onChange={(selected) => handlePaymentTypeChange(item?.idclient, selected)}
              />
            </div>
          </div>
        </FlexWithAlign>
      </div>
    </ConfirmationModalWrapper>
  );
});

export default inject(
  'paymentsStore',
  'clientsStore',
  'classificatorsStore',
  'recordingStore',
  'cabinetsStore',
  'userStore',
  'subproductsStore',
  'lessonsStore'
)(ConfirmationPayment);
