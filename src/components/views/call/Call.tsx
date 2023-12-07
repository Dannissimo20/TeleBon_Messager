import { Outlet } from 'react-router-dom';

import CommonButton from '../../shared/button/CommonButton';
import CommonNavMenu from '../../shared/nav/CommonNavMenu';
import { EIcons, Icon } from '../../icons';
import { ReactComponent as PlayIcon } from '../../icons/play.svg';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import { ControlBtns, NavMenuWrapper, PageContent, PageHeader, Title, Wrapper } from './Call.styled';

const callMenu = [
  {
    title: 'Диалог',
    to: '/call/dialog'
  },
  {
    title: 'Наш продукт',
    to: '/call/product'
  }
];

export function Call() {
  return (
    <Wrapper
      $column={true}
      $gap={'40px'}
    >
      <PageHeader>
        <Title>
          <Icon name={EIcons.call} />
          <h2 className={'title'}>Вызов</h2>
        </Title>
        <ControlBtns>
          <CommonButton>
            <PlayIcon />
            <span>Подключить список</span>
          </CommonButton>
          <CommonButton
            typeBtn='success'
          >
            <PlusIcon />
            <span>Запустить список</span>
          </CommonButton>
        </ControlBtns>
      </PageHeader>
      <PageContent
        $gap='40px'
        $column={true}
      >
        <NavMenuWrapper>
          <CommonNavMenu list={callMenu} />
        </NavMenuWrapper>
        <Outlet />
      </PageContent>
    </Wrapper>
  );
}
