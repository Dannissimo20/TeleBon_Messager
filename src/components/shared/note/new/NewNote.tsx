import { useState } from 'react';

import CommonButton from '../../button/CommonButton';
import { ReactComponent as IconClose } from '../../../icons/close.svg';
import { CloseBtn, Container } from './NewNote.styled';

interface IProps {
  createNote: (text: string) => void;
  close: () => void;
}

const NewNote: React.FC<IProps> = ({ createNote, close }) => {
  const [text, setText] = useState('');

  return (
    <Container>
      <CloseBtn onClick={close}>
        <IconClose />
      </CloseBtn>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <CommonButton
        colored={true}
        color={'yellow'}
        highlighted
        onClick={() => createNote(text)}
        fullWidth
      >
        Создать
      </CommonButton>
    </Container>
  );
};

export default NewNote;
