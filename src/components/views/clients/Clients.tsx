import React, { useState } from 'react';

import { inject, observer } from 'mobx-react';

import { Box, NavMenuWrapper, PageHeader, Wrapper } from './Clients.styled';

import { EIcon, IconNew as IconInstance } from '../../../components/icons/medium-new-icons/icon';
import ClientsList from '../../../pages/private/client/client-list/ClientsList';
import ClientsStore, { IClient } from '../../../store/clientsStore';
import ModalStore from '../../../store/modalStore';
import { FlexContainer, PageTitle } from '../../../utils/styleUtils';
import CommonButton from '../../shared/button/CommonButton';
import CommonNavMenu from '../../shared/nav/CommonNavMenu';

interface IProps {
  clientsStore?: ClientsStore;
  modalStore?: ModalStore;
}

const clientsMenu = [
  {
    title: 'База клиентов',
    to: '/clients'
  }
];
const Clients: React.FC<IProps> = observer((props) => {
  const [client, setCLient] = useState<IClient | undefined>(undefined);
  const createClient = () => {
    props.modalStore!.openModal({ name: 'CREATE_CLIENT' });
  };

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>Клиенты</PageTitle>
        <Box>
          <CommonButton
            typeBtn='ghost'
            onClick={createClient}
          >
            <FlexContainer
              $gap='16px'
              $alignCenter='center'
            >
              <IconInstance name={EIcon.plussquare} />
              <span>Добавить клиента</span>
            </FlexContainer>
          </CommonButton>
        </Box>
      </PageHeader>
      <NavMenuWrapper>
        <CommonNavMenu list={clientsMenu} />
      </NavMenuWrapper>
      <div>
        <ClientsList clickClient={(c: any) => setCLient(c)} />
      </div>
    </Wrapper>
  );
});

export default inject('clientsStore', 'modalStore')(Clients);
