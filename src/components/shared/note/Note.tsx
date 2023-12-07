import { ReactComponent as IconClose } from '../../icons/close.svg';

import { INote } from '../../../store/notesStore';
import { CloseBtn, Container, Text, Date } from './Note.styled';

interface IProps {
  note: INote;
  handleDelete: (data: any) => void;
}

const Note: React.FC<IProps> = ({ note, handleDelete }) => {
  return (
    <Container>
      <CloseBtn onClick={() => handleDelete(note)}>
        <IconClose />
      </CloseBtn>
      <Text>{note?.text}</Text>
      <Date>{note?.date}</Date>
    </Container>
  );
};

export default Note;
