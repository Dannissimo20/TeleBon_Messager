import React, { FC, useEffect } from 'react';

import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

import EmployeeField from './fields/EmployeeField';
import NameInput from './fields/NameField';
import PhoneField from './fields/PhoneField';
import DateElement from './fields/RecordingTime';
import { ModalGrid } from './form-start/FirstForm.styled';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import CommonDropdown from '../../../../components/shared/dropdawn/CommonDropdown';
import CommonInput from '../../../../components/shared/fields/CommonInput';
import CabinetsStore from '../../../../store/cabinetsStore';
import ClassificatorsStore from '../../../../store/classificatorsStore';
import ClientsStore, { IClient } from '../../../../store/clientsStore';
import PaymentsStore from '../../../../store/paymentsStore';
import ProductsStore from '../../../../store/productsStore';
import RecordingStore from '../../../../store/recordingStore';
import SubproductsStore from '../../../../store/subProductsStore';
import { FlexContainer, Text } from '../../../../utils/styleUtils';
import { renameNameToTitle } from '../helpers/helperFunctions';

import FilialStore from '../../../../store/filialStore';
import ConfirmationPayment from './confirmation-payment/ConfirmationPayment';
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
}

const SingleForm: FC<IProps> = observer((props) => {
  const { clientsStore, filialStore, formik, recordingStore, cabinetsStore, productsStore, subproductsStore } = props;
  const { subproducts } = subproductsStore!;
  const { products } = productsStore!;
  const { cabinets } = cabinetsStore!;
  const { clients } = clientsStore!;
  const renamedResources = renameNameToTitle(cabinets);

  useEffect(() => {
    const existingClient = clients.find((client: IClient) => client.phone === formik.values.phone && client.name === formik.values.name);

    if (existingClient) {
      const updatedInputArray = [
        {
          idclient: existingClient.id,
          confirmation: formik.values.clientId?.[0]?.confirmation || 1,
          paymentComplete: formik.values.clientId?.[0]?.paymentComplete || 'no',
          paymenttype: formik.values.clientId?.[0]?.paymenttype || '',
          pays: 0
        }
      ];
      formik.setFieldValue('clientId', updatedInputArray);
    }
  }, [clients, formik.values.phone, formik.values.name, formik.values.clientId?.length]);

  return (
    <div className='singleRecorging'>
      <ModalGrid className='heading'>
        <FlexContainer className='title'>
          <h2>{recordingStore?.isId ? 'Редактировать запись' : 'Создать новую запись'}</h2>
          <button
            onClick={() => recordingStore?.handleCloseButtonClick()}
            className='closeButton'
          >
            <IconInstance name={EIcon.plus} />
          </button>
        </FlexContainer>
      </ModalGrid>
      <FlexContainer className='stageWrapper'>
        <div className={classnames((formik.values.stage === 1 || formik.values.stage === 2) && 'active')}>
          <IconInstance name={EIcon.searchmodal} />
          <h3>Новая</h3>
        </div>
        <div className={classnames(formik.values.stage === 3 && 'active')}>
          <IconInstance name={EIcon.succesoutline} />
          <h3>Подтверждена</h3>
        </div>
        <div className={classnames(formik.values.stage === 4 && 'active')}>
          <IconInstance name={EIcon.plusoutline} />
          <h3>Закрыта</h3>
        </div>
      </FlexContainer>
      {recordingStore?.chatsubsingle === 0 ? (
        <>
          <Text>Клиент</Text>
          <FlexContainer
            $column
            $gap='20px'
            className='modalClientInfo'
          >
            <NameInput formik={formik} />
            <PhoneField formik={formik} />
          </FlexContainer>
          <Text>Услуга</Text>
          <FlexContainer
            $column
            $gap='20px'
          >
            <FlexContainer className='formElement dropdawn'>
              <CommonDropdown
                className='selectedService'
                currentValue={formik.values.subproductId}
                options={subproducts.filter((item) => item.group === 'no')}
                onChange={(option: any) => {
                  formik.setFieldValue('subproductId', option.value);
                }}
                placeholder='Введите название или выберите из списка'
              />
            </FlexContainer>
            <DateElement />
            <ModalGrid>
              <EmployeeField formik={formik} />
              <CommonDropdown
                currentValue={formik.values.resourceId}
                options={renamedResources}
                labelTitle='label'
                valueTitle='value'
                onChange={(option: any) => {
                  formik.setFieldValue('resourceId', option.value);
                }}
                placeholder='Выберете кабинет'
              />
            </ModalGrid>
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
      ) : (
        <ConfirmationPayment
          className='confirmationSingle'
          formik={formik}
          item={formik.values.clientId?.[0]}
        />
      )}
    </div>
  );
});

export default inject(
  'recordingStore',
  'classificatorsStore',
  'lessonsStore',
  'clientsStore',
  'filialStore',
  'paymentsStore',
  'subproductsStore',
  'productsStore',
  'cabinetsStore'
)(SingleForm);
