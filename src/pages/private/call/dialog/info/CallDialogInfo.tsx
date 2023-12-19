import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ButtonsWrap,
  CallBackButton,
  CancelButton,
  Content,
  ContentItem,
  EditButton,
  EmptyContent,
  Header,
  HeaderBottom,
  HeaderTop,
  RecordButton,
  Wrapper
} from './CallDialogInfo.styled';

import { ReactComponent as CancelIcon } from '../../../../../components/icons/cancel.svg';
import { ReactComponent as EditIcon } from '../../../../../components/icons/pen.svg';
import { ReactComponent as PhoneIcon } from '../../../../../components/icons/phone.svg';
import { ReactComponent as PlusIcon } from '../../../../../components/icons/plus.svg';
import { IRecordCall } from '../../../../../store/callRecordsStore';
import { DividerGrey } from '../../../../../utils/styleUtils';

interface IProps {
  data?: IRecordCall;
}

const CallDialogInfo: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { data } = props;
  const mask = /(?:\+?)[78]+[0-9() -]{16,17}/;

  return (
    <Wrapper>
      {data ? (
        <>
          <Header $column={true}>
            <HeaderTop $gap='12px'>
              <span>{t('Разговор завершен')}:</span>
              <span>{data.record.duration}</span>
            </HeaderTop>
            <HeaderBottom>
              <span>{data.phone.replace(mask, '')}</span>
              <span>{t('Запись разговора')}</span>
            </HeaderBottom>
          </Header>
          <DividerGrey />
          <Content>
            <ContentItem>
              <span className='label'>{t('Клиент')}:</span>
              <span className='value'>{data?.name || 'Без ФИО'}</span>
            </ContentItem>
            <ContentItem>
              <span className='label'>{t('Цель разговора')}:</span>
              <span className='value'>{t('Записать клиента на бесплатное пробное занятие')}</span>
            </ContentItem>
            <ContentItem>
              <span className='label'>{t('Результат')}:</span>
              <span className='value'>{t('Автоматически')}</span>
            </ContentItem>
            <ButtonsWrap>
              <CallBackButton>
                <span>
                  <PhoneIcon />
                </span>
                <span>{t('Перезвонить')}</span>
              </CallBackButton>
              <EditButton>
                <span>
                  <EditIcon />
                </span>
                <span>{t('Редактировать')}</span>
              </EditButton>
              <CancelButton typeBtn='danger'>
                <span>
                  <CancelIcon />
                </span>
                <span>{t('Отказ')}</span>
              </CancelButton>
              <RecordButton typeBtn='success'>
                <span>
                  <PlusIcon />
                </span>
                <span>{t('Запись')}</span>
              </RecordButton>
            </ButtonsWrap>
          </Content>
        </>
      ) : (
        <>
          <EmptyContent>{t('Запись не выбрана')}</EmptyContent>
        </>
      )}
    </Wrapper>
  );
};

export default CallDialogInfo;
