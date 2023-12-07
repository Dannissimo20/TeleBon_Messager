import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import { ReactComponent as AddIcon } from '../../../../../../components/icons/addplus.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../components/icons/delete.svg';
import { ReactComponent as PenIcon } from '../../../../../../components/icons/pen.svg';
import { ReactComponent as TimeIcon } from '../../../../../../components/icons/time.svg';
import { CommonEmptyContent } from '../../../../../../components/shared/empty-content/CommonEmptyContent';
import ModalStore from '../../../../../../store/modalStore';
import SubproductsStore, { ISubproduct } from '../../../../../../store/subProductsStore';
import { DividerGrey } from '../../../../../../utils/styleUtils';
import { CardItem, DeleteBtn, Grid, Head, ItemInfo } from './ManagementSubproductsList.styled';

interface IProps {
  subproductsStore?: SubproductsStore;
  modalStore?: ModalStore;
}

const ManagementSubproductsList: React.FC<IProps> = observer((props) => {
  const { productId } = useParams();
  const { subproductsStore, modalStore } = props;
  const { subproducts, state } = subproductsStore!;

  const fetchSubproducts = (id: string) => {
    subproductsStore?.fetchSubproducts(id);
  };

  const deleteSubProduct = (subproduct: ISubproduct) => {
    modalStore?.openModal({
      name: 'CONFIRM_DELETE',
      payload: subproduct,
      isDanger: true,
      actionName: 'SUBPRODUCT',
      classModal: 'danger'
    });
  };

  useEffect(() => {
    if (productId) {
      fetchSubproducts(productId);
    }
  }, []);

  return (
    <Grid className={subproducts.length === 0 ? 'empty' : 'full'}>
      {subproducts.length > 0 &&
        subproducts.map((subproduct) => (
          <CardItem
            key={subproduct.id}
            $padding='18px'
          >
            <Head className='flex'>
              <h3 className='subtitle'>{subproduct.name}</h3>
              <Link
                to={`/management/product/${productId}/subproducts/edit/${subproduct.id}`}
                className='editLink'
              >
                <PenIcon />
              </Link>
            </Head>
            <DividerGrey $margin='0px' />
            <ItemInfo className='flex'>
              <TimeIcon />
              <span>Длительность: {subproduct.duration}</span>
            </ItemInfo>
            <ItemInfo className='flex'>
              <TimeIcon />
              <span>Цена: {subproduct.tarif}</span>
            </ItemInfo>
            <ItemInfo className='flex delete'>
              <DeleteBtn
                className='flex'
                onClick={() => deleteSubProduct(subproduct)}
              >
                <DeleteIcon />
              </DeleteBtn>
            </ItemInfo>
          </CardItem>
        ))}
      {subproducts.length > 0 && (
        <>
          <CardItem className='add'>
            <Link
              to={`/management/product/${productId}/subproducts/add`}
              className='addLink'
            >
              <AddIcon />
            </Link>
          </CardItem>
        </>
      )}

      {subproducts.length === 0 && (
        <CommonEmptyContent
          to={`/management/product/${productId}/subproducts/add`}
          title={'Создать субпродукт'}
        />
      )}
    </Grid>
  );
});

export default inject('subproductsStore', 'modalStore')(ManagementSubproductsList);
