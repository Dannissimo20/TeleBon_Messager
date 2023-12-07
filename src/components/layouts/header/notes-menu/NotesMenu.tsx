import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import classNames from 'classnames';
import { inject, observer } from 'mobx-react';

import NotesStore from '../../../../store/notesStore';
import { PENDING } from '../../../../utils/state';
import { FlexContainer, Padding } from '../../../../utils/styleUtils';
import CommonButton from '../../../shared/button/CommonButton';
import CommonLoader from '../../../shared/loader/CommonLoader';
import { useOutside } from '../../../hooks/useOutside';
import { EIcon, IconNew as IconInstance } from '../../../icons/medium-new-icons/icon';

import NewNote from '../../../shared/note/new/NewNote';
import Note from '../../../shared/note/Note';
import { LoaderLayout, Menu, Wrapper } from './NotesMenu.styled';

interface IProps {
  notesStore?: NotesStore;
}

const NotesMenu: FC<IProps> = observer(({ notesStore }) => {
  const { fetchNotes, notes, createNote, state, deleteNote } = notesStore!;
  const [creation, setCreation] = useState(false);
  const createNew = async (text: string) => {
    const response = await createNote({ text });
    if (response) {
      setCreation(false);
    } else {
      toast.error('Ошибка');
    }
  };
  const handleDelete = (note: any) => {
    deleteNote(note);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const { ref, isShow, setIsShow } = useOutside(false);

  return (
    <Wrapper ref={ref}>
      <button
        className={classNames(isShow && 'active')}
        onClick={() => setIsShow(!isShow)}
      >
        <IconInstance name={EIcon.file} />
      </button>
      <Menu className={classNames(isShow && 'active')}>
        <FlexContainer className='header'>
          <button
            onClick={() => setIsShow(false)}
            className='close'
          >
            <IconInstance name={EIcon.plus} />
          </button>
          <h1>Заметки</h1>
        </FlexContainer>
        <div className='content'>
          {creation ? (
            <NewNote
              close={() => setCreation(false)}
              createNote={createNew}
            />
          ) : (
            <CommonButton
              colored={true}
              color={'yellow'}
              highlighted
              onClick={() => setCreation(true)}
              fullWidth
            >
              Создать заметку
            </CommonButton>
          )}
          <Padding $size='20px' />
          {notes.length ? (
            notes.map((note, i) => (
              <Note
                key={note.id + i}
                note={note}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <FlexContainer
              $gap='25px'
              $column
              className='empty'
            >
              <IconInstance name={EIcon.file} />
              <h4>Нет заметок</h4>
            </FlexContainer>
          )}
          {state === PENDING && (
            <LoaderLayout>
              <CommonLoader />
            </LoaderLayout>
          )}
        </div>
      </Menu>
    </Wrapper>
  );
});

export default inject('notesStore')(NotesMenu);
