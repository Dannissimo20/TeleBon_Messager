import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CloseBtn, Container } from './NewNote.styled';

import { ReactComponent as IconClose } from '../../../icons/close.svg';
import CommonButton from '../../button/CommonButton';

interface IProps {
  createNote: (text: string) => void;
  close: () => void;
}

const NewNote: React.FC<IProps> = ({ createNote, close }) => {
  const [text, setText] = useState('');
  const { t } = useTranslation();

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
        {t('Создать')}
      </CommonButton>
    </Container>
  );
};

export default NewNote;
