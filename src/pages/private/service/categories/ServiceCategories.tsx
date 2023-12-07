import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import update from 'immutability-helper';
import { inject, observer } from 'mobx-react';
import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';

import CommonButton from '../../../../components/shared/button/CommonButton';
import CommonNavMenu from '../../../../components/shared/nav/CommonNavMenu';
import { CommonPageTitle } from '../../../../components/shared/title/CommonPageTitle';
import ServiceCategoriesItem from './item/ServiceCategoriesItem';

import ModalStore from '../../../../store/modalStore';
import ProductsStore, { IProduct } from '../../../../store/productsStore';
import SubproductsStore from '../../../../store/subProductsStore';
import { apiPost } from '../../../../utils/apiInstance';
import { List, TopBar, Wrapper } from './ServiceCategories.styled';
import { FlexWithAlign, Text } from '../../../../utils/styleUtils';

const managementMenu = [
  {
    title: 'Услуги',
    to: '/management/service-categories'
  },
  {
    title: 'Ресурсы',
    to: '/management/schedule'
  },
  {
    title: 'Сотрудники',
    to: '/management/employee'
  }
];

interface IProps {
  productsStore?: ProductsStore;
  subproductsStore?: SubproductsStore;
  modalStore?: ModalStore;
}

const ServiceCategories: React.FC<IProps> = observer((props) => {
  const { productsStore, subproductsStore } = props;
  const { products, state } = productsStore!;

  const [isAddingServiceCategory, setIsAddingServiceCategory] = useState<boolean>(false);

  const createCategory = () => {
    props.modalStore!.openModal({ name: 'CREATE_SERVICE_CATEGORY' });
  };
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

  const [serviceCategories, setServiceCategories] = useState<IProduct[]>(products);

  const moveListItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setServiceCategories((prevServiceCategories) =>
      update(prevServiceCategories, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevServiceCategories[dragIndex]]
        ]
      })
    );
  }, []);

  const updateServiceCategoriesOrder = useCallback(async (products: IProduct[]) => {
    if (products.length === 0) {
      return;
    }

    for (const product of products) {
      try {
        const res = await apiPost(`/product/${product.id}`, {
          ...product,
          order: products.indexOf(product)
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
  useEffect(() => {
    getSubproductsAll(products);
    setServiceCategories(products);
  }, [state]);

  const renderCard = useCallback((serviceCategories: IProduct[], product: IProduct, index: number) => {
    return (
      <ServiceCategoriesItem
        key={product?.id}
        product={product}
        index={index}
        id={product?.id}
        moveListItem={moveListItem}
        updateListOrder={updateServiceCategoriesOrder}
        serviceCategories={serviceCategories}
      />
    );
  }, []);

  return (
    <Wrapper>
      <TopBar
        $gap='45px'
        $column={true}
      >
        <FlexWithAlign
          $alignCenter='center'
          $justify='between'
        >
          <CommonPageTitle title='Управление' />
          <CommonButton
            gap='16px'
            onClick={createCategory}
            typeBtn='ghost'
          >
            <IconInstance name={EIcon.plussquare} />
            <span>Добавить категорию услуг</span>
          </CommonButton>
        </FlexWithAlign>
        <CommonNavMenu list={managementMenu} />
      </TopBar>
      {serviceCategories && serviceCategories.length > 0 ? (
        <DndProvider backend={HTML5Backend}>
          <List className='serviceCategories'>
            {serviceCategories.map((product, index) => renderCard(serviceCategories, product, index))}
          </List>
        </DndProvider>
      ) : (
        <Text>Вы ещё не добавили ни одной услуги</Text>
      )}
    </Wrapper>
  );
});

export default inject('productsStore', 'subproductsStore', 'modalStore')(ServiceCategories);
