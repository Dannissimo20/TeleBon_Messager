import { useParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import classnames from 'classnames';
import dayjs from 'dayjs';
import { inject } from 'mobx-react';

import { ReactComponent as LineIcon } from '../../icons/line.svg';
import { ReactComponent as ManIcon } from '../../icons/man.svg';

import ModalStore from '../../../store/modalStore';

import 'react-tooltip/dist/react-tooltip.css';
import { PropsWithChildren } from 'react';
import { Appointments, Box, Container, Divider, InnerContainer, ManWrap, TooltipsContainer, Value } from './HourSlot.styled';

interface IMan extends PropsWithChildren {
  color: string;
  margin: number;
  inverted?: boolean;
  [key: string]: any;
}
const Man: React.FC<IMan> = ({ color, margin, inverted, ...rest }) => {
  return (
    <ManWrap
      $color={color}
      $margin={`${margin}px`}
      $inverted={inverted}
      {...rest}
    >
      <ManIcon />
    </ManWrap>
  );
};

interface IProps {
  modalStore?: ModalStore;
  info: any;
  cabinetId: string;
  filialId: string;
  choosenDate: string;
}

const HourSlot: React.FC<IProps> = ({ modalStore, info, cabinetId, filialId, choosenDate }) => {
  const slotsOccupied = info.slots ? info.slots.length : 0;
  const slotsAvailable = Number(info.maxSlots) - slotsOccupied;
  const occupiedArr = info.slots || [];
  const availableArr = new Array(slotsAvailable >= 0 ? slotsAvailable : 0).fill(1);

  const { productId } = useParams();

  const openModal = () => {
    modalStore!.openModal({
      name: 'APPOINTMENT_MODAL',
      payload: {
        cabinetId,
        time: `${dayjs(choosenDate).format('YYYY-MM-DD')} ${info.hour}:00`,
        date: dayjs(choosenDate).format('YYYY-MM-DD'),
        filialId: filialId,
        productId
      }
    });
  };

  return (
    <Container>
      <InnerContainer
        className={classnames({
          disabled: !info.available
        })}
      >
        {info.available && (
          <>
            <Box>
              <Value>
                <LineIcon />
                {slotsOccupied}
                {/* <Label>Занято</Label> */}
              </Value>
              <Appointments>
                {occupiedArr.map((item: any, index: any) => (
                  <Man
                    color={'mainLight'}
                    margin={14 * index}
                    key={index}
                    data-tooltip-id={`tooltip-${item.id}`}
                    data-tooltip-variant='light'
                  ></Man>
                ))}
              </Appointments>
            </Box>
            <Divider />
            <Box>
              <Appointments className={'inverted'}>
                {availableArr.map((item, index) => (
                  <div
                    onClick={openModal}
                    key={index}
                  >
                    <Man
                      color={'success'}
                      margin={14 * index}
                      inverted={true}
                    />
                  </div>
                ))}
              </Appointments>
              <Value>
                <LineIcon />
                {slotsAvailable}
              </Value>
            </Box>
          </>
        )}
      </InnerContainer>
      <TooltipsContainer>
        {occupiedArr.map((item: any, i: number) => (
          <Tooltip
            key={item?.id + i}
            id={`tooltip-${item.id}`}
            className={'tooltip'}
          >
            <div>{item.client.fio}</div>
          </Tooltip>
        ))}
      </TooltipsContainer>
    </Container>
  );
};

export default inject('modalStore')(HourSlot);
