import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { Box, NavMenuWrapper, PageHeader, Wrapper } from './Clients.styled';

import { EIcon, IconNew as IconInstance } from '../../../components/icons/medium-new-icons/icon';
import ClientsList from '../../../pages/private/client/client-list/ClientsList';
import ClientsStore, { IClient } from '../../../store/clientsStore';
import ModalStore from '../../../store/modalStore';
import { FlexWithAlign } from '../../../utils/styleUtils';
import CommonButton from '../../shared/button/CommonButton';
import CommonNavMenu from '../../shared/nav/CommonNavMenu';
import { CommonPageTitle } from '../../shared/title/CommonPageTitle';

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
  const { t } = useTranslation();
  const [client, setCLient] = useState<IClient | undefined>(undefined);
  const createClient = () => {
    props.modalStore!.openModal({ name: 'CREATE_CLIENT' });
  };

  return (
    <Wrapper>
      <PageHeader>
        <CommonPageTitle title={'Клиенты'}>
          <Box>
            <CommonButton
              typeBtn='ghost'
              onClick={createClient}
            >
              <FlexWithAlign
                $gap='16px'
                $alignCenter='center'
              >
                <IconInstance name={EIcon.plussquare} />
                <span>{t('Добавить клиента')}</span>
              </FlexWithAlign>
            </CommonButton>
          </Box>
        </CommonPageTitle>
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
