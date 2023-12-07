import { Outlet } from 'react-router-dom';

import ProductTopbar from '../../../pages/private/product/recorging-topbar/topbar/ProductTopbar';
import { Wrapper } from '../PageStyled.styled';

export default function Products() {
  return (
    <Wrapper>
      <ProductTopbar />
      <Outlet />
    </Wrapper>
  );
}
