import { useState } from 'react';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import CommonButton from '../../button/CommonButton';
import CommonInput from '../../fields/CommonInput';

import CabinetsStore from '../../../../store/cabinetsStore';
import { apiPost } from '../../../../utils/apiInstance';
import { FlexWithAlign, Text } from '../../../../utils/styleUtils';

import FilialStore from '../../../../store/filialStore';
import { ModalGrid } from '../../../../pages/private/product/modal-elements/form-start/FirstForm.styled';
import { EIcon, IconNew as IconInstance } from '../../../icons/medium-new-icons/icon';
import { Form, Title } from '../create/cabinet/CreateCabinetModal.styled';

interface IProps {
  closeModal?: () => void;
  modalPayload?: any;
  cabinetsStore?: CabinetsStore;
  filialStore?: FilialStore;
}
const EditCabinetModal: React.FC<IProps> = observer(({ filialStore, modalPayload, closeModal, cabinetsStore }) => {
  const [pending, setPending] = useState(false);
  const { filials, activeFilial } = filialStore!;
  const initialValues = {
    filial: activeFilial?.id,
    name: '',
    seatsLimited: 0,
    workHoursEnd: '',
    workHoursStart: '',
    id: ''
  };
  const formik = useFormik({
    initialValues: modalPayload ? modalPayload : initialValues,
    onSubmit: (values: any) => {}
  });
  const saveCabinet = async (values: { name: string }) => {
    setPending(true);
    const res = await apiPost(`/cabinet/${activeFilial?.id}/${formik.values.id}`, {
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    saveCabinet(formik.values);
  };

  return (
    <div>
      <Title>{modalPayload.name}</Title>
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

        <FlexWithAlign
          $alignCenter='center'
          $justify='end'
        >
          <CommonButton
            onClick={closeModal}
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
            <span>Сохранить</span>
          </CommonButton>
        </FlexWithAlign>
      </Form>
    </div>
  );
});

export default inject('cabinetsStore', 'filialStore')(EditCabinetModal);
