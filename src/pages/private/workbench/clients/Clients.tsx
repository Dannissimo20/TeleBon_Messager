import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import {
  CalendarContent,
  WorkbenchContainer,
  WorkbenchSubText,
  WorkbenchSubTitle,
  WorkbenchText
} from '../../../../components/views/workbench/Workbench.styled';
import ClientsStore from '../../../../store/clientsStore';
import { FlexContainer } from '../../../../utils/styleUtils';

interface IProps {
  clientsStore?: ClientsStore;
}

const Clients: FC<IProps> = observer((props) => {
  const { clientsStore } = props;
  const { clients, fetchClients } = clientsStore!;
  const { t } = useTranslation();

  const fetchClientsInfo = async () => {
    await fetchClients();
  };

  useEffect(() => {
    fetchClientsInfo();
  }, []);

  return (
    <WorkbenchContainer>
      <WorkbenchSubTitle>
        {t('Новые клиенты')}
        <Link to={'/clients'}>
          <IconInstance name={EIcon.arrowleft} />
        </Link>
      </WorkbenchSubTitle>
      <FlexContainer
        $gap={'12px'}
        $column
      >
        {clients &&
          (clients.length !== 0 ? (
            clients
              .map((item) => (
                <CalendarContent
                  key={item.id}
                  className={'clients'}
                >
                  <FlexContainer
                    $column
                    $gap={'0'}
                  >
                    <WorkbenchText>{item.name}</WorkbenchText>
                    <WorkbenchSubText>{item.phone}</WorkbenchSubText>
                  </FlexContainer>
                  <span>{t('Новый')}</span>
                </CalendarContent>
              ))
              .reverse()
              .slice(0, 2)
          ) : (
            <WorkbenchText>{t('Клиентов нет')}!</WorkbenchText>
          ))}
      </FlexContainer>
    </WorkbenchContainer>
  );
});

export default inject('clientsStore')(Clients);
