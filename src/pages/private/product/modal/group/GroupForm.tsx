import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

import ConfirmationPayment from '../../modal-elements/confirmation-payment/ConfirmationPayment';
import EmployeeField from '../fields/EmployeeField';
import NameInput from '../fields/NameField';
import PhoneField from '../fields/PhoneField';
import DateElement from '../fields/RecordingTime';
import { ModalGrid } from '../start/FirstForm.styled';

import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../../components/shared/button/CommonButton';
import CommonDropdown from '../../../../../components/shared/dropdawn/CommonDropdown';
import CommonInput from '../../../../../components/shared/fields/CommonInput';
import CabinetsStore from '../../../../../store/cabinetsStore';
import ClassificatorsStore from '../../../../../store/classificatorsStore';
import ClientsStore, { IClient } from '../../../../../store/clientsStore';
import FilialStore from '../../../../../store/filialStore';
import PaymentsStore from '../../../../../store/paymentsStore';
import ProductsStore from '../../../../../store/productsStore';
import RecordingStore from '../../../../../store/recordingStore';
import SubproductsStore from '../../../../../store/subProductsStore';
import { apiPost, apiPut } from '../../../../../utils/apiInstance';
import { FlexContainer, Text } from '../../../../../utils/styleUtils';
import { renameNameToTitle } from '../../helpers/helperFunctions';
import { Calculate, Table } from '../../styles/form-styles';
import LessonsStore from '../../../../../store/lessonsStore';
import { useTranslation } from 'react-i18next';

interface IProps {
  recordingStore?: RecordingStore;
  subproductsStore?: SubproductsStore;
  productsStore?: ProductsStore;
  cabinetsStore?: CabinetsStore;
  clientsStore?: ClientsStore;
  classificatorsStore?: ClassificatorsStore;
  paymentsStore?: PaymentsStore;
  filialStore?: FilialStore;
  formik: any;
  lessonsStore?: LessonsStore;
}

