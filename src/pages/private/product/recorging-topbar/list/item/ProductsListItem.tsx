import { NavLink, useLocation } from 'react-router-dom';

import { Item } from './ProductsListItem.styled';

import { IProduct } from '../../../../../../store/productsStore';

interface IProps {
  product: IProduct;
}

const ProductsListItem: React.FC<IProps> = (props) => {
  const {
    product: { id, name }
  } = props;
  const { pathname } = useLocation();
  const newPathname = pathname.replace(/\/\w{24}$/, '');

  return (
    <Item>
      <NavLink
        to={newPathname === '/products/cabinets' ? `/products/cabinets/${id}` : `/products/employee/${id}`}
        className={({ isActive, isPending }) => (isActive ? 'flex active' : 'flex')}
      >
        {name}
      </NavLink>
    </Item>
  );
};

export default ProductsListItem;
