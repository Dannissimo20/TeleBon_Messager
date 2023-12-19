import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { TitleWrapper } from './Title.styled';

import { useOutside } from '../../../../../components/hooks/useOutside';
import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../../components/shared/button/CommonButton';
import KanbanStore from '../../../../../store/kanbanStore';
import ModalStore from '../../../../../store/modalStore';
import { apiPost } from '../../../../../utils/apiInstance';
import { FlexWithAlign } from '../../../../../utils/styleUtils';
import InputContainer from '../input-container/InputContainer';

interface IProps {
  listId: string;
  title: string;
  setLocalColumns: (arg: any) => void;
  modalStore?: ModalStore;
  kanbanStore?: KanbanStore;
  index: number;
}
const Title: FC<IProps> = observer((props) => {
  const { title, listId, kanbanStore, index, setLocalColumns, modalStore } = props;
  const { columns, fetchColumns } = kanbanStore!;

  const { t } = useTranslation();
  const { ref, setIsShow, isShow } = useOutside(false);
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleOnBlur = async () => {
    await apiPost(`/tasker/columns/${listId}`, { name: newTitle });
    await fetchColumns();
    setLocalColumns(columns);
    setOpen(!open);
  };

  const deleteColumn = (info: string) => {
    modalStore?.openModal({
      name: 'CONFIRM_DELETE',
      payload: { id: info, setLocalColumns: setLocalColumns, titleColumn: title },
      isDanger: true,
      actionName: 'COLUMN',
      classModal: 'danger'
    });
  };

  return (
    <TitleWrapper ref={ref}>
      {open ? (
        <div className='editable-title-container'>
          <h2 className='input-title indexNumber'>{index + 1}</h2>
          <input
            type='text'
            className='input-title'
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            onBlur={handleOnBlur}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleOnBlur();
              }

              return;
            }}
            autoFocus
          />
          <FlexWithAlign
            $alignCenter={'center'}
            $gap={'24px'}
            className={'disabled'}
          >
            <InputContainer
              setLocalColumns={setLocalColumns}
              listId={listId}
              type='card'
            />
            <CommonButton
              className='list-button'
              onClick={() => setIsShow(!isShow)}
            >
              <IconInstance name={EIcon.moreverticaloutline} />
            </CommonButton>
          </FlexWithAlign>
        </div>
      ) : (
        <div className='editable-title-container'>
          <h2 className='editable-title indexNumber'>{index + 1}</h2>
          <h2
            onClick={() => setOpen(!open)}
            className='editable-title'
          >
            {title}
          </h2>
          <FlexWithAlign
            $alignCenter={'center'}
            $gap={'24px'}
          >
            <InputContainer
              setLocalColumns={setLocalColumns}
              listId={listId}
              type='card'
            />
            <CommonButton
              className='list-button'
              onClick={() => setIsShow(!isShow)}
            >
              <IconInstance name={EIcon.moreverticaloutline} />
            </CommonButton>
          </FlexWithAlign>
          {isShow && (
            <ul className='menu-card'>
              <li
                onClick={() => {
                  setIsShow(!isShow);
                  setOpen(!open);
                }}
              >
                {t('Архивировать')}
              </li>
              <li
                onClick={() => {
                  deleteColumn(listId);
                  setIsShow(!isShow);
                  setOpen(!open);
                }}
              >
                {t('Удалить')}
              </li>
            </ul>
          )}
        </div>
      )}
    </TitleWrapper>
  );
});

export default inject('modalStore', 'kanbanStore')(Title);
