import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import { ItemForm, SubmitBtn } from './ServiceCategoriesItemAdd.styled';

import { ReactComponent as Plus } from '../../../../../components/icons/plus.svg';
import CommonButton from '../../../../../components/shared/button/CommonButton';
import CommonItemAdd from '../../../../../components/shared/modal/create/common-item-add/CommonItemAdd';
import ProductsStore from '../../../../../store/productsStore';
import { apiPut } from '../../../../../utils/apiInstance';

interface Props {
  productsStore?: ProductsStore;
  setIsAddingServiceCategory: Dispatch<SetStateAction<boolean>>;
}

const ServiceCategoriesItemAdd: React.FC<Props> = observer((props) => {
  const { setIsAddingServiceCategory, productsStore } = props;
  const [formValid, setFormValid] = useState(false);
  const [pending, setPending] = useState(false);
  const { t } = useTranslation();
  const addServiceCategory = async (values: any) => {
    setPending(true);
    const res = await apiPut('/product', {
      ...values,
      order: Number(productsStore?.products.length) + 1
    });
    if (res?.status === 200) {
      setPending(false);
      productsStore!.fetchProducts();
      setIsAddingServiceCategory(false);
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };

  const initialValues = {
    id: '',
    name: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {}
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    addServiceCategory(formik.values);
    formik.resetForm();
  };

  useEffect(() => {
    if (formik.values.name) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formik.values]);

  return (
    <CommonItemAdd>
      <ItemForm onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            name='name'
            className='customInput'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={`${t('Введите название')}...`}
          ></input>
        </div>
        <SubmitBtn className='flex'>
          <CommonButton
            color={'mainLight'}
            disabled={!formValid}
          >
            <Plus />
            <span>{t('Сохранить')}</span>
          </CommonButton>
          <button
            type='button'
            className='backButton'
            onClick={() => setIsAddingServiceCategory(false)}
          >
            Назад
          </button>
        </SubmitBtn>
      </ItemForm>
    </CommonItemAdd>
  );
});

export default inject('productsStore')(ServiceCategoriesItemAdd);
