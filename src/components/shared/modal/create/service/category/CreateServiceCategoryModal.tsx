import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import { Box, ColorClassifInput, FormItem, NameClassifInput, Wrapper } from './CreateServiceCategoryModal.styled';

import { ModalGrid } from '../../../../../../pages/private/product/modal-elements/form-start/FirstForm.styled';
import ClassificatorsStore from '../../../../../../store/classificatorsStore';
import ProductsStore from '../../../../../../store/productsStore';
import { apiPost, apiPut } from '../../../../../../utils/apiInstance';
import { FlexContainer, FlexWithAlign, FormStyle, PageTitle, Text } from '../../../../../../utils/styleUtils';
import { EIcon, IconNew as IconInstance } from '../../../../../icons/medium-new-icons/icon';
import CommonButton from '../../../../button/CommonButton';
import CommonDropdown from '../../../../dropdawn/CommonDropdown';
import CommonInput from '../../../../fields/CommonInput';

interface IProps {
  modalPayload?: any;
  productsStore?: ProductsStore;
  classificatorsStore?: ClassificatorsStore;
  edit?: boolean;
  closeModal?: () => void;
}

const colors = [
  {
    value: 'rgba(73, 111, 255, 1)',
    label: 'Синий',
    color: 'rgba(73, 111, 255, 1)'
  },
  {
    value: 'rgba(40, 179, 74, 1)',
    label: 'Зеленый',
    color: 'rgba(40, 179, 74, 1)'
  },
  {
    value: 'rgba(239, 220, 49, 1)',
    label: 'Желтый',
    color: 'rgba(239, 220, 49, 1)'
  },
  {
    value: 'rgba(221, 57, 48, 1)',
    label: 'Красный',
    color: 'rgba(221, 57, 48, 1)'
  },
  {
    value: 'rgba(155, 81, 224, 1)',
    label: 'Фиолетовый',
    color: 'rgba(155, 81, 224, 1)'
  }
];

const ClassifierItem: React.FC<{ name: string; color: string | undefined }> = ({ name, color }) => (
  <ModalGrid key={name}>
    <NameClassifInput>{name}</NameClassifInput>
    <ColorClassifInput>
      <span style={{ background: color }}></span>
      <p>
        {color === 'rgba(73, 111, 255, 1)'
          ? 'Синий'
          : color === 'rgba(40, 179, 74, 1)'
          ? 'Зеленый'
          : color === 'rgba(239, 220, 49, 1)'
          ? 'Желтый'
          : color === 'rgba(221, 57, 48, 1)'
          ? 'Красный'
          : color === 'rgba(155, 81, 224, 1)' && 'Фиолетовый'}
      </p>
    </ColorClassifInput>
  </ModalGrid>
);

