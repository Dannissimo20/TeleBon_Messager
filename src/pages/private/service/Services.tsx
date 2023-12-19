import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import {
  BtnAddWrap,
  ButtonDelete,
  ButtonDrugAndDrop,
  ButtonEdit,
  ControlsWrap,
  List,
  ListHead,
  ListItem,
  ListItemBtnEmpty,
  TitleWrap,
  Wrapper
} from './Service.styled';

import { EIcon, IconNew as IconInstance } from '../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../components/shared/button/CommonButton';
import SidebarStore from '../../../store/modalStore';
import ProductsStore, { IProduct } from '../../../store/productsStore';
import SubproductsStore, { ISubproduct } from '../../../store/subProductsStore';

interface IProps {
  product: IProduct;
  modalStore?: SidebarStore;
  productsStore?: ProductsStore;
  subproductsStore?: SubproductsStore;
}

const Services: React.FC<IProps> = observer((props) => {
  const { product, productsStore, subproductsStore, modalStore } = props;
  const { t } = useTranslation();
  const { products } = productsStore!;

  const categoryServiceId = product.id;
  const { subproducts, subproductsAll, state } = subproductsStore!;

  const serviceObj = subproductsAll.find((item) => item.productId === categoryServiceId);

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

  const { productId, data: services } = serviceObj || {
    productId: '0',
    data: []
  };

  const openServiceSidebar = (serviceCategoryId: string) => {
    modalStore?.openModal({
      name: 'CREATE_SERVICE',
      payload: {
        serviceCategoryId
      }
    });
  };
  const editServiceSidebar = (serviceCategoryId: string, service: ISubproduct) => {
    modalStore?.openModal({
      name: 'EDIT_SERVICE',
      payload: {
        service,
        serviceCategoryId
      }
    });
  };

  const deleteService = (subproduct: ISubproduct) => {
    modalStore?.openModal({
      name: 'CONFIRM_DELETE',
      payload: subproduct,
      isDanger: true,
      actionName: 'SUBPRODUCT',
      classModal: 'danger'
    });
  };

  useEffect(() => {
    if (categoryServiceId) {
      getSubproductsAll(products);
    }
  }, []);

  return (
    <Wrapper>
      {services.length > 0 ? (
        <List>
          <ListHead>
            <span></span>
            <span>{t('Название услуги')}</span>
            <span className='price'>{t('Стоимость')}</span>
            <span className='duration'>{t('Тип услуги')}</span>
            <span className='type'>{t('Длительность')}</span>
            <span></span>
          </ListHead>
          {services.map((service) => (
            <ListItem key={service.id}>
              <ButtonDrugAndDrop className='flex'>
                <IconInstance name={EIcon.productsmenu} />
              </ButtonDrugAndDrop>
              <TitleWrap className='flex'>
                <span>{service.name}</span>
              </TitleWrap>
              <span className='price'>{service.tarif === null || service.tarif === undefined ? 0 : service.tarif} ₽</span>
              <span className='type'>{service.group === 'yes' ? t('Групповая') : t('Индивидуальная')}</span>
              <span className='duration'>{service.duration} минут</span>
              <ControlsWrap className='flex'>
                <ButtonEdit
                  className='flex'
                  onClick={() => editServiceSidebar(categoryServiceId, service)}
                >
                  <IconInstance name={EIcon.smalledit} />
                </ButtonEdit>
                <ButtonDelete
                  className='flex'
                  onClick={() => deleteService(service!)}
                >
                  <IconInstance name={EIcon.trash} />
                </ButtonDelete>
              </ControlsWrap>
            </ListItem>
          ))}

          <BtnAddWrap>
            <CommonButton
              onClick={() => openServiceSidebar(categoryServiceId)}
              typeBtn='secondary'
            >
              <IconInstance name={EIcon.plussquare} />
              <span>{t('Добавить услугу')}</span>
            </CommonButton>
          </BtnAddWrap>
        </List>
      ) : (
        <ListItemBtnEmpty>
          <span>{t('В этой категории еще нет услуг')}</span>
          <CommonButton
            onClick={() => openServiceSidebar(categoryServiceId)}
            typeBtn='secondary'
          >
            <IconInstance name={EIcon.plussquare} />
            <span>{t('Добавить услугу')}</span>
          </CommonButton>
        </ListItemBtnEmpty>
      )}
    </Wrapper>
  );
});

export default inject('productsStore', 'subproductsStore', 'modalStore')(Services);