const GroupForm: FC<IProps> = observer((props) => {
  const {
    recordingStore,
    filialStore,
    formik,
    lessonsStore,
    paymentsStore,
    classificatorsStore,
    cabinetsStore,
    productsStore,
    clientsStore,
    subproductsStore
  } = props;
  const { subproducts } = subproductsStore!;
  const { cabinets } = cabinetsStore!;
  const { clients } = clientsStore!;
  const { fetchPayments } = paymentsStore!;
  const { fetchLessons } = lessonsStore!;
  const { fetchClassificators, classificators } = classificatorsStore!;
  const { t } = useTranslation();
  const existingClient = clients.find((client: IClient) => client.phone === formik.values.phone && client.name === formik.values.name);

  const renamedResources = renameNameToTitle(cabinets);

  const fetchLesssonsInfo = async () => {
    await fetchLessons();
  };

  const fetchClassificatorsInfo = async () => {
    await fetchClassificators();
    await fetchPayments();
  };

  useEffect(() => {
    fetchClassificatorsInfo();
  }, []);

  const [spoilerStates, setSpoilerStates] = useState<any>({});

  const handleClassificator = async () => {
    const classificatorsEvent = {
      name: recordingStore?.isClassificator,
      productid: recordingStore?.isProductId,
      clientid: recordingStore?.inputTitle
    };
    try {
      const response = await apiPut(`/classificator`, classificatorsEvent);
      if (response.status === 200) {
        await fetchClassificators();
        toast.success('Классификатор успешно добавлен');
      } else {
        toast.error('Ошибка при обновлении события');
      }
    } catch (error) {
      toast.error('Ошибка при обновлении события');
    }
  };

  const confirmPayment = async (clientId: string) => {
    try {
      if (clientId) {
        const updatedData = {
          action: 'add',
          clientdata: {
            confirmation: 1,
            idclient: clientId,
            paymentComplete: 'no'
          },
          clientid: clientId,
          lessonsid: recordingStore?.isId
        };
        const response = await apiPost(`/lessons/addupdateclient`, updatedData);
        if (response.status === 200) {
          fetchLesssonsInfo();
          const updatedInputArray = [
            ...formik.values.clientId,
            {
              idclient: clientId,
              confirmation: 1,
              paymentComplete: recordingStore?.isPaymentComplete,
              paymenttype: recordingStore?.isPaymentType,
              pays: 0
            }
          ];
          formik.setFieldValue('clientId', updatedInputArray);
          formik.setFieldValue('name', '');
          formik.setFieldValue('phone', '');
        }

        if (recordingStore?.isClassificator !== '') {
          handleClassificator();
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
              lessonsid: recordingStore?.isId
            };

            const res = await apiPost(`/lessons/addupdateclient`, updatedClientData);
            if (res.status === 200) {
              fetchLesssonsInfo();
              const updatedInputArray = [
                ...formik.values.clientId,
                {
                  idclient: response.data.id,
                  confirmation: 1,
                  paymentComplete: recordingStore?.isPaymentComplete,
                  paymenttype: recordingStore?.isPaymentType,
                  pays: 0
                }
              ];
              await clientsStore?.fetchClients();
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
    } catch (error) {
      toast.error('Ошибка при отправке запроса');
    }
  };

  const filteredSubInSeats = subproducts.find((item) => item.id === formik.values.subproductId);

  const toggleSpoiler = (clientId: string) => {
    setSpoilerStates((prevState: any) => ({
      ...prevState,
      [clientId]: !prevState[clientId]
    }));
  };

  return (
    <div>
      <ModalGrid className='heading'>
        <FlexContainer className='title'>
          <h2>{recordingStore?.isId ? 'Редактировать запись' : 'Создать групповую запись'}</h2>
          <button
            onClick={() => recordingStore?.handleCloseButtonClick()}
            className='closeButton'
          >
            <IconInstance name={EIcon.plus} />
          </button>
        </FlexContainer>
      </ModalGrid>
      <FlexContainer className='stageWrapper'>
        <div className={classnames(formik.values.stage === 1 && 'active')}>
          <IconInstance name={EIcon.searchmodal} />
          <h3>{t('Новая')}</h3>
        </div>
        <div className={classnames(formik.values.stage === 2 && 'active')}>
          <IconInstance name={EIcon.users} />
          <h3>{t('Запись клиентов')}</h3>
        </div>
        <div className={classnames(formik.values.stage === 3 && 'active')}>
          <IconInstance name={EIcon.succesoutline} />
          <h3>{t('Подтверждена')}</h3>
        </div>
        <div className={classnames(formik.values.stage === 4 && 'active')}>
          <IconInstance name={EIcon.plusoutline} />
          <h3>{t('Закрыта')}</h3>
        </div>
      </FlexContainer>

      {recordingStore?.chatsub === 1 && (
        <>
          <Text>{t('Клиент')}</Text>
          <FlexContainer
            $column
            $gap='20px'
          >
            <NameInput formik={formik} />
            <PhoneField formik={formik} />
            <ModalGrid>
              <CommonButton
                className='fullWidthButton'
                typeBtn='primary'
                gap='16px'
                disabled={
                  !formik.isValid ||
                  formik.values.name === '' ||
                  formik.values.phone === '' ||
                  (formik.values.phone !== '' && formik.values.phone.length < 12)
                }
                onClick={() => {
                  existingClient ? confirmPayment(existingClient.id) : confirmPayment('');
                }}
              >
                <p>{t('Записать клиента')}</p>
              </CommonButton>
            </ModalGrid>
          </FlexContainer>

          {formik.values.clientId?.length !== 0 && (
            <>
              <Text>{t('Клиенты')}</Text>
              <Table>
                <div className='header'>
                  <div>
                    <p>{t('ФИО и телефон')}</p>
                  </div>
                  <div>
                    <p>{t('Стстус клиента')}</p>
                  </div>
                  <div>
                    <p>{t('Статус оплаты')}</p>
                  </div>
                </div>
                <div className='content'>
                  {formik.values.clientId?.length ? (
                    formik.values.clientId.map(
                      (item: {
                        idclient: string;
                        paymenttype: string;
                        paymentComplete: string;
                        confirmation: number;
                        comfirmationCopmlete: string;
                      }) => {
                        const filteredmatchingClient = clients.find((client: IClient) => client.id === item?.idclient);
                        const name = filteredmatchingClient && filteredmatchingClient.name;
                        const phone = filteredmatchingClient && filteredmatchingClient.phone;
                        const existingClient = clients.find((client: IClient) => client.phone === phone && client.name === name);

                        return (
                          <div
                            className={classnames(spoilerStates[item.idclient] ? ' gridWrapper active' : 'gridWrapper')}
                            key={item?.idclient}
                          >
                            <div className='gridContent'>
                              <div className='client'>
                                <p>{name}</p>
                                <p>{phone}</p>
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
                              </div>
                              <FlexContainer
                                className='confirmation'
                                $gap='4px'
                              >
                                {item.confirmation === 2 || item.confirmation === 3 || item.confirmation === 4 ? (
                                  <div
                                    className={classnames(
                                      (item.confirmation === 2 || item.confirmation === 3 || item.confirmation === 4) && 'activeY'
                                    )}
                                  >
                                    <IconInstance name={EIcon.succesoutline} />
                                    <p>{t('Подтверждена')}</p>
                                  </div>
                                ) : (
                                  <div className={classnames(item.confirmation === 1 && 'activeN')}>
                                    <IconInstance name={EIcon.clock} />
                                    <p>{t('В ожидании')}</p>
                                  </div>
                                )}
                              </FlexContainer>
                              <FlexContainer
                                className='paymentComplete'
                                $gap='4px'
                              >
                                {item.paymentComplete === 'yes' ? (
                                  <div className={classnames(item.paymentComplete === 'yes' && 'activeY')}>
                                    <p>{t('Оплачена')}</p>
                                  </div>
                                ) : (
                                  <div className={classnames(item.paymentComplete === 'no' && 'activeN')}>{t('Не оплачена')}</div>
                                )}
                              </FlexContainer>
                              <FlexContainer
                                className={classnames(spoilerStates[item.idclient] && 'active', 'manipulation')}
                                $gap='0'
                              >
                                <CommonButton
                                  typeBtn='ghost'
                                  onClick={() => toggleSpoiler(item.idclient)}
                                >
                                  <IconInstance name={EIcon.arrowdown} />
                                </CommonButton>
                              </FlexContainer>
                            </div>
                            {spoilerStates[item.idclient] && (
                              <ConfirmationPayment
                                item={item}
                                formik={formik}
                              />
                            )}
                          </div>
                        );
                      }
                    )
                  ) : (
                    <p>{t('Добавленных клиентов нет')}</p>
                  )}
                </div>
              </Table>
            </>
          )}
        </>
      )}
      {recordingStore?.chatsub === 0 && (
        <>
          <Text>Услуга</Text>
          <FlexContainer
            $column
            $gap='20px'
          >
            <FlexContainer className='formElement dropdawn'>
              <CommonDropdown
                className='selectedService'
                currentValue={formik.values.subproductId}
                onBlur={formik.handleBlur}
                error={formik.touched.subproductId && formik.errors.subproductId}
                options={subproducts.filter((item) => item.group === 'yes')}
                onChange={(option: any) => {
                  formik.setFieldValue('subproductId', option.value);
                }}
                placeholder='Введите название или выберите из списка'
              />
            </FlexContainer>
            <ModalGrid>
              <Calculate>
                <span className='slotContent'>{filteredSubInSeats ? formik.values.seats : 'Вместимость'}</span>
                <FlexContainer>
                  {filteredSubInSeats && (
                    <button
                      className={classnames(formik.values.seats === 0 && 'hidden')}
                      onClick={() => {
                        if (formik.values.seats > filteredSubInSeats?.seatsmin) {
                          formik.setFieldValue('seats', formik.values.seats - 1);
                        }
                      }}
                    >
                      <IconInstance name={EIcon.minus} />
                    </button>
                  )}
                  {filteredSubInSeats && (
                    <button
                      onClick={() => {
                        if (formik.values.seats < filteredSubInSeats?.seatsmax) {
                          formik.setFieldValue('seats', formik.values.seats + 1);
                        }
                      }}
                    >
                      <IconInstance name={EIcon.plus} />
                    </button>
                  )}
                </FlexContainer>
              </Calculate>
              <FlexContainer className='formElement dropdawn'>
                <CommonDropdown
                  currentValue={formik.values.resourceId}
                  options={renamedResources}
                  onBlur={formik.handleBlur}
                  labelTitle='label'
                  valueTitle='value'
                  onChange={(option: any) => {
                    formik.setFieldValue('resourceId', option.value);
                  }}
                  placeholder='Выберете кабинет'
                />
              </FlexContainer>
            </ModalGrid>
            <ModalGrid>
              <EmployeeField formik={formik} />
            </ModalGrid>
            <DateElement />
          </FlexContainer>
          <Text>Комментарий</Text>
          <FlexContainer className='formElement input'>
            <CommonInput
              simple
              name={'comments'}
              label={'При необходимости добавьте комментарий для исполнителя или администратора'}
              value={formik.values.comments}
              onChange={formik.handleChange}
            />
          </FlexContainer>
        </>
      )}
    </div>
  );
});

export default inject(
  'recordingStore',
  'subproductsStore',
  'lessonsStore',
  'filialStore',
  'classificatorsStore',
  'productsStore',
  'cabinetsStore',
  'clientsStore',
  'paymentsStore'
)(GroupForm);
