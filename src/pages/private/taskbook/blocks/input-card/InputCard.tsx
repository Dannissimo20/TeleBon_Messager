import { FC, useState } from 'react';
import { InputCardWrapper } from './InputCard.styled';

const InputCard: FC = () => {
  const [title, setTitle] = useState('');

  return (
    <InputCardWrapper>
      <div className='input-card-container'>
        <textarea
          className='input-text'
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </InputCardWrapper>
  );
};

export default InputCard;
