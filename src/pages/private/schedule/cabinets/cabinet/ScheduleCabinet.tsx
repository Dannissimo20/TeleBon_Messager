import { inject, observer } from 'mobx-react';
import { ICabinet } from '../../../../../store/cabinetsStore';
import ModalStore from '../../../../../store/modalStore';
import { ReactComponent as IconPen } from '../../../../../components/icons/pen.svg';
import { ReactComponent as IconDelete } from '../../../../../components/icons/delete.svg';
import { Item } from './ScheduleCabinet.styled';

interface IProps {
  modalStore?: ModalStore;
  cabinet: ICabinet;
  onClick: (cabinetId: ICabinet) => void;
  active?: boolean;
}

const ScheduleCabinet: React.FC<IProps> = observer(({ onClick, cabinet, active, modalStore }) => {
  const handleEdit = (e: any) => {
    e.stopPropagation();
    modalStore?.openModal({ name: 'EDIT_CABINET', payload: cabinet });
  };

  const deleteCabinet = () => {
    modalStore?.openModal({
      name: 'CONFIRM_DELETE',
      payload: cabinet,
      isDanger: true,
      actionName: 'CABINET',
      classModal: 'danger'
    });
  };

  return (
    <Item
      onClick={() => onClick(cabinet)}
      className={active ? 'active' : ''}
    >
      {cabinet.name}
      <IconPen onClick={(e) => handleEdit(e)} />
      <IconDelete onClick={() => deleteCabinet()} />
    </Item>
  );
});

export default inject('modalStore')(ScheduleCabinet);
