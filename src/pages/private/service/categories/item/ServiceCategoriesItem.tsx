import { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import {
  ButtonDelete,
  ButtonDrugAndDrop,
  ButtonEdit,
  ClassificatorItem,
  Item,
  ItemContent,
  ItemHead,
  ItemServicesCount,
  ItemTitle,
  TitleWrap
} from './SerbiceCategoriesItem.styled';

import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import ClassificatorsStore from '../../../../../store/classificatorsStore';
import ModalStore from '../../../../../store/modalStore';
import ProductsStore, { IProduct } from '../../../../../store/productsStore';
import SubproductsStore from '../../../../../store/subProductsStore';
import { transformStringCountServices } from '../../../../../utils/helperFunctions';
import { FlexWithAlign } from '../../../../../utils/styleUtils';
import Services from '../../Services';

interface IProps {
  product: IProduct;
  productsStore?: ProductsStore;
  modalStore?: ModalStore;
  subproductsStore?: SubproductsStore;
  classificatorsStore?: ClassificatorsStore;
  id: string;
  index: number;
  moveListItem?: any;
  updateListOrder?: any;
  serviceCategories?: IProduct[];
}

const ServiceCategoriesItem: React.FC<IProps> = observer((props) => {
  const {
    product,
    modalStore,
    classificatorsStore,
    productsStore,
    subproductsStore,
    id,
    index,
    moveListItem,
    updateListOrder,
    serviceCategories
  } = props;
  const { subproducts, subproductsAll, state } = subproductsStore!;
  const { fetchClassificators, classificators } = classificatorsStore!;
  const { t } = useTranslation();

  const categoryServiceId = product?.id;
  const ref = useRef<HTMLElement>(null);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const serviceObj = subproductsAll.find((item) => item.productId === categoryServiceId);
  const filteredClassificator = classificators?.filter((item) => item.productid === categoryServiceId && item.clientid === '');
  const fetchClassificatorInfo = async () => {
    await fetchClassificators();
  };

  const { productId, data: services } = serviceObj || {
    productId: '0',
    data: []
  };
  const initialValues = {
    name: '',
    comment: ''
  };

  const formik = useFormik({
    initialValues: product ? product : initialValues,
    onSubmit: (values: any) => {}
  });

  useEffect(() => {
    fetchClassificatorInfo();
  }, []);

  useEffect(() => {
    if (formik.values.name) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formik.values]);
  const [{ handlerId }, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: () => {
      return { id, index };
    },
    canDrag: (monitor) => {
      return isDraggable;
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    end(item, monitor) {
      setIsDraggable(false);
      updateListOrder(serviceCategories);
    }
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;
  const [showContent, setShowContent] = useState(false);

  const editCategory = (product: IProduct) => {
    modalStore!.openModal({
      name: 'EDIT_SERVICE_CATEGORY',
      payload: product
    });
  };

  const deleteServiceCategory = (product: IProduct) => {
    modalStore?.openModal({
      name: 'CONFIRM_DELETE',
      payload: product,
      isDanger: true,
      actionName: 'PRODUCT',
      classModal: 'danger'
    });
  };

  const serviceCountString = transformStringCountServices(services.length);

  return (
    <>
      <Item
        //@ts-ignore
        ref={ref}
        style={{ opacity: opacity }}
        data-handler-id={handlerId}
        onMouseUp={() => setIsDraggable(false)}
      >
        <ItemHead className={showContent ? 'opened' : 'closed'}>
          <ButtonDrugAndDrop onMouseDown={() => setIsDraggable(true)}>
            <IconInstance name={EIcon.productsmenu} />
          </ButtonDrugAndDrop>
          <TitleWrap>
            <ItemTitle>{product?.name}</ItemTitle>
            <ItemServicesCount>
              {t('Содержит')} {services.length} {serviceCountString}
            </ItemServicesCount>
          </TitleWrap>
          <FlexWithAlign $alignCenter='center'>
            {filteredClassificator?.map((item) => (
              <ClassificatorItem
                key={item?.name}
                style={{ background: item?.color }}
              >
                {item?.name}
              </ClassificatorItem>
            ))}
          </FlexWithAlign>
          <ButtonEdit onClick={() => editCategory(product!)}>
            <IconInstance name={EIcon.smalledit} />
          </ButtonEdit>
          <ButtonDelete onClick={() => deleteServiceCategory(product!)}>
            <IconInstance name={EIcon.trash} />
          </ButtonDelete>
          <button
            className={showContent ? 'flex open' : 'flex'}
            onClick={() => setShowContent(!showContent)}
          >
            <IconInstance name={EIcon.arrowleft} />
          </button>
        </ItemHead>
        <ItemContent>{showContent && productId && <Services product={product} />}</ItemContent>
      </Item>
    </>
  );
});

export default inject('productsStore', 'classificatorsStore', 'subproductsStore', 'modalStore')(ServiceCategoriesItem);
