import { FC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TextareaAutosize from 'react-textarea-autosize';
import { CardContent } from './Card.styled';
import { IColumn, ITask } from '../../../../../store/kanbanStore';
import { inject, observer } from 'mobx-react';
import ModalStore from '../../../../../store/modalStore';
import { FlexWithAlign } from '../../../../../utils/styleUtils';
import UserStore from '../../../../../store/userStore';
import Cookies from 'js-cookie';
import classnames from 'classnames';
import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import { useTranslation } from 'react-i18next';
interface IProps {
  card: ITask;
  listId: string;
  index: number;
  localColumns: IColumn[];
  setLocalColumns: (arg: any) => void;
  modalStore?: ModalStore;
  userStore?: UserStore;
}

const Card: FC<IProps> = observer((props) => {
  const { card, listId, index, userStore, localColumns, modalStore, setLocalColumns } = props;
  const { user } = userStore!;

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [newTitle, setNewTitle] = useState(card.content);

  const filteredEmployee = user && user?.find(item => item.id === card.employeetaskid)

  const handleOnBlur = (cardId: any) => {
    setOpen(!open);
  };

  const deleteTask = (info: string) => {
    modalStore?.openModal({
      name: 'CONFIRM_DELETE',
      payload: { id: info, setLocalColumns: setLocalColumns, titleColumn: card.content },
      isDanger: true,
      actionName: 'KANBAN_TASK',
      classModal: 'danger'
    });
  };

  const createCategory = () => {
    modalStore!.openModal({
      name: 'CREATE_KANBAN_TASK',
      payload: {
        id: card.id,
        employeetaskid: card.employeetaskid,
        ownertaskid: card.ownertaskid,
        content: card.content,
        order: card.order,
        columnId: listId,
        column: card.content,
        setLocalColumns: setLocalColumns
      }
    });
  };

  return (
    <>
      {card ? (
        <Draggable
          draggableId={card.id || ''}
          index={index}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <CardContent>
                {open ? (
                  <TextareaAutosize
                    className='input-card-title'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onBlur={handleOnBlur}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleOnBlur(card.id);
                      }
                      return;
                    }}
                    autoFocus
                  />
                ) : (
                  <div
                    onClick={createCategory}
                    className='card-title-container'
                  >
                    <FlexWithAlign $justify={'between'}>
                      <div className={'content'}>
                        <p>{card.content}</p>
                      </div>
                      <button
                        className={'options'}
                        onClick={(e: any) => {
                          e.stopPropagation();
                          setOpenOptions(!openOptions);
                        }}
                      >
                        <IconInstance name={EIcon.moreverticaloutline} />
                      </button>
                      {openOptions && (
                        <ul className='menu-card'>
                          <li
                            onClick={(e: any) => {
                              e.stopPropagation();
                              setOpenOptions(!openOptions);
                              setOpen(!open);
                            }}
                          >
                            {t('Архивировать')}
                          </li>
                          <li
                            onClick={(e: any) => {
                              e.stopPropagation();
                              deleteTask(card.id || '');
                              setOpenOptions(!openOptions);
                              setOpen(!open);
                            }}
                          >
                            {t('Удалить')}
                          </li>
                        </ul>
                      )}
                    </FlexWithAlign>

                    <div className={'tag'}>
                      {user
                        ?.filter((item) => item.id === Cookies.get('id'))
                        .map((filteredUser) => (
                          <span
                            className={classnames(filteredUser.id === card.employeetaskid ? 'blue' : 'purple')}
                            key={filteredUser.id}
                          >
                            {filteredUser.id === card.employeetaskid ? 'Мой' : filteredEmployee?.fio}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </div>
          )}
        </Draggable>
      ) : null}
    </>
  );
});

export default inject('modalStore', 'userStore')(Card);
