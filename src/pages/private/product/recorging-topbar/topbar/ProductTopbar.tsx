import React, { FC } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { ButtonsWrapper, Circle, TypeInfo, Wrapper } from './ProductTopbar.styled';
import ProductsStore from '../../../../../store/productsStore';
import { FlexContainer } from '../../../../../utils/styleUtils';
import classnames from 'classnames';
import { CommonPageTitle } from '../../../../../components/shared/title/CommonPageTitle';

const ProductTopbar: FC<{ productsStore?: ProductsStore }> = observer((props) => {
  const { productsStore } = props;
  const { products } = productsStore!;
  const location = useLocation();
  const { productId } = useParams();

  const { pathname } = location;

  return (
    <Wrapper>
      <CommonPageTitle title={'Запись'}>
        <FlexContainer>
          <TypeInfo>
            <FlexContainer>
              <Circle style={{ background: '#FF9731' }}></Circle>
              <p>Индивидуальные</p>
            </FlexContainer>
            <FlexContainer>
              <Circle style={{ background: '#4700EA' }}></Circle>
              <p>Групповые</p>
            </FlexContainer>
          </TypeInfo>
          <ButtonsWrapper>
            <Link
              className={classnames({ 'flex active': pathname.includes('/products/cabinets/') })}
              to={`/products/cabinets/${productId}`}
            >
              Кабинеты
            </Link>
            <Link
              className={classnames({ 'flex active': pathname.includes('/products/employee/') })}
              to={`/products/employee/${productId}`}
            >
              Сотрудники
            </Link>
          </ButtonsWrapper>
        </FlexContainer>
      </CommonPageTitle>
    </Wrapper>
  );
});

export default inject('productsStore')(ProductTopbar);
