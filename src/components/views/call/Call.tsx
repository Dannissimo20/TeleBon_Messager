import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { ControlBtns, NavMenuWrapper, PageContent, PageHeader, Title, Wrapper } from './Call.styled';

import { EIcons, Icon } from '../../icons';
import { ReactComponent as PlayIcon } from '../../icons/play.svg';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import CommonButton from '../../shared/button/CommonButton';
import CommonNavMenu from '../../shared/nav/CommonNavMenu';

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
  const { t } = useTranslation();

  return (
    <Wrapper
      $column={true}
      $gap={'40px'}
    >
      <PageHeader>
        <Title>
          <Icon name={EIcons.call} />
          <h2 className={'title'}>{t('Вызов')}</h2>
        </Title>
        <ControlBtns>
          <CommonButton>
            <PlayIcon />
            <span>{t('Подключить список')}</span>
          </CommonButton>
          <CommonButton typeBtn='success'>
            <PlusIcon />
            <span>{t('Запустить список')}</span>
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