const CreateServiceCategoryModal: React.FC<IProps> = observer((props) => {
  const { modalPayload: serviceCategory, classificatorsStore, edit, productsStore, closeModal } = props;
  const { products } = productsStore!;
  const { fetchClassificators, classificators } = classificatorsStore!;
  const [classifiers, setClassifiers] = useState<any>([]);
  const { t } = useTranslation();
  const [classifierColors, setClassifierColors] = useState<string[]>([]);
  const [classifierName, setClassifierName] = useState('');
  const [classifierColor, setClassifierColor] = useState('');
  const [tempClassifiers, setTempClassifiers] = useState<{ name: string; color: string }[]>([]);

  const [formValid, setFormValid] = useState(false);

  const productEdit = products.filter((item) => item.id === serviceCategory?.id)[0];

  const [isOpen, setIsOpen] = useState(productEdit && productEdit.id ? true : false);

  const addClassifier = () => {
    if (classifiers.length < 5) {
      setTempClassifiers([...tempClassifiers, { name: classifierName, color: classifierColor }]);
      setClassifiers([...classifiers, classifierName]);
      setClassifierColors([...classifierColors, classifierColor]);
      setClassifierName('');
      setClassifierColor('');
    } else {
      toast.warning(t('Вы можете добавить не более 5 классификаторов.'));
    }
  };

  const initialValues = {
    id: '',
    name: '',
    comment: ''
  };

  const isClassificatorUnique = (name: string, productid: string) => {
    return !classificators?.some((item) => item.name === name && item.productid === productid);
  };

  const formik = useFormik({
    initialValues: productEdit
      ? {
          id: productEdit.id,
          name: productEdit.name
        }
      : initialValues,
    onSubmit: (values: any) => {}
  });

  useEffect(() => {
    if (formik.values.name) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formik.values]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      let productId = '';
      if (edit) {
        await apiPost(`/product/${formik.values.id}`, formik.values);
        productId = formik.values.id;
      } else {
        const res = await apiPut('/product', formik.values);
        productId = res.data.id;
      }

      setClassifiers([...classifiers, ...tempClassifiers]);

      for (const [index, classifier] of classifiers.entries()) {
        const classificatorsEvent = {
          name: classifier,
          productid: productId,
          color: classifierColors[index]
        };

        if (!isClassificatorUnique(classifier, productId)) {
          toast.error(t('Классификатор с таким именем уже существует'));

          return;
        }
        await apiPut('/classificator', classificatorsEvent);
        toast.success(t('Классификатор успешно добавлен'));
      }

      setTempClassifiers([]);
      await productsStore?.fetchProducts();
      await fetchClassificators();
      closeModal!();
    } catch (error: any) {
      toast.error(error.message || t('Произошла ошибка'));
    }
  };

  return (
    <Wrapper>
      <FormStyle onSubmit={handleSubmit}>
        <PageTitle>{edit ? `${t('Редактирование')} ${productEdit.name}` : t('Добавить категорию услуг')}</PageTitle>
        <Box className='form'>
          <Text>Название категории</Text>
          <FormItem className='head'>
            <CommonInput
              label={t('Название')}
              value={formik.values.name}
              onChange={formik.handleChange}
              name='name'
              simple
            />
          </FormItem>

          <ModalGrid>
            {productEdit && productEdit.id ? (
              <Text>{t('Классификатор')}</Text>
            ) : (
              <FlexContainer className='checked'>
                <label className='checkbox-container'>
                  <input
                    className='custom-checkbox green'
                    type='checkbox'
                    checked={isOpen}
                    onChange={() => setIsOpen((prev) => !prev)}
                  />
                  <span className='checkmark'></span>
                </label>
                <p>{t('Добавить классификатор')}</p>
              </FlexContainer>
            )}
          </ModalGrid>
          {isOpen && (
            <>
              {classificators &&
                classificators
                  .filter((item) => item.productid === formik.values.id)
                  .map((item) => (
                    <ClassifierItem
                      key={item.name}
                      name={item.name}
                      color={item.color}
                    />
                  ))}
              {tempClassifiers.map((tempClassifier, index) => (
                <ClassifierItem
                  key={index}
                  name={tempClassifier.name}
                  color={tempClassifier.color}
                />
              ))}
              <ModalGrid className='classificatorWrapper'>
                <CommonInput
                  label={t('Напишите классификатор')}
                  value={classifierName}
                  simple
                  onChange={(e) => setClassifierName(e.target.value)}
                >
                  <IconInstance name={EIcon.tab} />
                </CommonInput>
                <CommonDropdown
                  className='selectedService'
                  options={colors}
                  onChange={(selected: any) => {
                    setClassifierColor(selected.value);
                  }}
                  placeholder={t('Цвет классификатора')}
                />
              </ModalGrid>
              <ModalGrid>
                <CommonButton
                  disabled={classifiers.length >= 5 || !classifierName || !classifierColor}
                  onClick={() => addClassifier()}
                  typeBtn='ghost'
                  gap='16px'
                >
                  <IconInstance name={EIcon.plussquare} />
                  <p>{t('Добавить классификатор')}</p>
                </CommonButton>
              </ModalGrid>
            </>
          )}

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
              {t('Отменить')}
            </CommonButton>
            <CommonButton
              typeBtn='primary'
              disabled={!formValid}
            >
              <span>{edit ? t('Сохранить') : t('Добавить')}</span>
            </CommonButton>
          </FlexWithAlign>
        </Box>
      </FormStyle>
    </Wrapper>
  );
});

export default inject('productsStore', 'classificatorsStore')(CreateServiceCategoryModal);
