import { useTranslation } from 'react-i18next';

import { Box, ContentTable, IconWrap, Notifications, TableRow, TimeWrap, Title } from './TicketModal.styled';

import { DividerVertical, FlexContainer } from '../../../../../utils/styleUtils';
import { EIcons, Icon } from '../../../../icons';

interface IProps {
  closeModal?: () => void;
  modalPayload?: any;
}

const TicketModal: React.FC<IProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { modalPayload } = props;
  const { t } = useTranslation();

  const headList = ['Тип', 'Наименование', 'Комментарий', 'Дата'];

  return (
    <FlexContainer
      $column={true}
      $gap='40px'
    >
      <FlexContainer>
        <FlexContainer className='flex'>
          <IconWrap>
            <Icon name={EIcons.telebonticket} />,
            <Notifications>
              {/* // eslint-disable-next-line react/prop-types react/prop-types */}
              {modalPayload?.length}
            </Notifications>
          </IconWrap>
          <Title className='title'>{t('Тикет')}</Title>
        </FlexContainer>
        <DividerVertical $margin='0px' />
        <TimeWrap className='flex'>
          <span className='text'>
            {t('Среднее время реагирования')}
            <span className='time'>5:00</span>
          </span>
        </TimeWrap>
      </FlexContainer>
      <Box>
        <ContentTable>
          <TableRow className='head'>{headList && headList.map((head, i) => <div key={i}>{t(head)}</div>)}</TableRow>
          {modalPayload &&
            // eslint-disable-next-line react/prop-types
            modalPayload?.map((item: any, i: number) => (
              <TableRow key={i}>
                <div className='flex'>{item.name}</div>
                <div className='flex'>{item.title}</div>
                <div className='flex'>{item.comment}</div>
                <div className='flex'>{item.date}</div>
                <div className='flex'>
                  <button>{item.iconedit}</button>
                </div>
              </TableRow>
            ))}
        </ContentTable>
      </Box>
    </FlexContainer>
  );
};

export default TicketModal;
