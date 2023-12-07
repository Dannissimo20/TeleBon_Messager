import { inject, observer } from 'mobx-react';

import ProductsList from './list/ProductsList';
import { Box, EmptyContent, Wrapper } from './ProductsContent.styled';

import ProductsStore from '../../../../store/productsStore';
import { PENDING } from '../../../../utils/state';

interface IProps {
  productsStore?: ProductsStore;
}

const ProductsContent: React.FC<IProps> = observer((props) => {
  const { productsStore } = props;
  const { products, state } = productsStore!;

  return (
    <Wrapper>
      {products.length === 0 ? (
        <EmptyContent>Нет ни одного продукта</EmptyContent>
      ) : (
        <ProductsList
          products={products}
          pending={state === PENDING}
        />
      )}
      <Box />
    </Wrapper>
  );
});

export default inject('productsStore')(ProductsContent);
