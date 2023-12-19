import React from 'react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { CloseBtn, Container, Text, Date as DateText } from './Note.styled';

import { INote } from '../../../store/notesStore';
import { ReactComponent as IconClose } from '../../icons/close.svg';

dayjs.extend(utc);

interface IProps {
  note: INote;
  handleDelete: (data: any) => void;
}

const Note: React.FC<IProps> = ({ note, handleDelete }) => {
  const formattedDate: string | undefined = note?.date
    ? dayjs.utc(new Date(note.date).toUTCString()).format('DD-MM-YYYY HH:mm:ss')
    : undefined;

  return (
    <Container>
      <CloseBtn onClick={() => handleDelete(note)}>
        <IconClose />
      </CloseBtn>
      <Text>{note?.text}</Text>
      <DateText>{formattedDate}</DateText>
    </Container>
  );
};

export default Note;
