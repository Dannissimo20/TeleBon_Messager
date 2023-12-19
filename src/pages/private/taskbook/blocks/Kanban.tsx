import { FC, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { inject } from 'mobx-react';

import { NewWrapper } from './Kanban.styled';
import ListItem from './list/ListItem';

import KanbanStore, { IColumn } from '../../../../store/kanbanStore';
import UserStore from '../../../../store/userStore';
import { apiPost } from '../../../../utils/apiInstance';

interface IProps {
  kanbanStore?: KanbanStore;
  setLocalColumns: (arg: any) => void;
  localColumns: IColumn[];
  userStore?: UserStore;
}

const Kanban: FC<IProps> = ({ kanbanStore, userStore, localColumns, setLocalColumns }) => {
  const { fetchColumns, columns } = kanbanStore!;
  const { fetchUsers } = userStore!;
  const fetchUsersInfo = async () => {
    await fetchUsers();
  };
  useEffect(() => {
    fetchUsersInfo();
  }, []);
  const fetchData = async () => {
    await fetchColumns();
    setLocalColumns(columns);
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchColumns();
      setLocalColumns(() => [...columns]);
    };

    fetchData();
  }, [fetchColumns, columns?.length]);

  useEffect(() => {
    setLocalColumns(() => [...columns]);
  }, [columns]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'list') {
      return;
    }

    const updatedColumns = [...localColumns];
    const sourceList = updatedColumns.find((list) => list.id === source.droppableId);
    const destinationList = updatedColumns.find((list) => list.id === destination.droppableId);

    const draggingTask = sourceList && sourceList.task ? sourceList.task.find((task) => task.id === draggableId) : undefined;

    if (draggingTask) {
      if (source.droppableId === destination.droppableId) {
        sourceList!.task =
          sourceList && sourceList.task
            ? sourceList!.task.map((task) => {
                if (task.id === draggableId) {
                  return { ...task, order: destination.index + 1 };
                } else if (task.order > source.index + 1 && task.order <= destination.index + 1) {
                  return { ...task, order: task.order - 1 };
                } else if (task.order < source.index + 1 && task.order >= destination.index + 1) {
                  return { ...task, order: task.order + 1 };
                }

                return task;
              })
            : undefined;
      } else {
        sourceList!.task = sourceList && sourceList.task ? sourceList!.task.filter((task) => task.id !== draggableId) : undefined;
        destinationList &&
          destinationList.task &&
          destinationList.task.splice(destination.index, 0, {
            ...draggingTask,
            order: destination.index + 1
          });

        destinationList!.task =
          destinationList &&
          destinationList.task &&
          destinationList.task.map((task) => {
            if (task.order >= destination.index + 1) {
              return { ...task, order: task.order + 1 };
            }

            return task;
          });
      }

      setLocalColumns(updatedColumns);

      try {
        await sendChangesToServer(draggableId, source.droppableId, destination.droppableId, destination.index + 1);

        if (destinationList && destinationList.id && destinationList.task) {
          for (const task of destinationList.task) {
            if (task && task.id && task.id !== draggableId && destinationList.id) {
              await sendChangesToServer(task.id, destinationList.id, destinationList.id, task.order);
            }
          }
        }
      } catch (error) {
        console.error('Ошибка при обновлении задач:', error);
      }

      await fetchData();
    }
  };

  const sendChangesToServer = async (taskId: string, sourceListId: string, destinationListId: string, orderTask: number) => {
    await apiPost(`/tasker/task/${taskId}`, {
      columnid: destinationListId,
      order: orderTask
    });
  };

  return (
    <NewWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId='app'
          type='list'
          direction='horizontal'
        >
          {(provided) => (
            <div
              className='wrapperKanban'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {localColumns.map((list: any, index: number) => (
                <div key={list.id}>
                  <ListItem
                    index={index}
                    setLocalColumns={setLocalColumns}
                    localColumns={localColumns}
                    list={list}
                  />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </NewWrapper>
  );
};

export default inject('kanbanStore', 'userStore')(Kanban);
