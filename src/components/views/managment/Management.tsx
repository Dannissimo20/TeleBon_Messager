import React from 'react';
import { Outlet } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import ModalStore from '../../../store/modalStore';
import ProductsStore from '../../../store/productsStore';

interface IProps {
  productsStore?: ProductsStore;
  modalStore?: ModalStore;
}

const Management: React.FC<IProps> = observer(() => {
  return <Outlet />;
});
export default inject('productsStore')(Management);
