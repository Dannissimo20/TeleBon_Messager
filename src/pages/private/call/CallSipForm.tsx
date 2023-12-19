import { ChangeEventHandler, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CallSipWrapper } from './Call.styled';

import CommonButton from '../../../components/shared/button/CommonButton';
import CommonInput from '../../../components/shared/fields/CommonInput';

interface IProps {
  callActive: boolean;
  makeCall: (phoneNumber: string) => void;
  endCall: () => void;
}

const CallSipForm: React.FC<IProps> = (props) => {
  const { callActive, makeCall, endCall } = props;
  const [value, setValue] = useState('');
  const { t } = useTranslation();
  const myAudio = useRef<HTMLAudioElement>(null);
  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <CallSipWrapper>
      <CommonInput
        label={t('Номер телефона')}
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
        {t('Позвонить')}
      </CommonButton>
      <CommonButton
        onClick={endCall}
        type='button'
      >
        {t('Отбой')}
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
