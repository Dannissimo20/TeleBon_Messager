import { inject } from 'mobx-react';
import { observer } from 'mobx-react';
import CabinetsStore, { ICabinet } from '../../../../store/cabinetsStore';
import FilialStore from '../../../../store/filialStore';
import ModalStore from '../../../../store/modalStore';
import { INIT, PENDING } from '../../../../utils/state';
import CommonButton from '../../../../components/shared/button/CommonButton';
import { ReactComponent as Plus } from '../../../../components/icons/plus.svg';
import ScheduleCabinet from './cabinet/ScheduleCabinet';
import { Box, List, Wrapper } from './ScheduleCabinets.styled';

interface IProps {
  cabinetsStore?: CabinetsStore;
  filialStore?: FilialStore;
  modalStore?: ModalStore;
  onFetchSchedule: (cabinetId: string) => void;
}
const ScheduleCabinets: React.FC<IProps> = observer(({ cabinetsStore, filialStore, modalStore, onFetchSchedule }) => {
  const { filials, activeFilial } = filialStore!;
  const { cabinets, activeCabinet, setActiveCabinet, fetch } = cabinetsStore!;
  const cabinetsState = cabinetsStore!.state;
  const filialsState = filialStore!.state;

  const openModal = () => {
    modalStore!.openModal({
      name: 'CREATE_CABINET',
      payload: {
        filial: activeFilial?.id
      }
    });
  };

  const setCabinet = (cabinet: ICabinet) => {
    setActiveCabinet(cabinet);
  };

  if (filials && filials[0] && cabinetsState === INIT) {
    fetch(filials[0].id);
  }

  return (
    <Wrapper>
      <Box>
        <List>
          {cabinets &&
            cabinets.length > 0 &&
            cabinets.map((cabinet: any) => (
              <ScheduleCabinet
                cabinet={cabinet}
                active={activeCabinet && activeCabinet.id === cabinet.id}
                onClick={() => setCabinet(cabinet)}
                key={`cabinet-${cabinet.id}`}
              />
            ))}
        </List>
      </Box>
      <Box>
        <CommonButton
          color={'mainLight'}
          onClick={openModal}
          disabled={filialsState === PENDING || cabinetsState === PENDING}
        >
          <Plus />
          <span>Добавить кабинет</span>
        </CommonButton>
      </Box>
    </Wrapper>
  );
});

export default inject('filialStore', 'cabinetsStore', 'modalStore')(ScheduleCabinets);
