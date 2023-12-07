import React, { FC } from 'react';
import { EventWrapper } from './styles/Recording.styled';
import classnames from 'classnames';
import { FlexContainer, FlexWithAlign } from '../../../utils/styleUtils';
import { inject } from 'mobx-react';
import SubproductsStore from '../../../store/subProductsStore';
import ClientsStore from '../../../store/clientsStore';
import { EIcon, IconNew as IconInstance } from '../../../components/icons/medium-new-icons/icon';

interface IEventContentProps {
  event: any;
  seatsLength: any;
  subproductsStore?: SubproductsStore;
  clientsStore?: ClientsStore;
  userStore?: any;
  renamedResources?: any;
  type?: any;
}
const RecordingEvent: FC<IEventContentProps> = ({
  userStore,
  type,
  renamedResources,
  event,
  seatsLength,
  subproductsStore,
  clientsStore
}) => {
  const { subproducts } = subproductsStore!;
  const { clients } = clientsStore!;
  const { user } = userStore!;
  const filteredGroup = subproducts.find((item) => item.id === event._def.extendedProps.subproductId);

  return (
    <EventWrapper
      className={classnames(
        event._def.extendedProps?.ClientId?.length === 1 && filteredGroup?.group === 'no' ? 'single' : 'group',
        event._def.extendedProps?.ClientId === null && 'disabled',
        (renamedResources.length > 4 || type === 'resourceTimeGridWeek') && 'hiddenInfo'
      )}
    >
      {type === 'resourceTimeGridWeek' || renamedResources.length > 4 ? null : (
        <FlexContainer className='heading'>
          <FlexContainer
            $gap='4px'
            className='fc-title'
          >
            <p>
              {event.start &&
                new Date(event.start).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false
                })}
            </p>
            -
            <p>
              {event.end &&
                new Date(event.end).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false
                })}{' '}
              ч.
            </p>
          </FlexContainer>
          <div>
            <div>{subproducts.find((item) => item.id === event._def.extendedProps?.subproductId)?.name}</div>
          </div>
        </FlexContainer>
      )}
      <FlexContainer className='content'>
        {event._def.extendedProps?.ClientId === null ? (
          <FlexContainer
            $column
            $gap='0'
          >
            <h3>{event._def.extendedProps?.comments}</h3>
            <p>{user?.find((item: { id: string }) => item.id === event._def.extendedProps?.employedid)?.fio}</p>
          </FlexContainer>
        ) : event._def.extendedProps?.ClientId?.length === 1 && filteredGroup?.group === 'no' ? (
          clients.map((client) =>
            event._def.extendedProps?.ClientId && event._def.extendedProps?.ClientId[0].idclient === client.id ? (
              <FlexContainer
                key={client.id}
                $column
                $gap='0'
              >
                <p>{client.name}</p> <p style={{ fontWeight: '400' }}>{client.phone}</p>
              </FlexContainer>
            ) : null
          )
        ) : (
          <FlexContainer
            $column
            $gap='0'
            className='fullwidth'
          >
            <FlexWithAlign
              $alignCenter='center'
              $justify='between'
            >
              {renamedResources.length > 4 || type === 'resourceTimeGridWeek' ? (
                <p>
                  {event._def.extendedProps?.ClientId?.length} из {event._def.extendedProps?.seats} уч
                </p>
              ) : (
                <p>Групповая запись</p>
              )}
              <IconInstance name={EIcon.users} />
            </FlexWithAlign>
            {renamedResources.length > 4 || type === 'resourceTimeGridWeek' ? null : (
              <p>
                {event._def.extendedProps?.ClientId?.length} из {event._def.extendedProps?.seats} уч
              </p>
            )}
          </FlexContainer>
        )}
      </FlexContainer>
    </EventWrapper>
  );
};

export default inject(
  'calendarStore',
  'recordingStore',
  'productsStore',
  'clientsStore',
  'userStore',
  'subproductsStore',
  'productsStore',
  'filialStore',
  'cabinetsStore',
  'lessonsStore',
  'modalStore'
)(RecordingEvent);
