import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import CommonButton from '../../../button/CommonButton';
import CommonInput from '../../../fields/CommonInput';
import { EIcons, Icon } from '../../../../icons';
import { ReactComponent as NextIcon } from '../../../../icons/arrownext.svg';
import { ReactComponent as PenIcon } from '../../../../icons/pen.svg';
import { ReactComponent as PlusIcon } from '../../../../icons/plus.svg';

import FilialStore from '../../../../../store/filialStore';
import { apiPost, apiPut } from '../../../../../utils/apiInstance';
import { DividerArrow, FormStyle, PageTitle } from '../../../../../utils/styleUtils';
import { Box, Breadcrumbs, ButtonInner, FormItem, InfoContent, InfoItem, Notice, Wrapper } from './CreateFilialModal.styled';

interface IProps {
  filialStore?: FilialStore;
  closeModal?: () => void;
  edit?: boolean;
  modalPayload?: any;
}

const CreateFilialModal: React.FC<IProps> = observer((props) => {
  const { closeModal, edit, modalPayload, filialStore } = props;
  const { filials } = filialStore!;
  const [pending, setPending] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const inputFilialRef = useRef(null);
  const inputAddressRef = useRef(null);
  const inputPhoneRef = useRef(null);
  const inputRucovoditelRef = useRef(null);
  const inputYurlicoRef = useRef(null);

  const setFocus = (ref: any) => {
    if (ref.current) {
      ref.current?.focus();
    }
  };
  const initialValues = {
    name: '',
    address: '',
    phone: '',
    rucovoditel: '',
    yurlico: ''
  };

  const formik = useFormik({
    initialValues: modalPayload ? modalPayload : initialValues,
    onSubmit: (values: any) => {}
  });

  useEffect(() => {
    if (formik.values.name && formik.values.address && formik.values.phone && formik.values.rucovoditel) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formik.values]);

  const createFilial = async (values: any) => {
    setPending(true);
    const res = await apiPut('/filial', values);
    if (res?.status === 200) {
      setPending(false);
      closeModal!();
      filialStore!.fetch();
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };

  const editFilial = async (values: any) => {
    setPending(true);
    const res = await apiPost(`/filial/${values.id}`, values);
    if (res?.status === 200) {
      setPending(false);
      closeModal!();
      filialStore!.fetch();
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (edit) {
      editFilial(formik.values);
    } else {
      createFilial(formik.values);
    }
  };

  return (
    <Wrapper>
      <PageTitle>{formik.values.name !== '' ? formik.values.name : 'Создание филиала'}</PageTitle>
      <Breadcrumbs>
        <span>Управление</span>
        <DividerArrow>
          <NextIcon />
        </DividerArrow>
        <span>Филиал</span>
        <DividerArrow>
          <NextIcon />
        </DividerArrow>
        <span className='active'>{edit ? 'Редактирование филиала' : 'Создание филиала'}</span>
      </Breadcrumbs>
      <FormStyle onSubmit={handleSubmit}>
        <Box className='form'>
          <FormItem>
            <Icon name={EIcons.filial} />
            <CommonInput
              label={'Название филиала'}
              value={formik.values.name}
              onChange={formik.handleChange}
              name='name'
              innerRef={inputFilialRef}
              placeholder={'...'}
            >
              <button
                type='button'
                onClick={() => setFocus(inputFilialRef)}
              >
                <PenIcon />
              </button>
            </CommonInput>
          </FormItem>

          <FormItem>
            <Icon name={EIcons.address} />
            <CommonInput
              label={'Адрес'}
              name='address'
              value={formik.values.address}
              onChange={formik.handleChange}
              innerRef={inputAddressRef}
              placeholder={'...'}
            >
              <button
                type='button'
                onClick={() => setFocus(inputAddressRef)}
              >
                <PenIcon />
              </button>
            </CommonInput>
          </FormItem>

          <FormItem>
            <Icon name={EIcons.phone} />
            <CommonInput
              label={'Телефон'}
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              type={'tel'}
              innerRef={inputPhoneRef}
              placeholder={'...'}
            >
              <button
                type='button'
                onClick={() => setFocus(inputPhoneRef)}
              >
                <PenIcon />
              </button>
            </CommonInput>
          </FormItem>
          <FormItem>
            <Icon name={EIcons.user} />
            <CommonInput
              label={'Руководитель'}
              value={formik.values.rucovoditel}
              onChange={formik.handleChange}
              name='rucovoditel'
              innerRef={inputRucovoditelRef}
              placeholder={'...'}
            >
              <button
                type='button'
                onClick={() => setFocus(inputRucovoditelRef)}
              >
                <PenIcon />
              </button>
            </CommonInput>
          </FormItem>
          <FormItem>
            <Icon name={EIcons.user} />
            <CommonInput
              label={'Юридическое лицо'}
              value={formik.values.yurlico}
              onChange={formik.handleChange}
              name='yurlico'
              innerRef={inputYurlicoRef}
              placeholder={'...'}
            >
              <button
                type='button'
                onClick={() => setFocus(inputYurlicoRef)}
              >
                <PenIcon />
              </button>
            </CommonInput>
          </FormItem>
        </Box>
        <Box className='info'>
          <InfoContent>
            {formik.values &&
              Object.keys(formik.values).map((key) => (
                <>
                  {key === 'name' && (
                    <InfoItem className='head'>
                      <Icon name={EIcons.filial} />
                      <span>{formik.values[key] !== '' ? formik.values[key] : <span className='empty'>Название филиала...</span>}</span>
                    </InfoItem>
                  )}
                  {key === 'address' && (
                    <InfoItem>
                      <Icon name={EIcons.address} />
                      <span>{formik.values[key] !== '' ? formik.values[key] : <span className='empty'>...</span>}</span>
                    </InfoItem>
                  )}
                  {key === 'phone' && (
                    <InfoItem>
                      <Icon name={EIcons.phone} />
                      <span>{formik.values[key] !== '' ? formik.values[key] : <span className='empty'>...</span>}</span>
                    </InfoItem>
                  )}
                  {key === 'rucovoditel' && (
                    <InfoItem>
                      <Icon name={EIcons.user} />
                      <span>{formik.values[key] !== '' ? formik.values[key] : <span className='empty'>...</span>}</span>
                    </InfoItem>
                  )}
                  {key === 'yurlico' && (
                    <InfoItem>
                      <Icon name={EIcons.user} />
                      <span>{formik.values[key] !== '' ? formik.values[key] : <span className='empty'>...</span>}</span>
                    </InfoItem>
                  )}
                </>
              ))}
          </InfoContent>
          <Notice>Проверьте правильность данных</Notice>
          <CommonButton
            typeBtn='success'
            type='submit'
            fullWidth
            disabled={!formValid}
          >
            <ButtonInner>
              <PlusIcon />
              <span>{edit ? 'Сохранить филиал' : 'Создать филиал'}</span>
            </ButtonInner>
          </CommonButton>
        </Box>
      </FormStyle>
    </Wrapper>
  );
});

export default inject('filialStore')(CreateFilialModal);
