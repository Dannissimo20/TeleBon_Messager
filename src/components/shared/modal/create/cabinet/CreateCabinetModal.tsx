import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';

import CommonButton from '../../../button/CommonButton';
import CommonInput from '../../../fields/CommonInput';

import CabinetsStore from '../../../../../store/cabinetsStore';
import { apiPost, apiPut } from '../../../../../utils/apiInstance';
import { FlexWithAlign, Text } from '../../../../../utils/styleUtils';
import { Form, Title, Wrapper } from './CreateCabinetModal.styled';
import { ModalGrid } from '../../../../../pages/private/product/modal-elements/form-start/FirstForm.styled';
import FilialStore from '../../../../../store/filialStore';

interface IProps {
  closeModal?: () => void;
  modalPayload?: any;
  cabinetsStore?: CabinetsStore;
  filialStore?: FilialStore;
  edit?: any;
}
const CreateCabinetModal: React.FC<IProps> = observer(({ filialStore, edit, modalPayload, closeModal, cabinetsStore }) => {
  const [pending, setPending] = useState(false);
  const { filials, activeFilial } = filialStore!;
  const initialValues = {
    filial: activeFilial?.id,
    id: '',
    name: '',
    seatsLimited: 0,
    workHoursEnd: '',
    workHoursStart: ''
  };
  const formik = useFormik({
    initialValues: modalPayload ? modalPayload : initialValues,
    onSubmit: (values: any) => {}
  });
  const createCabinet = async (values: {
    name: string;

    seatsLimited: number;
    workHoursEnd: string;
    workHoursStart: string;
  }) => {
    // setPending(true);
    const res = await apiPut(`/cabinet/${activeFilial?.id}`, {
      ...values,
      scheduleId: ''
    });

    if (res?.status === 200) {
      setPending(false);
      closeModal!();
      activeFilial && cabinetsStore!.fetch(activeFilial?.id);
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };

  const editCabinet = async (values: any) => {
    const res = await apiPost(`/cabinet/${activeFilial?.id}/${activeFilial?.id}`, {
      ...values,
      filial: activeFilial?.id
    });

    if (res?.status === 200) {
      activeFilial && cabinetsStore!.fetch(activeFilial?.id);
      toast.success('Кабинет успешно обновлен');
    } else {
      toast.error(res.data.description);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    createCabinet(formik.values);
  };

  return (
    <Wrapper>
      <Title>Новый кабинет</Title>
      <Form onSubmit={handleSubmit}>
        <Text>Информация о кабинете</Text>
        <ModalGrid>
          <CommonInput
            label={'Название'}
            value={formik.values.name}
            onChange={formik.handleChange}
            name='name'
            type='text'
            autoComplete='off'
            simple
          />
          <FlexWithAlign $alignCenter='center'>
            <CommonInput
              label={'Вместимость'}
              value={formik.values.seatsLimited}
              onChange={formik.handleChange}
              name='seatsLimited'
              min={0}
              max={99}
              onBlur={formik.handleBlur}
              type='number'
              autoComplete='off'
              simple
            />
            <FlexWithAlign
              $alignCenter='center'
              className='btnWrapper'
            >
              <CommonButton
                typeBtn='ghost'
                onClick={(e: any) => {
                  e.preventDefault();
                  formik.values.seatsLimited >= 0 && formik.setFieldValue('seatsLimited', formik.values.seatsLimited - 1);
                }}
              >
                <IconInstance name={EIcon.minus} />
              </CommonButton>
              <CommonButton
                typeBtn='ghost'
                type='submit'
                onClick={(e: any) => {
                  e.preventDefault();
                  formik.setFieldValue('seatsLimited', formik.values.seatsLimited + 1);
                }}
              >
                <IconInstance name={EIcon.plus} />
              </CommonButton>
            </FlexWithAlign>
          </FlexWithAlign>
        </ModalGrid>
        <Text>Рабочее время</Text>
        <ModalGrid>
          <CommonInput
            label={'Начало'}
            value={formik.values.workHoursStart}
            onChange={formik.handleChange}
            name='workHoursStart'
            onBlur={formik.handleBlur}
            type='time'
            autoComplete='off'
            simple
          />
          <CommonInput
            label={'Окончание'}
            value={formik.values.workHoursEnd}
            onChange={formik.handleChange}
            name='workHoursEnd'
            onBlur={formik.handleBlur}
            type='time'
            autoComplete='off'
            simple
          />
        </ModalGrid>

        <FlexWithAlign $alignCenter='center' $justify='end'>
          <CommonButton
            onClick={(e: any) => {
              e.preventDefault();
              closeModal!();
            }}
            typeBtn='ghost'
          >
            Отменить
          </CommonButton>
          <CommonButton
            colored={true}
            typeBtn='primary'
            type='submit'
            disabled={pending}
          >
            <span>Добавить</span>
          </CommonButton>
        </FlexWithAlign>
      </Form>
    </Wrapper>
  );
});

export default inject('cabinetsStore', 'filialStore')(CreateCabinetModal);
