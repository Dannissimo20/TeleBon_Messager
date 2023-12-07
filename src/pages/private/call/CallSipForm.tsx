import { ChangeEventHandler, useRef, useState } from 'react';

import CommonButton from '../../../components/shared/button/CommonButton';
import CommonInput from '../../../components/shared/fields/CommonInput';
import { CallSipWrapper } from './Call.styled';

interface IProps {
  callActive: boolean;
  makeCall: (phoneNumber: string) => void;
  endCall: () => void;
}

const CallSipForm: React.FC<IProps> = (props) => {
  const { callActive, makeCall, endCall } = props;
  const [value, setValue] = useState('');

  const myAudio = useRef<HTMLAudioElement>(null);
  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <CallSipWrapper>
      <CommonInput
        label='Номер телефона'
        type='text'
        value={value}
        onChange={handlePhoneChange}
        disabled={callActive}
      />
      <CommonButton
        onClick={() => makeCall(value)}
        type='button'
        typeBtn='success'
        disabled={callActive}
      >
        Позвонить
      </CommonButton>
      <CommonButton
        onClick={endCall}
        type='button'
      >
        Отбой
      </CommonButton>
      <audio
        ref={myAudio}
        id='audio-element'
        controls
        src=''
      ></audio>
    </CallSipWrapper>
  );
};

export default CallSipForm;
