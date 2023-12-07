import { ChangeEventHandler, useRef, useState } from 'react';

import JsSIP from 'jssip';
import { RTCSession } from 'jssip/lib/RTCSession';
import { RTCSessionEvent } from 'jssip/lib/UA';
import { pathOr } from 'rambda';

import CommonButton from '../../../components/shared/button/CommonButton';
import CommonInput from '../../../components/shared/fields/CommonInput';
import { CallSipWrapper } from './Call.styled';



interface ICallSip {
  socket: string;
  server: string;
  stun: string;
  login: string;
  password: string;
}

const CallSip: React.FC<ICallSip> = (props) => {
  const { socket: socketname, server, stun, login, password } = props;

  const [phoneNumber, setPhoneNumber] = useState('999');
  const [incomingCall, setIncoming] = useState(false);

  const userAgent = useRef<JsSIP.UA | undefined>();
  const call = useRef<RTCSession | undefined>();

  const [callActive, setCallActive] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const myAudio = useRef<HTMLAudioElement>(null);

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneNumber(e.target.value);
  };

  const implementAudio = (stream: any) => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
      if (!myAudio.current) {
        return;
      }
      myAudio.current.srcObject = stream;
      myAudio.current.play();
    });
  };

  const register = () => {
    JsSIP.debug.disable();
    const socket = new JsSIP.WebSocketInterface(socketname);
    const configuration = {
      sockets: [socket],
      uri: `sip:${login}@${server}`,
      stun_servers: [stun],
      password: password
    };
    const ua = new JsSIP.UA(configuration);

    ua.on('registered', (e) => {
      console.log('Оператор зарегистрировался');
      setIsRegister(true);
    });
    ua.on('newRTCSession', (data: RTCSessionEvent) => {
      call.current = data.session;

      if (call.current!.direction === 'incoming') {
        setIncoming(true);
      } else {
        call.current.on('confirmed', () => {
          const track = pathOr(undefined, ['0', 'track'], call.current!.connection.getSenders());

          if (!track) {
            console.log('no tracks');

            return;
          }

          const newStream = new MediaStream();
          newStream.addTrack(track);

          implementAudio(newStream);
          setCallActive(true);
        });
      }
      console.log(call.current!.connection);
    });

    userAgent.current = ua;
    userAgent.current!.start();
  };

  const sessionEvtHandlers = {
    progress: (e: any) => {
      console.log('call in progress', e);
    },
    failed: function (e: any) {
      console.log('call failed with cause: ', e);
    },
    ended: function (e: any) {
      console.log('call ended with cause: ', e);
    },
    confirmed: function (e: any) {
      console.log('confirmed 2');
    },
    accepted: function (e: any) {
      console.log('accepted', e);
    }
  };

  const sessionOptions = {
    eventHandlers: sessionEvtHandlers,
    mediaConstraints: {
      audio: true,
      video: false
    },
    pcConfig: {
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
      ]
    }
  };

  const makeCall = (value: string) => {
    if (userAgent.current!.isRegistered()) {
      call.current! = userAgent.current!.call(`sip:${value}@${server}`, sessionOptions);
    }
  };

  const receiveCall = () => {
    setCallActive(true);

    call.current!.answer({
      mediaConstraints: { audio: true, video: false }
    });
  };

  const endCall = () => {
    if (userAgent.current!.isConnected()) {
      userAgent.current!.terminateSessions();
      setCallActive(false);
      setIncoming(false);

      if (!myAudio.current) {
        return;
      }
      myAudio.current.srcObject = null;
      myAudio.current.pause();
    }
  };

  return (
    <CallSipWrapper>
      {!isRegister && <CommonButton onClick={register}>Войти как оператор {login}</CommonButton>}
      {isRegister && (
        <>
          <CommonInput
            label='Номер телефона'
            type='text'
            value={phoneNumber}
            onChange={handlePhoneChange}
            disabled={callActive}
          />
          <CommonButton
            onClick={() => makeCall(phoneNumber)}
            type='button'
            typeBtn='success'
            disabled={callActive}
          >
            Позвонить
          </CommonButton>
          <CommonButton
            onClick={() => receiveCall()}
            type='button'
            typeBtn='success'
            disabled={callActive || !incomingCall}
          >
            Ответить
          </CommonButton>
          <CommonButton
            onClick={() => endCall()}
            type='button'
          >
            Отбой
          </CommonButton>
          <audio
            ref={myAudio}
            id='audio-element'
            controls
          ></audio>
        </>
      )}
    </CallSipWrapper>
  );
};

export default CallSip;
