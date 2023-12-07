import React, { FC } from 'react';

import { inject, observer } from 'mobx-react';

import MenagmentEmployeersTable from './table/MenagmentEmployeersTable';

import CommonNavMenu from '../../../../components/shared/nav/CommonNavMenu';
import { CommonPageTitle } from '../../../../components/shared/title/CommonPageTitle';
import FilialStore from '../../../../store/filialStore';
import ModalStore from '../../../../store/modalStore';
import UserStore from '../../../../store/userStore';
import { TopWrapper, Wrapper } from './MenagmentEmployeers.styled';
import { TopBar } from '../../service/categories/ServiceCategories.styled';
import { ButtonInner } from './table/MenagmentEmployeersTable.styled';
import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../components/shared/button/CommonButton';
import { FlexWithAlign } from '../../../../utils/styleUtils';

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
  const createEmployeer = () => {
    props.modalStore!.openModal({ name: 'CREATE_EMPLOYEE' });
  };
  return (
    <Wrapper>
      <TopWrapper>
        <TopBar
          $gap='45px'
          $column={true}
        >
          <FlexWithAlign
            $alignCenter='center'
            $justify='between'
          >
            <CommonPageTitle title='Управление' />
            <CommonButton
              typeBtn='ghost'
              onClick={createEmployeer}
            >
              <ButtonInner>
                <IconInstance name={EIcon.plussquare} />
                <span>Добавить сотрудника</span>
              </ButtonInner>
            </CommonButton>
          </FlexWithAlign>
          <CommonNavMenu list={managementMenu} />
        </TopBar>
      </TopWrapper>

      <MenagmentEmployeersTable />
    </Wrapper>
  );
});

export default inject('modalStore', 'userStore', 'sidebarStore', 'filialStore', 'rootStore')(ManagementEmployee);
