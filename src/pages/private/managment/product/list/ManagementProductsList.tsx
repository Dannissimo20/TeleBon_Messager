import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import { ReactComponent as NextIcon } from '../../../../../components/icons/arrownext.svg';
import { ReactComponent as DeleteIcon } from '../../../../../components/icons/delete.svg';
import { ReactComponent as PenIcon } from '../../../../../components/icons/pen.svg';
import { CommonEmptyContent } from '../../../../../components/shared/empty-content/CommonEmptyContent';
import ModalStore from '../../../../../store/modalStore';
import ProductsStore, { IProduct } from '../../../../../store/productsStore';
import { DividerGrey } from '../../../../../utils/styleUtils';
import { Card, CardComment, DeleteBtn, Grid, IconWrap, TitleWrap } from './ManagementProductsList.styled';

interface IProps {
  productsStore?: ProductsStore;
  modalStore?: ModalStore;
}

const ManagementProductsList: React.FC<IProps> = observer((props) => {
  const { productsStore, modalStore } = props;
  const { products, state } = productsStore!;

  const fetchProducts = async () => {
    const productsList = await productsStore?.fetchProducts();
  };

  const deleteProduct = (product: IProduct) => {
    modalStore?.openModal({
      name: 'CONFIRM_DELETE',
      payload: product,
      isDanger: true,
      actionName: 'PRODUCT',
      classModal: 'danger'
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Grid className={products.length === 0 ? 'empty' : 'full'}>
      {products &&
        products.map((product) => (
          <Card key={product.id}>
            <TitleWrap>
              <h3 className='subtitle'>{product.name}</h3>
              <DeleteBtn
                className='flex'
                onClick={() => deleteProduct(product)}
              >
                <DeleteIcon />
              </DeleteBtn>
            </TitleWrap>
            <DividerGrey $margin='0px' />
            <div className='flex'>
              <Link
                to={`/management/product/${product.id}/subproducts`}
                className='subproductsLink flex'
              >
                <span>Все субпродукты</span>
                <NextIcon />
              </Link>
            </div>
            <CardComment>{product.comment}</CardComment>
            <Link
              to={`/management/product/edit/${product.id}`}
              className={'editLink'}
            >
              <IconWrap>
                <PenIcon />
              </IconWrap>
            </Link>
          </Card>
        ))}
      {products.length === 0 && (
        <CommonEmptyContent
          to={'/management/product/add'}
          title={'Создать продукт'}
        />
      )}
    </Grid>
  );
});

export default inject('productsStore', 'modalStore')(ManagementProductsList);
