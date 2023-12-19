import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import JsSIP from 'jssip';
import { pathOr } from 'rambda';

import { CallSipWrapper } from './Call.styled';

import CommonButton from '../../../components/shared/button/CommonButton';
import CommonInput from '../../../components/shared/fields/CommonInput';

interface ICallSip {
  socket: string;
  server: string;
  stun: string;
  login: string;
  password: string;
}

const CallSip: React.FC<ICallSip> = (props) => {
  const { socket: socketname, server, stun, login, password } = props;
  const { t } = useTranslation();
  const [value, setValue] = useState('999');
  const [stream, setStream] = useState<MediaStream | any>();
  const [phone, setPhone] = useState({});
  const [callActive, setCallActive] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const myAudio = useRef<any>(null);

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {}, []);

  JsSIP.debug.disable();

  const onRegister = () => {
    setIsRegister(true);
  };

  function makeCall(value: string, phone: any) {
    const url = `sip:${login}@${server}`;

    const socket = new JsSIP.WebSocketInterface('wss://v1.hanumi.net:8089/ws');
    const configuration = {
      sockets: [socket],
      uri: url,
      password
    };
    console.info('init UA ', configuration);

    const ua = new JsSIP.UA(configuration);

    setPhone(ua);
    ua.start();
    console.log('start');
    ua.on('registered', function (e: any) {
      console.log('registered');
    });

    const eventHandlers = {
      progress: function (e: any) {
        console.log('call is in progress');
      },
      failed: function (e: any) {
        console.log('call failed with cause: ', e);
      },
      ended: function (e: any) {
        console.log('call ended with cause: ', e);
      },
      confirmed: function (e: any) {
        console.log('call confirmed');
        const senders = session.connection.getSenders();
        console.log(senders.length);
        const track = pathOr(undefined, ['0', 'track'], senders);
        const newStream = new MediaStream();

        if (track) {
          newStream.addTrack(track);
        }

        myAudio.current!.srcObject = newStream;
        myAudio.current!.play();
      }
    };

    const options = {
      eventHandlers: eventHandlers,
      mediaConstraints: { audio: true, video: false }
    };

    const callUrl = `sip:${value}@${server}`;
    console.log('calling... ', callUrl);

    const session = ua.call(callUrl, options);
  }

  function endCall(phone: any) {}

  return (
    <CallSipWrapper>
      {!isRegister && (
        <CommonButton onClick={onRegister}>
          {t('Войти как оператор')} {login}
        </CommonButton>
      )}
      {isRegister && (
        <>
          <CommonInput
            label={t('Номер телефона')}
            type='text'
            value={value}
            onChange={handlePhoneChange}
          />
          <CommonButton
            onClick={() => makeCall(value, phone)}
            type='button'
            typeBtn='success'
          >
            {t('Позвонить')}
          </CommonButton>
          <CommonButton
            onClick={() => endCall(phone)}
            type='button'
          >
            {t('Отбой')}
          </CommonButton>
          <video
            ref={myAudio}
            id='audio-element'
            controls
          ></video>
        </>
      )}
    </CallSipWrapper>
  );
};

export default CallSip;
