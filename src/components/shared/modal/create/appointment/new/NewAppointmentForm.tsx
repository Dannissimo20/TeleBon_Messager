import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import { find, path, pipe, propEq } from 'rambda';

import { Box, Footer, Form, Main, ProductName, Wrapper } from './NewAppointmentForm.styled';

import OneMoreTimeTable from '../../../../../../pages/private/product/OneMoreTimeTable';
import AppointmentStore from '../../../../../../store/appointmentStore';
import CabinetsStore, { ICabinet } from '../../../../../../store/cabinetsStore';
import ClientsStore from '../../../../../../store/clientsStore';
import FilialStore, { IFilial } from '../../../../../../store/filialStore';
import LessonsStore from '../../../../../../store/lessonsStore';
import ModalStore from '../../../../../../store/modalStore';
import ProductsStore from '../../../../../../store/productsStore';
import clientTypes from '../../../../../../utils/clientTypes';
import { PENDING } from '../../../../../../utils/state';
import { EIcons, Icon, PlanningIcon } from '../../../../../icons';
import { ReactComponent as IconFlag } from '../../../../../icons/flag.svg';
import { ReactComponent as PenIcon } from '../../../../../icons/pen.svg';
import { ReactComponent as IconPie } from '../../../../../icons/pie.svg';
import { ReactComponent as PlusIcon } from '../../../../../icons/plus.svg';
import CommonButton from '../../../../button/CommonButton';
import CommonDropdown from '../../../../dropdawn/CommonDropdown';
import AutocompleteInput from '../../../../fields/autocomplete-input/AutocompleteInput';
import CommonInputPhone from '../../../../fields/common-input-phone/CommonInputPhone';
import CommonInput from '../../../../fields/CommonInput';

const productName = (productId: any, arr: any) => pipe(find(propEq(productId, 'id')), path(['name']))(arr);

interface IProps {
  appointmentStore?: AppointmentStore;
  filialStore?: FilialStore;
  cabinetsStore?: CabinetsStore;
  productsStore?: ProductsStore;
  clientsStore?: ClientsStore;
  modalStore?: ModalStore;
  lessonsStore?: LessonsStore;
  payload?: any;
}

const NewAppointmentForm: React.FC<IProps> = observer(
  ({ appointmentStore, cabinetsStore, filialStore, productsStore, clientsStore, modalStore, payload, lessonsStore }) => {
    const { newAppointment, createAppointment, state } = appointmentStore!;
    const { t } = useTranslation();
    const { cabinets } = cabinetsStore!;
    const { filials } = filialStore!;
    const { products } = productsStore!;
    const { fetchClients, clients } = clientsStore!;
    const productTitle: any = productName(payload.productId, products);
    // const subProductTitle: any = productName(payload.productId, products);
    const cabinetTitle: any = productName(payload.cabinetId, cabinets);
    const transformedCabinets = cabinets.map(({ id, name }: ICabinet) => ({
      value: id,
      label: name
    }));
    const transformedFilials = filials.map(({ id, name }: IFilial) => ({
      value: id,
      label: name
    }));
    const formik = useFormik({
      initialValues: {
        ...newAppointment,
        ...payload
      },
      onSubmit: (values: any) => {}
    });

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const res = await createAppointment({
        ...formik.values,
        time: `${formik.values.time}:00`
      });
      if (res) {
        modalStore!.closeModal();
        lessonsStore!.fetchScheduleByDay(payload.date, payload.productId);
      }
    };

    const openModalClient = () => {
      modalStore!.openModal({
        name: 'CREATE_CLIENT',
        payload: {
          afterClose: () =>
            modalStore!.openModal({
              name: 'APPOINTMENT_MODAL',
              payload
            })
        }
      });
    };

    const chooseClient = (client: any) => {
      formik.setFieldValue('phone', client.phone);
      formik.setFieldValue('clientId', client.id);
    };

    useEffect(() => {
      fetchClients();
    }, []);

    return (
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Main>
            <AutocompleteInput
              label={t('ФИО')}
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onChoose={chooseClient}
              filterBy={'name'}
              list={clients}
              openClientModal={openModalClient}
              simple
            >
              <Icon name={EIcons.clientIcon} />
            </AutocompleteInput>
            {/* <CommonInput
              label={"Телефон"}
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              simple
            />*/}
            <CommonInputPhone
              type={'tel'}
              label={t('Телефон')}
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange('phone')}
              onBlur={formik.handleBlur}
              simple
            >
              <IconFlag />
            </CommonInputPhone>
            <CommonInput
              label={t('Время')}
              name='time'
              value={formik.values.time}
              onChange={formik.handleChange}
              simple
              disabled
            >
              <PlanningIcon />
            </CommonInput>
            <CommonDropdown
              onChange={(option: any) => {
                formik.setFieldValue('cabinetId', option.value);
              }}
              options={transformedCabinets}
              currentValue={formik.values.cabinetId}
              placeholder={t('Кабинет')}
              disabled
            />
            <CommonDropdown
              onChange={(option: any) => {
                formik.setFieldValue('clientType', option.value);
              }}
              options={clientTypes}
              currentValue={formik.values.clientType}
              placeholder={t('Тип клиента')}
            />
            <CommonDropdown
              onChange={(option: any) => {
                formik.setFieldValue('clientType', option.value);
              }}
              options={clientTypes}
              currentValue={formik.values.clientType}
              placeholder={t('Источник')}
            />
            <CommonDropdown
              onChange={(option: any) => {
                formik.setFieldValue('filialId', option.value);
              }}
              options={transformedFilials}
              currentValue={formik.values.filialId}
              placeholder={t('Филиал')}
              disabled
            />
            <CommonDropdown
              onChange={(option: any) => {
                formik.setFieldValue('clientType', option.value);
              }}
              options={clientTypes}
              currentValue={formik.values.clientType}
              placeholder={t('Форма оплаты')}
            />
            <CommonInput
              label={t('Комментарий')}
              name='comments'
              value={formik.values.comments}
              onChange={formik.handleChange}
              simple
            >
              <PenIcon />
            </CommonInput>
          </Main>
          <Box>
            <ProductName>
              <IconPie />
              <span>{productTitle || ''}</span>
            </ProductName>
          </Box>
          <OneMoreTimeTable
            date={'21.01.1990'}
            product={productTitle}
            client={formik.values.name}
            cabinet={cabinetTitle}
            duration={`1 ${t('час')}`}
            price={''}
          />

          <Footer>
            <CommonButton
              colored={true}
              typeBtn='success'
              disabled={state === PENDING}
            >
              <PlusIcon />
              <span>{t('Сохранить')}</span>
            </CommonButton>
          </Footer>
        </Form>
      </Wrapper>
    );
  }
);

export default inject(
  'appointmentStore',
  'filialStore',
  'cabinetsStore',
  'productsStore',
  'clientsStore',
  'modalStore',
  'lessonsStore'
)(NewAppointmentForm);
