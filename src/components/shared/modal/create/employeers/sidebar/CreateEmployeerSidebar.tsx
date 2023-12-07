import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import FilialStore, { IFilial } from '../../../../../../store/filialStore';
import UserStore from '../../../../../../store/userStore';
import { apiPost, apiPut } from '../../../../../../utils/apiInstance';
import { FormStyle, PageTitle } from '../../../../../../utils/styleUtils';
import { validationEmployeeSchema } from '../../../../../../utils/validation-input';
import { ReactComponent as PlusIcon } from '../../../../../icons/plus.svg';
import CommonButton from '../../../../button/CommonButton';
import CommonDropdown from '../../../../dropdawn/CommonDropdown';
import CommonInput from '../../../../fields/CommonInput';
import CommonInputPhone from '../../../../fields/common-input-phone/CommonInputPhone';
import { Box, ButtonInner, FormItem, Wrapper } from './CreateEmployeerSidebar.styled';

interface IProps {
  userStore?: UserStore;
  filialStore?: FilialStore;
  closeSidebar?: () => void;
  edit?: boolean;
  sidebarPayload?: any;
}

const CreateEmployeerSidebar: FC<IProps> = observer((props) => {
  const { closeSidebar, edit, sidebarPayload, filialStore, userStore } = props;
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
    initialValues: sidebarPayload
      ? {
          email: sidebarPayload.Email,
          fio: sidebarPayload.fio,
          role: sidebarPayload.role,
          id: sidebarPayload.id,
          idfilial: sidebarPayload.idfilial,
          phone: sidebarPayload.phone,
          position: sidebarPayload.position
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
      closeSidebar!();
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
      closeSidebar?.();
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
      <PageTitle>{!edit ? 'Новый сотрудник' : sidebarPayload.fio}</PageTitle>

      <FormStyle onSubmit={handleSubmit}>
        <Box className='form'>
          <FormItem className='fio'>
            <CommonInput
              label={'ФИО сотрудника'}
              value={formik.values.fio}
              onChange={formik.handleChange}
              name='fio'
              onBlur={formik.handleBlur}
              error={formik.touched.fio && formik.errors.fio}
              formik={formik}
            ></CommonInput>
          </FormItem>
          <FormItem>
            <CommonInputPhone
              label={'Телефон'}
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange('phone')}
              type={'tel'}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && formik.errors.phone}
              formik={formik}
            />
          </FormItem>
          <FormItem>
            <CommonInput
              label={'Должность'}
              name='position'
              value={formik.values.position}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.position && formik.errors.position}
              formik={formik}
            ></CommonInput>
          </FormItem>
          <FormItem className='filial'>
            <CommonDropdown
              onChange={(option: any) => {
                formik.setFieldValue('idfilial', option.value);
              }}
              options={transformedFilials}
              currentValue={formik.values.idfilial}
              placeholder={'Филиал'}
            />
          </FormItem>
          <FormItem>
            <CommonInput
              label={'Email'}
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              type={'email'}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              formik={formik}
            ></CommonInput>
          </FormItem>
          <FormItem>
            <CommonButton
              type='button'
              disabled
            >
              Пригласить
            </CommonButton>
          </FormItem>
          <FormItem>
            <CommonInput
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
          </FormItem>
          <CommonButton
            colored={true}
            typeBtn='success'
            type='submit'
            fullWidth
            disabled={!formik.isValid || formik.values.fio === '' || formik.values.email === ''}
          >
            <ButtonInner>
              <PlusIcon />
              <span>{edit ? 'Сохранить' : 'Создать сотрудника'}</span>
            </ButtonInner>
          </CommonButton>
        </Box>
      </FormStyle>
    </Wrapper>
  );
});

export default inject('userStore', 'filialStore')(CreateEmployeerSidebar);
