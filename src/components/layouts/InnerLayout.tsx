import { PropsWithChildren, useEffect } from 'react';

import { inject, observer } from 'mobx-react';

import CommonHeader from './header/common-header/CommonHeader';
import { Container, Content, MainContent, Wrapper } from './innerLayout.styled';
import Sidebar from './sidebar/Sidebar';

import ErrorBoundary from '../../pages/public/error/ErrorBoundary';
import FilialStore from '../../store/filialStore';
import ProductsStore from '../../store/productsStore';

interface IProps extends PropsWithChildren {
  children?: React.ReactNode;
  filialStore?: FilialStore;
  productsStore?: ProductsStore;

  toggleTheme: (name: 'dark' | 'default') => void;
  currentTheme: string;
}

const InnerLayout: React.FC<IProps> = observer((props: IProps) => {
  const { children, filialStore, productsStore, toggleTheme, currentTheme } = props;

  useEffect(() => {
    filialStore?.fetch();
    productsStore?.fetchProducts();
  }, []);

  return (
    <Container>
      <ErrorBoundary>
        <Sidebar
          toggleTheme={toggleTheme}
          currentTheme={currentTheme}
        />
        <MainContent>
          <CommonHeader />
          <Wrapper>
            <Content>{children}</Content>
          </Wrapper>
        </MainContent>
      </ErrorBoundary>
    </Container>
  );
});

export default inject('filialStore', 'productsStore')(InnerLayout);
