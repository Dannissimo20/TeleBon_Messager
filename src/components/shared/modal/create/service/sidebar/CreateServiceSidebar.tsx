import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import { EIcon, IconNew as IconInstance } from '../../../../../icons/medium-new-icons/icon';
import ProductsStore, { IProduct } from '../../../../../../store/productsStore';
import SubproductsStore from '../../../../../../store/subProductsStore';
import { validationServiceWithGroupSchema } from '../../../../../../utils/validation-input';
import { apiPost, apiPut } from '../../../../../../utils/apiInstance';
import { ButtonInner, FormItem, InputGroup, Wrapper } from './CreateServiceSidebar.styled';
import { FormStyle, PageTitle } from '../../../../../../utils/styleUtils';
import CommonInput from '../../../../fields/CommonInput';
import CommonButton from '../../../../button/CommonButton';

interface IProps {
  productsStore?: ProductsStore;
  subproductsStore?: SubproductsStore;
  closeSidebar?: () => void;
  edit?: boolean;
  sidebarPayload?: any;
}

const CreateServiceSidebar: FC<IProps> = observer((props) => {
  const { closeSidebar, edit, sidebarPayload, productsStore, subproductsStore } = props;
  const { subproductsAll: services } = subproductsStore!;
  const { products } = productsStore!;
  const { serviceCategoryId, service } = sidebarPayload;
  const serviceObj = services.find((item) => item.productId === serviceCategoryId);

  const currentServiceCategory = products.find((item) => item.id === serviceCategoryId);
  const { productId, data: servicesList } = serviceObj || {
    productId: '0',
    data: []
  };
  const [pending, setPending] = useState(false);

  const getProductIds = (arr: IProduct[]) => {
    const arrId: string[] = [];
    if (arr.length > 0) {
      arr.forEach((item) => arrId.push(item.id));
    }

    return arrId;
  };
  const getSubproductsAll = (arr: IProduct[]) => {
    const ids = getProductIds(arr);
    subproductsStore?.fetchSubproductsAll(ids);
  };

  const initialValues = {
    name: '',
    comment: '',
    duration: '',
    tarif: '',
    category: currentServiceCategory?.name,
    group: 'no',
    seatsmin: 1,
    seatsmax: 5
  };
  const formik = useFormik({
    initialValues: service
      ? {
          ...service,
          category: currentServiceCategory?.name
        }
      : initialValues,
    onSubmit: () => {},
    validateOnMount: true,
    validationSchema: validationServiceWithGroupSchema
  });
  useEffect(() => {
    if (formik.values.group === 'no') {
      const { seatsmin, seatsmax, ...newValues } = formik.values;
      formik.setValues({ ...formik.values, seatsmin: 1, seatsmax: 5 });
    } else {
      formik.setValues({ ...formik.values });
    }
  }, [formik.values.group]);
  const addService = async (values: any) => {
    setPending(true);
    const res = await apiPut(`/subproduct/${serviceCategoryId}`, {
      ...values,
      duration: String(values.duration),
      tarif: String(values.tarif)
    });
    if (res?.status === 200) {
      setPending(false);
      getSubproductsAll(products);
      closeSidebar?.();
      toast.success('Услуга успешно добавлена');
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };
  const editService = async (values: any) => {
    setPending(true);
    const res = await apiPost(`/subproduct/${serviceCategoryId}/${values.id}`, {
      ...values,
      duration: String(values.duration),
      tarif: String(values.tarif)
    });
    if (res?.status === 200) {
      setPending(false);
      getSubproductsAll(products);
      closeSidebar?.();
      toast.success('Услуга успешно обновлена');
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (edit) {
      editService(formik.values);
    } else {
      addService(formik.values);
    }
  };

  return (
    <Wrapper>
      <PageTitle>{!edit ? 'Добавление услуги' : service.name}</PageTitle>

      <FormStyle
        className='form'
        onSubmit={handleSubmit}
      >
        <FormItem>
          <CommonInput
            label={'Название услуги'}
            value={formik.values.name}
            onChange={formik.handleChange}
            name='name'
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            formik={formik}
            simple
          >
            <IconInstance name={EIcon.smalledit} />
          </CommonInput>
        </FormItem>
        <FormItem>
          <CommonInput
            label={'Категория услуги'}
            name='category'
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            formik={formik}
            simple
            disabled
          >
            <IconInstance name={EIcon.arrowleft} />
          </CommonInput>
        </FormItem>
        <FormItem className='service-type'>
          <span>Тип услуги:</span>
          <InputGroup
            role='group'
            aria-labelledby='my-radio-group'
          >
            <label>
              <input
                onBlur={formik.handleBlur}
                value={'no'}
                onChange={formik.handleChange}
                name='group'
                type='radio'
                defaultChecked={formik.values.group === 'no'}
              />
              <span className='input-check-wrap'>
                <IconInstance name={EIcon.telegram} />
              </span>
              <span>Индивидуальная</span>
            </label>
            <label>
              <input
                onBlur={formik.handleBlur}
                value={'yes'}
                onChange={formik.handleChange}
                name='group'
                type='radio'
                defaultChecked={formik.values.group === 'yes'}
              />
              <span className='input-check-wrap'>
                <IconInstance name={EIcon.telegram} />
              </span>
              <span>Групповая</span>
            </label>
          </InputGroup>
        </FormItem>
        {formik.values.group === 'yes' && (
          <FormItem className='service-seats-count'>
            <div className='service-seats-count-label'>Количество мест</div>
            <div className='service-seats-count-wrap'>
              <CommonInput
                label={'min'}
                value={formik.values.seatsmin}
                name='seatsmin'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.seatsmin && formik.errors.seatsmin}
                type='number'
                min='1'
              />
              <CommonInput
                label={'max'}
                value={formik.values.seatsmax}
                name='seatsmax'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.seatsmax && formik.errors.seatsmax}
                type='number'
                min='2'
              />
            </div>
          </FormItem>
        )}

        <FormItem>
          <CommonInput
            label={'Цена услуги'}
            name='tarif'
            type='number'
            value={formik.values.tarif}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.tarif && formik.errors.tarif}
            formik={formik}
            simple
          >
            <IconInstance name={EIcon.arrowleft} />
          </CommonInput>
        </FormItem>
        <FormItem>
          <CommonInput
            label={'Длительность услуги'}
            name='duration'
            min='0'
            max='99'
            type='number'
            value={formik.values.duration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.duration && formik.errors.duration}
            formik={formik}
            simple
          >
            <IconInstance name={EIcon.clock} />
          </CommonInput>
        </FormItem>
        <CommonButton
          colored={true}
          color={'success'}
          type='submit'
          disabled={!formik.isValid}
        >
          <ButtonInner>
            <IconInstance name={EIcon.plus} />
            <span>{edit ? 'Сохранить услугу' : 'Добавить услугу'}</span>
          </ButtonInner>
        </CommonButton>
      </FormStyle>
    </Wrapper>
  );
});

export default inject('productsStore', 'subproductsStore')(CreateServiceSidebar);
