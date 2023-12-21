import React, { FC, useCallback, useState, useEffect } from 'react';

import { inject, observer } from 'mobx-react';

import { getCookie } from '../../../../utils/cookies';
import MessengerChatNew from '../chat/MessengerChat';
import MessengerSide from '../side/MessengerSide';

const MessengerContent: FC = () => {
  const [unreadMessages, setUnreadMessages] = useState<{ [chatId: string]: number }>({});
  const [isTyping, setIsTyping] = useState(false);
  const [userChats, setUserChats] = useState([]);
  const userId = getCookie('id');
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [reconnectInterval, setReconnectInterval] = useState<NodeJS.Timeout | null>(null);
  const socket = new WebSocket(`ws://26.45.29.100:8000/ws1?userId=${userId}`);
  //const socket = new WebSocket(`ws://localhost:8080/ws?userId=${userId}`);

  useEffect(() => {
    const connectWebSocket = async () => {
      return new Promise<void>((resolve) => {
        socket.addEventListener('open', (event: Event) => {
          console.log('Соединение установлено:', event);
          setIsReconnecting(false);
          clearInterval(reconnectInterval!);
          console.log('Соединение восстановлено!');
          resolve();
        });

        const handleMessage = async (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type == 'chatList') {
              if (data.data && Array.isArray(data.data)) {
                const chatIds = data.data;
                setUserChats(chatIds);
                console.log(chatIds);
              } else {
                console.error('Ошибка формата данных. Отсутствует ожидаемый массив chatIds.');
              }
            }
          } catch (error) {
            console.error('Ошибка при парсинге JSON:', error);
          }
        };

        const handleClose = (event: CloseEvent) => {
          console.log('Соединение закрыто:', event);
          if (!isReconnecting) {
            setIsReconnecting(true);
            console.log('Попытка восстановления соединения...');
            setReconnectInterval(setInterval(() => {
              setupWebSocket();
            }, 1000));
          }
        };

        socket.addEventListener('message', handleMessage);
        socket.addEventListener('close', handleClose);

        return () => {
          socket.removeEventListener('message', handleMessage);
          socket.removeEventListener('close', handleClose);
          socket.close();
        };
      });
    };

    const setupWebSocket = async () => {
      await connectWebSocket();
      console.log('WebSocket готов к использованию');
    };

    setupWebSocket();
  }, [isReconnecting, reconnectInterval]);

  const updateUnreadMessages = useCallback((chatId: string, count: number) => {
    setUnreadMessages((prevUnreadMessages) => ({
      ...prevUnreadMessages,
      [chatId]: count
    }));
  }, []);

  const reconnectingNotification = isReconnecting && (
      <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px', background: 'yellow' }}>
        Соединение восстанавливается...
      </div>
  );

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px' }}>
      {reconnectingNotification}
      <MessengerChatNew
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        unreadMessages={unreadMessages}
        updateUnreadMessages={updateUnreadMessages}
        ws={socket}
        userChats={userChats}
      />
      <MessengerSide
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        unreadMessages={unreadMessages}
        updateUnreadMessages={updateUnreadMessages}
        ws={socket}
        userRooms={userChats}
      />
    </div>
  );
};

export default inject('chatStore')(observer(MessengerContent));
