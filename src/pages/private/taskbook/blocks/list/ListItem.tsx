import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { ListItemWrapper } from './ListItem.styled';

import { IColumn } from '../../../../../store/kanbanStore';
import Card from '../card/Card';
import Title from '../title/Title';

interface IProps {
  list: any;
  setLocalColumns: (arg: any) => void;
  localColumns: IColumn[];
  index: number;
}

const ListItem: FC<IProps> = ({ list, localColumns, index, setLocalColumns }) => {
  return (
    <div>
      <ListItemWrapper>
        <div className='title-list'>
          <Title
            setLocalColumns={setLocalColumns}
            title={list.name}
            listId={list.id}
            index={index}
          />
        </div>
        <div className='container-cards'>
          <Droppable
            droppableId={list.id}
            type='task'
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='card-container'
              >
                {list.task !== null &&
                  list.task
                    .slice()
                    .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
                    .map((card: any, index: number) => (
                      <Card
                        key={card.id}
                        setLocalColumns={setLocalColumns}
                        localColumns={localColumns}
                        card={card}
                        index={index}
                        listId={list.id}
                      />
                    ))}
              </div>
            )}
          </Droppable>
        </div>
      </ListItemWrapper>
    </div>
  );
};

export default ListItem;
