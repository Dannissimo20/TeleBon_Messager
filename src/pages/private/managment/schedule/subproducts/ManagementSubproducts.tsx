import { useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import { TopWrap, Wrapper } from './ManagementSubproducts.styled';

import ProductsStore from '../../../../../store/productsStore';

interface IProps {
  productsStore?: ProductsStore;
}

const ManagementSubproducts: React.FC<IProps> = observer((props) => {
  const { productId } = useParams();
  const { productsStore } = props;
  const { products } = productsStore!;
  const { t } = useTranslation();
  const product = products.find((item) => item.id === productId);

  return (
    <Wrapper>
      <TopWrap>
        <div className={'product'}>
          <div className={'label'}>{t('Наименование продукта')}</div>
          <div className={'value'}>{product?.name || 'Без названия'}</div>
        </div>
        <div>
          <div className={'label'}>{t('Тип услуги')}</div>
          <div className={'value'}>{t('Индивидуальная(статика)')}</div>
        </div>
        <div>
          <div className={'label'}>{t('Тип услуги')}</div>
          <div className={'value'}>{t('Индивидуальная(статика)')}</div>
        </div>
      </TopWrap>
      <>
        <Outlet />
      </>
    </Wrapper>
  );
});

export default inject('productsStore')(ManagementSubproducts);
