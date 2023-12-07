import { observer } from 'mobx-react';

import ProductsListItem from './item/ProductsListItem';
import { List } from './ProductsList.styled';

import { IProduct } from '../../../../../store/productsStore';

interface IProps {
  products: IProduct[];
  pending: boolean;
}

const ProductsList: React.FC<IProps> = observer(({ products, pending }) => {
  return (
    <div>
      <List>
        {products.map((product: IProduct) => (
          <ProductsListItem
            key={product.id}
            product={product}
          />
        ))}
      </List>
    </div>
  );
});

export default ProductsList;
