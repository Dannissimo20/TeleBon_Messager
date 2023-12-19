import { FC, useState } from 'react';

import { inject, observer } from 'mobx-react';

import { InputContainerWrapper } from './InputContainer.styled';

import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import KanbanStore from '../../../../../store/kanbanStore';
import ModalStore from '../../../../../store/modalStore';
import InputCard from '../input-card/InputCard';

interface IProps {
  listId?: string;
  type: string;
  setLocalColumns: (arg: any) => void;
  modalStore?: ModalStore;
  kanbanStore?: KanbanStore;
}
const InputContainer: FC<IProps> = observer((props) => {
  const { listId, modalStore, kanbanStore, type, setLocalColumns } = props;
  const [open, setOpen] = useState(false);
  const { columns } = kanbanStore!;

  const createCategory = () => {
    modalStore!.openModal({ name: 'CREATE_KANBAN_TASK', payload: { columnId: listId, column: columns, setLocalColumns: setLocalColumns } });
  };

  return (
    <InputContainerWrapper>
      {open && (
        <div>
          <InputCard />
        </div>
      )}
      {!open && (
        <div>
          <div className='input-content'>
            <button onClick={createCategory}>
              <IconInstance name={EIcon.plussquare} />
            </button>
          </div>
        </div>
      )}
    </InputContainerWrapper>
  );
});

export default inject('modalStore', 'kanbanStore')(InputContainer);
