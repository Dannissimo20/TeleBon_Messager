import { FC, useState } from 'react';
import TaskBookTopbar from './taskbook-topbar/TaskBookTopbar';
import { FlexContainer } from '../../../utils/styleUtils';
import NewKanban from './blocks/Kanban';

const TaskBook: FC = () => {
  const [localColumns, setLocalColumns] = useState([] as any[]); // Начальное состояние - пустой массив

  return (
    <FlexContainer
      $column
      $gap='0px'
    >
      <TaskBookTopbar
        localColumns={localColumns}
        setLocalColumns={setLocalColumns}
      />
      <NewKanban
        localColumns={localColumns}
        setLocalColumns={setLocalColumns}
      />
    </FlexContainer>
  );
};

export default TaskBook;
