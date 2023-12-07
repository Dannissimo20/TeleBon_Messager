import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';

import CommonButton from '../../../button/CommonButton';
import CommonInput from '../../../fields/CommonInput';
import CommonInputPhone from '../../../fields/common-input-phone/CommonInputPhone';

import { apiPost, apiPut } from '../../../../../utils/apiInstance';
import { FlexWithAlign, FormStyle, PageTitle, Text } from '../../../../../utils/styleUtils';
import { validationEmployeeSchema } from '../../../../../utils/validation-input';
import { Box, ButtonInner, Wrapper } from './CreateEmployeersModal.styled';
import FilialStore, { IFilial } from '../../../../../store/filialStore';
import UserStore from '../../../../../store/userStore';
import CommonDropdown from '../../../dropdawn/CommonDropdown';
import { ModalGrid } from '../../../../../pages/private/product/modal-elements/form-start/FirstForm.styled';

interface IProps {
  userStore?: UserStore;
  filialStore?: FilialStore;
  closeModal?: () => void;
  edit?: boolean;
  modalPayload?: any;
}

const CreateEmployeersModal: FC<IProps> = observer((props) => {
  const { closeModal, edit, modalPayload, filialStore, userStore } = props;
  const { user } = userStore!;
  const { filials } = filialStore!;
  const [pending, setPending] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const transformedFilials = filials.map(({ id, name }: IFilial) => ({
    value: id,
    label: name
  }));

  const initialValues = {
    email: '',
    fio: '',
    role: '',
    id: '',
    idfilial: '',
    phone: '',
    position: ''
  };

  const formik = useFormik({
    initialValues: modalPayload
      ? {
          email: modalPayload.Email,
          fio: modalPayload.fio,
          role: modalPayload.role,
          id: modalPayload.id,
          idfilial: modalPayload.idfilial,
          phone: modalPayload.phone,
          position: modalPayload.position
        }
      : initialValues,
    onSubmit: (values: any) => {},
    validationSchema: validationEmployeeSchema
  });

  useEffect(() => {
    if (formik.values.fio && formik.values.email && formik.values.phone && formik.values.idfilial) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formik.values]);
  const createEmployee = async (values: any) => {
    const idfather = user.filter((item) => item?.role === 'admin')[0].id;
    setPending(true);
    const res = await apiPut('/user', { ...values, idfather: idfather });
    if (res?.status === 200) {
      setPending(false);
      closeModal!();
      if (userStore) {
        await userStore.fetchUsers();
      }
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };

  const editEmployee = async (values: any) => {
    setPending(true);
    const res = await apiPost(`/user/${values.id}`, values);
    if (res?.status === 200) {
      setPending(false);
      closeModal?.();
      if (userStore) {
        await userStore.fetchUsers();
      }
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (edit) {
      editEmployee(formik.values);
    } else {
      createEmployee(formik.values);
    }
  };

  return (
    <Wrapper>
      <PageTitle>{!edit ? 'Новый сотрудник' : 'Редактировать данные сотрудника'}</PageTitle>
      <Text>Информация о сотруднике</Text>
      <FormStyle onSubmit={handleSubmit}>
        <Box className='form'>
          <CommonInput
            simple
            label={'ФИО сотрудника'}
            value={formik.values.fio}
            onChange={formik.handleChange}
            name='fio'
            onBlur={formik.handleBlur}
            error={formik.touched.fio && formik.errors.fio}
            formik={formik}
          >
            <IconInstance name={EIcon.user} />
          </CommonInput>

          <ModalGrid>
            <CommonInputPhone
              simple
              label={'Телефон'}
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange('phone')}
              type={'tel'}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && formik.errors.phone}
              formik={formik}
            >
              <IconInstance name={EIcon.phone} />
            </CommonInputPhone>

            <CommonInput
              simple
              label={'Должность'}
              name='position'
              value={formik.values.position}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.position && formik.errors.position}
              formik={formik}
            >
              <IconInstance name={EIcon.filial} />
            </CommonInput>
          </ModalGrid>

          <ModalGrid>
            <CommonDropdown
              onChange={(option: any) => {
                formik.setFieldValue('idfilial', option.value);
              }}
              options={transformedFilials}
              currentValue={formik.values.idfilial}
              placeholder={'Филиал'}
            />
            <CommonInput
              simple
              label={'Роль в системе'}
              name='role'
              value={formik.values.role}
              onChange={formik.handleChange}
              type={'text'}
              onBlur={formik.handleBlur}
              error={formik.touched.role && formik.errors.role}
              formik={formik}
              disabled
            ></CommonInput>
          </ModalGrid>

          <ModalGrid>
            <CommonInput
              simple
              label={'Email'}
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              type={'email'}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              formik={formik}
            >
              <IconInstance name={EIcon.post} />
            </CommonInput>

            <div className='inviteEmployeer'>
              <CommonButton
                type='button'
                typeBtn='ghost'
                disabled
                gap='16px'
              >
                Пригласить в систему
                <IconInstance name={EIcon.arrowrightwithsquare} />
              </CommonButton>
            </div>
          </ModalGrid>

          <FlexWithAlign
            $alignCenter='center'
            $justify='end'
          >
            <CommonButton typeBtn='ghost'>Отменить</CommonButton>
            <CommonButton
              colored={true}
              typeBtn='primary'
              type='submit'
              disabled={!formik.isValid || formik.values.fio === '' || formik.values.email === ''}
            >
              <ButtonInner>
                <span>{edit ? 'Сохранить' : 'Добавить'}</span>
              </ButtonInner>
            </CommonButton>
          </FlexWithAlign>
        </Box>
      </FormStyle>
    </Wrapper>
  );
});

export default inject('userStore', 'filialStore')(CreateEmployeersModal);
