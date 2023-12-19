import { useState } from 'react';

import { inject } from 'mobx-react';
import { observer } from 'mobx-react';

import ManagementScheduleCabinet from './cabinet/ManagementScheduleCabinet';
import { Box, List, Wrapper } from './ManagementScheduleCabinets.styled';

import CabinetsStore, { ICabinet } from '../../../../../store/cabinetsStore';
import FilialStore from '../../../../../store/filialStore';
import ModalStore from '../../../../../store/modalStore';
import { INIT } from '../../../../../utils/state';

interface IProps {
  cabinetsStore?: CabinetsStore;
  filialStore?: FilialStore;
  modalStore?: ModalStore;
  onFetchSchedule: (cabinetId: string) => void;
}
const ManagementScheduleCabinets: React.FC<IProps> = observer(({ cabinetsStore, filialStore, modalStore, onFetchSchedule }) => {
  const { filials, activeFilial } = filialStore!;
  const { cabinets, activeCabinet, setActiveCabinet, fetch } = cabinetsStore!;
  const cabinetsState = cabinetsStore!.state;
  const filialsState = filialStore!.state;

  const [isAddingCabinet, setIsAddingCabinet] = useState<boolean>(false);
  const [formValid, setFormValid] = useState(false);

  const openModal = () => {
    modalStore!.openModal({
      name: 'CREATE_CABINET'
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
              <ManagementScheduleCabinet
                cabinet={cabinet}
                active={activeCabinet && activeCabinet.id === cabinet.id}
                onClick={() => setCabinet(cabinet)}
                key={`cabinet-${cabinet.id}`}
              />
            ))}
          {isAddingCabinet && <></>}
        </List>
      </Box>
    </Wrapper>
  );
});

export default inject('filialStore', 'cabinetsStore', 'modalStore')(ManagementScheduleCabinets);
