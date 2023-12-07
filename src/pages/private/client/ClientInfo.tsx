import { inject, observer } from 'mobx-react';

import { ReactComponent as ClockIcon } from '../../../components/icons/clock.svg';
import { ReactComponent as PenIcon } from '../../../components/icons/pen.svg';
import CommonButton from '../../../components/shared/button/CommonButton';
import ProgrerssBar from '../../../components/shared/progress-bar/ProgrerssBar';
import { IClient } from '../../../store/clientsStore';
import ModalStore from '../../../store/modalStore';
import {
  ButtonContent,
  Colored,
  Container,
  Content,
  ControlBox,
  Head,
  HeadItem,
  InfoItem,
  InfoValue,
  Subtitle,
  Title,
  Wrapper
} from './ClientInfo.styled';

interface IProps {
  data?: IClient;
  modalStore?: ModalStore;
}

const ClientInfo: React.FC<IProps> = observer((props) => {
  const { data } = props;
  const mask = /(?:\+?)[78]+[0-9() -]{16,17}/;
  const editClient = () => {
    props.modalStore!.openModal({ name: 'EDIT_CLIENT', payload: data });
  };

  return (
    <Container>
      <HeadItem>Информация о клиенте</HeadItem>
      <Wrapper>
        {data ? (
          <>
            <Head>
              <Title>{data.name || 'No name'}</Title>
              <Subtitle>
                {data.phone.replace(mask, '') || 'No phone'}, {data.filial || 'No filial'}
              </Subtitle>
            </Head>
            <Content>
              <InfoItem>
                Источник: <InfoValue>-</InfoValue>
              </InfoItem>
              <InfoItem>
                Продукт: <InfoValue>-</InfoValue>
              </InfoItem>
              <InfoItem>
                Действия: <InfoValue>Поставить в список 15.06.2023</InfoValue>
              </InfoItem>
              <ControlBox>
                <CommonButton fullWidth={true}>
                  Статус: <Colored>Первичное</Colored>
                </CommonButton>
                <CommonButton fullWidth={true}>
                  <ButtonContent>
                    <ClockIcon />
                    <span>История клиента</span>
                  </ButtonContent>
                </CommonButton>
                <ProgrerssBar
                  title={'Лояльность'}
                  value={100}
                />
                <ProgrerssBar
                  title={'Документы'}
                  value={80}
                />
                <CommonButton
                  fullWidth={true}
                  onClick={editClient}
                >
                  <ButtonContent>
                    <PenIcon />
                    <span>Редактировать</span>
                  </ButtonContent>
                </CommonButton>
              </ControlBox>
            </Content>
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    </Container>
  );
});

export default inject('modalStore')(ClientInfo);
