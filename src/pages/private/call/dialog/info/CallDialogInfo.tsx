
import { ReactComponent as CancelIcon } from '../../../../../components/icons/cancel.svg';
import { ReactComponent as EditIcon } from '../../../../../components/icons/pen.svg';
import { ReactComponent as PhoneIcon } from '../../../../../components/icons/phone.svg';
import { ReactComponent as PlusIcon } from '../../../../../components/icons/plus.svg';
import { IRecordCall } from '../../../../../store/callRecordsStore';
import { DividerGrey } from '../../../../../utils/styleUtils';
import {
  ButtonsWrap,
  CallBackButton, CancelButton,
  Content,
  ContentItem, EditButton, EmptyContent,
  Header,
  HeaderBottom,
  HeaderTop, RecordButton,
  Wrapper
} from './CallDialogInfo.styled';



interface IProps {
  data?: IRecordCall;
}

const CallDialogInfo: React.FC<IProps> = (props) => {
  const { data } = props;
  const mask = /(?:\+?)[78]+[0-9() -]{16,17}/;

  return (
    <Wrapper>
      {data ? (
        <>
          <Header $column={true}>
            <HeaderTop $gap='12px'>
              <span>Разговор завершен:</span>
              <span>{data.record.duration}</span>
            </HeaderTop>
            <HeaderBottom>
              <span>{data.phone.replace(mask, '')}</span>
              <span>Запись разговора</span>
            </HeaderBottom>
          </Header>
          <DividerGrey />
          <Content>
            <ContentItem>
              <span className='label'>Клиент:</span>
              <span className='value'>{data?.name || 'Без ФИО'}</span>
            </ContentItem>
            <ContentItem>
              <span className='label'>Цель разговора:</span>
              <span className='value'>Записать клиента на бесплатное пробное занятие</span>
            </ContentItem>
            <ContentItem>
              <span className='label'>Результат:</span>
              <span className='value'>Автоматически</span>
            </ContentItem>
            <ButtonsWrap>
              <CallBackButton>
                <span>
                  <PhoneIcon />
                </span>
                <span>Перезвонить</span>
              </CallBackButton>
              <EditButton>
                <span>
                  <EditIcon />
                </span>
                <span>Редактировать</span>
              </EditButton>
              <CancelButton typeBtn='danger'>
                <span>
                  <CancelIcon />
                </span>
                <span>Отказ</span>
              </CancelButton>
              <RecordButton typeBtn='success'>
                <span>
                  <PlusIcon />
                </span>
                <span>Запись</span>
              </RecordButton>
            </ButtonsWrap>
          </Content>
        </>
      ) : (
        <>
          <EmptyContent>Запись не выбрана</EmptyContent>
        </>
      )}
    </Wrapper>
  );
};

export default CallDialogInfo;
