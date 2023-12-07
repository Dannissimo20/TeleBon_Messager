import { FC, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import { ReactComponent as PlusIcon } from '../../../../components/icons/plus.svg';
import BranchSelectionButton from '../../../../components/shared/button/branch-selected-button/BranchSelectionButton';
import CommonNavMenu from '../../../../components/shared/nav/CommonNavMenu';
import FilialStore from '../../../../store/filialStore';
import ProductsStore from '../../../../store/productsStore';
import { NavMenuWrapper, Title, Topbar, TopBtnWrapper, TopWrapper, Wrapper } from './ManagementProduct.styled';
import { PENDING } from '../../../../utils/state';
import CommonButton from '../../../../components/shared/button/CommonButton';

const managementMenu = [
  {
    title: 'Расписание',
    to: '/management/schedule'
  },
  {
    title: 'Продукт',
    to: '/management/product'
  },
  {
    title: 'Филиал',
    to: '/management/branch'
  },
  {
    title: 'Сотрудники',
    to: '/management/employee'
  }
];

interface IProps {
  filialStore?: FilialStore;
  productsStore?: ProductsStore;
}

const ManagementProduct: FC<IProps> = observer((props) => {
  const location = useLocation();
  const regexp = /add|edit/;

  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true);
  useEffect(() => {
    if (regexp.test(location.pathname)) {
      setIsActiveBtn(false);
    } else {
      setIsActiveBtn(true);
    }
  }, [location.pathname]);

  return (
    <Wrapper>
      <TopWrapper>
        <Topbar>
          <Title className={'flex'}>
            <h2 className={'title'}>Управление</h2>
          </Title>
          <TopBtnWrapper>
            <BranchSelectionButton />
            <Link
              to={'/management/product/add'}
              className={isActiveBtn ? 'createProduct' : 'createProduct disabled'}
            >
              <PlusIcon />
              <span>Новый продукт</span>
            </Link>
          </TopBtnWrapper>
        </Topbar>
        <NavMenuWrapper>
          <CommonNavMenu list={managementMenu} />
        </NavMenuWrapper>
      </TopWrapper>

      <Outlet />
    </Wrapper>
  );
});

export default inject('productsStore')(ManagementProduct);
