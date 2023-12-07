import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import CommonButton from '../../../button/CommonButton';
import CommonInput from '../../../fields/CommonInput';
import { ReactComponent as PlusIcon } from '../../../../icons/plus.svg';

import SubproductsStore from '../../../../../store/subProductsStore';
import { apiPost, apiPut } from '../../../../../utils/apiInstance';
import { FormStyle } from '../../../../../utils/styleUtils';
import { Box, ButtonInner, FormItem, Wrapper } from './CreateSubproduct.styled';

interface IProps {
  subproductsStore?: SubproductsStore;
  edit?: boolean;
}

const CreateSubProduct: React.FC<IProps> = observer((props) => {
  const { edit, subproductsStore } = props;
  const { subproducts } = subproductsStore!;

  const [pending, setPending] = useState(false);

  const [formValid, setFormValid] = useState(false);
  const { productId, subproductId } = useParams();

  const navigate = useNavigate();
  const subProductEdit = subproducts.filter((item) => item.id === subproductId)[0];

  const initialValues = {
    name: '',
    comment: '',
    duration: '',
    tarif: ''
  };

  const addSubProduct = async (values: any) => {
    setPending(true);
    const res = await apiPut(`/subproduct/${productId}`, values);
    if (res?.status === 200) {
      setPending(false);
      subproductsStore!.fetchSubproducts(productId!);
      navigate(`/management/product/${productId}/subproducts`);
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };

  const editSubProduct = async (values: any) => {
    setPending(true);
    const res = await apiPost(`/subproduct/${productId}/${values.id}`, values);
    if (res?.status === 200) {
      setPending(false);
      subproductsStore!.fetchSubproducts(productId!);
      navigate(`/management/product/${productId}/subproducts`);
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };

  const formik = useFormik({
    initialValues: subProductEdit ? subProductEdit : initialValues,
    onSubmit: (values: any) => {}
  });
  useEffect(() => {
    if (formik.values.name && formik.values.comment) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formik.values]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (edit) {
      editSubProduct(formik.values);
    } else {
      addSubProduct(formik.values);
    }
  };

  return (
    <Wrapper>
      <FormStyle onSubmit={handleSubmit}>
        <Box className='form'>
          <FormItem className='head'>
            <CommonInput
              label={'Название субпродукта'}
              value={formik.values.name}
              onChange={formik.handleChange}
              name='name'
              simple
              placeholder={'Название субпродукта...'}
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
          <FormItem>
            <CommonInput
              label={'Длительность'}
              value={formik.values.duration}
              onChange={formik.handleChange}
              name='duration'
              simple
            />
          </FormItem>
          <FormItem>
            <CommonInput
              label={'Цена'}
              value={formik.values.tarif}
              onChange={formik.handleChange}
              name='tarif'
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
              <span>{edit ? 'Сохранить субпродукт' : 'Создать субпродукт'}</span>
            </ButtonInner>
          </CommonButton>
        </Box>
      </FormStyle>
    </Wrapper>
  );
});

export default inject('subproductsStore')(CreateSubProduct);
