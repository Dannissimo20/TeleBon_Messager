import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import classnames from 'classnames';
import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import { FormItem, Wrapper } from './CreateServiceModal.styled';
import { InputGroup } from './sidebar/CreateServiceSidebar.styled';

import { ModalGrid } from '../../../../../pages/private/product/modal-elements/form-start/FirstForm.styled';
import { Calculate } from '../../../../../pages/private/product/styles/form-styles';
import ProductsStore, { IProduct } from '../../../../../store/productsStore';
import SubproductsStore from '../../../../../store/subProductsStore';
import { apiPost, apiPut } from '../../../../../utils/apiInstance';
import { FlexContainer, FlexWithAlign, FormStyle, PageTitle } from '../../../../../utils/styleUtils';
import { validationServiceWithGroupSchema } from '../../../../../utils/validation-input';
import { EIcon, IconNew as IconInstance } from '../../../../icons/medium-new-icons/icon';
import CommonButton from '../../../button/CommonButton';
import CommonInput from '../../../fields/CommonInput';

interface IProps {
  productsStore?: ProductsStore;
  subproductsStore?: SubproductsStore;
  closeModal?: () => void;
  edit?: boolean;
  modalPayload?: any;
}

const CreateServiceModal: React.FC<IProps> = observer((props) => {
  const { closeModal, edit, modalPayload, productsStore, subproductsStore } = props;
  const { subproductsAll: services } = subproductsStore!;
  const { products } = productsStore!;
  const { serviceCategoryId, service } = modalPayload;
  const serviceObj = services.find((item) => item.productId === serviceCategoryId);

  const currentServiceCategory = products.find((item) => item.id === serviceCategoryId);
  const { t } = useTranslation();
  const { productId, data: servicesList } = serviceObj || {
    productId: '0',
    data: []
  };
  const [pending, setPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    programmservice: 'no',
    lessonnumber: 0,
    group: 'no',
    seatsmin: 2,
    seatsmax: 5
  };
  const formik = useFormik({
    initialValues: service
      ? {
          ...service,
          category: currentServiceCategory?.name,
          lessonnumber: service.lessonnumber || 0
        }
      : initialValues,
    onSubmit: () => {},
    validateOnMount: true,
    validationSchema: validationServiceWithGroupSchema
  });

  useEffect(() => {
    if (formik.values.group === 'no') {
      const { seatsmin, seatsmax, ...newValues } = formik.values;
      formik.setValues({ ...formik.values, seatsmin: 2, seatsmax: 5 });
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
      closeModal?.();
      toast.success(t('Услуга успешно добавлена'));
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
      closeModal?.();
      toast.success(t('Услуга успешно обновлена'));
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
      <PageTitle>{!edit ? t('Добавление услуги') : `${t('Редактирование услуги')} ${service.name}`}</PageTitle>

      <FormStyle
        className='form'
        onSubmit={handleSubmit}
      >
        <ModalGrid>
          <FormItem>
            <CommonInput
              label={t('Название категории услуг')}
              name='category'
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              formik={formik}
              simple
              disabled
            >
              <IconInstance name={EIcon.arrowdown} />
            </CommonInput>
          </FormItem>
          <FormItem>
            <CommonInput
              label={t('Название услуги')}
              value={formik.values.name}
              onChange={formik.handleChange}
              name='name'
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
              formik={formik}
              simple
            ></CommonInput>
          </FormItem>
        </ModalGrid>
        <ModalGrid>
          <FormItem className='service-type'>
            <InputGroup
              role='group'
              aria-labelledby='my-radio-group'
            >
              <ModalGrid className='flex sex-input-wrap'>
                <label>
                  <input
                    onBlur={formik.handleBlur}
                    value={'no'}
                    onChange={formik.handleChange}
                    name='group'
                    type='radio'
                    defaultChecked={formik.values.group === 'no'}
                  />
                  <span>{t('Индивидуальная')}</span>
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
                  <span>{t('Групповая')}</span>
                </label>
              </ModalGrid>
            </InputGroup>
          </FormItem>
        </ModalGrid>
        {formik.values.group === 'yes' && (
          <FlexContainer className='checked'>
            <label className='checkbox-container'>
              <input
                className='custom-checkbox green'
                type='checkbox'
                checked={isOpen}
                onChange={() => {
                  setIsOpen((prev) => !prev);
                  formik.setFieldValue('programmservice', !isOpen ? 'yes' : 'no');
                }}
              />
              <span className='checkmark'></span>
            </label>
            <p>{t('Программная услуга')}</p>
          </FlexContainer>
        )}
        {formik.values.group === 'yes' && (
          <ModalGrid className='hiddenRecordint'>
            <CommonInput
              label={t('Минимальное кол-во человек')}
              value={formik.values.seatsmin}
              name='seatsmin'
              simple
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.seatsmin && formik.errors.seatsmin}
              type='number'
              min='2'
            />
            <CommonInput
              label={t('Максимальное кол-во человек')}
              simple
              value={formik.values.seatsmax}
              name='seatsmax'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.seatsmax && formik.errors.seatsmax}
              type='number'
              min='2'
            />
          </ModalGrid>
        )}
        {isOpen && (
          <ModalGrid>
            <Calculate className='subproductCalculate'>
              <span className='slotContent'>{formik.values.lessonnumber === 0 ? t('Количество уроков') : formik.values.lessonnumber}</span>
              <FlexContainer>
                <button
                  className={classnames(formik.values.lessonnumber === 0 && 'hidden')}
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (formik.values.lessonnumber > 1) {
                      formik.setFieldValue('lessonnumber', formik.values.lessonnumber - 1);
                    }
                  }}
                >
                  <IconInstance name={EIcon.minus} />
                </button>

                <button
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (formik.values.lessonnumber < 10) {
                      formik.setFieldValue('lessonnumber', formik.values.lessonnumber + 1);
                    }
                  }}
                >
                  <IconInstance name={EIcon.plus} />
                </button>
              </FlexContainer>
            </Calculate>
          </ModalGrid>
        )}
        <ModalGrid>
          <FormItem>
            <CommonInput
              label={t('Длительность услуги')}
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
          <FormItem>
            <CommonInput
              label={t('Цена услуги')}
              name='tarif'
              type='number'
              value={formik.values.tarif}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.tarif && formik.errors.tarif}
              formik={formik}
              simple
            >
              <IconInstance name={EIcon.payoutline} />
            </CommonInput>
          </FormItem>
        </ModalGrid>
        <FlexWithAlign
          $alignCenter='center'
          $justify='end'
        >
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
            typeBtn='primary'
            type='submit'
            disabled={!formik.isValid}
          >
            <span>{edit ? t('Сохранить') : t('Добавить')}</span>
          </CommonButton>
        </FlexWithAlign>
      </FormStyle>
    </Wrapper>
  );
});

export default inject('productsStore', 'subproductsStore')(CreateServiceModal);
