import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { TopWrapper, Wrapper } from './MenagmentEmployeers.styled';
import MenagmentEmployeersTable from './table/MenagmentEmployeersTable';
import { ButtonInner } from './table/MenagmentEmployeersTable.styled';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../components/shared/button/CommonButton';
import CommonNavMenu from '../../../../components/shared/nav/CommonNavMenu';
import { CommonPageTitle } from '../../../../components/shared/title/CommonPageTitle';
import FilialStore from '../../../../store/filialStore';
import ModalStore from '../../../../store/modalStore';
import UserStore from '../../../../store/userStore';

const managementMenu = [
  {
    title: 'Услуги',
    to: '/management/service-categories'
  },
  {
    title: 'Ресурсы',
    to: '/management/schedule'
  },
  {
    title: 'Сотрудники',
    to: '/management/employee'
  }
];

interface IProps {
  filialStore?: FilialStore;
  userStore?: UserStore;
  modalStore?: ModalStore;
}

const ManagementEmployee: FC<IProps> = observer((props) => {
  const { t } = useTranslation();
  const createEmployeer = () => {
    props.modalStore!.openModal({ name: 'CREATE_EMPLOYEE' });
  };

  return (
    <Wrapper>
      <TopWrapper>
        <CommonPageTitle title={'Компания'}>
          <CommonButton
            typeBtn='ghost'
            onClick={createEmployeer}
          >
            <ButtonInner>
              <IconInstance name={EIcon.plussquare} />
              <span>{t('Добавить сотрудника')}</span>
            </ButtonInner>
          </CommonButton>
        </CommonPageTitle>
        <CommonNavMenu list={managementMenu} />
      </TopWrapper>

      <MenagmentEmployeersTable />
    </Wrapper>
  );
});

export default inject('modalStore', 'userStore', 'sidebarStore', 'filialStore', 'rootStore')(ManagementEmployee);
