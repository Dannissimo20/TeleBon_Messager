import { FC, useState } from 'react';

import NewKanban from './blocks/Kanban';
import TaskBookTopbar from './taskbook-topbar/TaskBookTopbar';

import { FlexContainer } from '../../../utils/styleUtils';

const TaskBook: FC = () => {
  const [localColumns, setLocalColumns] = useState([] as any[]);

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
