import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import CommonButton from '../../../button/CommonButton';
import CommonInput from '../../../fields/CommonInput';
import { ReactComponent as PlusIcon } from '../../../../icons/plus.svg';

import ProductsStore from '../../../../../store/productsStore';
import { apiPost, apiPut } from '../../../../../utils/apiInstance';
import { FormStyle } from '../../../../../utils/styleUtils';
import { Box, ButtonInner, FormItem, Wrapper } from './CreateProduct.styled';

interface IProps {
  productsStore?: ProductsStore;
  edit?: boolean;
}

const CreateProduct: React.FC<IProps> = observer((props) => {
  const { edit, productsStore } = props;
  const { products } = productsStore!;

  const [pending, setPending] = useState(false);

  const [formValid, setFormValid] = useState(false);
  const { productId } = useParams();

  const navigate = useNavigate();
  const productEdit = products.filter((item) => item.id === productId)[0];

  const initialValues = {
    name: '',
    comment: ''
  };

  const addProduct = async (values: any) => {
    setPending(true);
    const res = await apiPut('/product', values);
    if (res?.status === 200) {
      setPending(false);
      productsStore!.fetchProducts();
      navigate('/management/product');
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };

  const editProduct = async (values: any) => {
    setPending(true);
    const res = await apiPost(`/product/${values.id}`, values);
    if (res?.status === 200) {
      setPending(false);
      productsStore!.fetchProducts();
      navigate('/management/product');
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };

  const formik = useFormik({
    initialValues: productEdit ? productEdit : initialValues,
    onSubmit: (values: any) => {}
  });
  useEffect(() => {
    if (formik.values.name && formik.values.comment) {
      setFormValid(true);
    }
  }, [formik.values]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (edit) {
      editProduct(formik.values);
    } else {
      addProduct(formik.values);
    }
  };

  return (
    <Wrapper>
      <FormStyle onSubmit={handleSubmit}>
        <Box className='form'>
          <FormItem className='head'>
            <CommonInput
              label={'Название продукта'}
              value={formik.values.name}
              onChange={formik.handleChange}
              name='name'
              simple
              placeholder={'Название продукта...'}
            />
          </FormItem>
          <FormItem>
            <CommonInput
              label={'Описание продукта'}
              value={formik.values.comment}
              onChange={formik.handleChange}
              name='comment'
              simple
            />
          </FormItem>
          <CommonButton
            typeBtn='success'
            type='submit'
            disabled={!formValid}
          >
            <ButtonInner>
              <PlusIcon />
              <span>{edit ? 'Сохранить продукт' : 'Создать продукт'}</span>
            </ButtonInner>
          </CommonButton>
        </Box>
      </FormStyle>
    </Wrapper>
  );
});

export default inject('productsStore')(CreateProduct);
