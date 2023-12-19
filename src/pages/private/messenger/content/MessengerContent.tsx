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
  const socket = new WebSocket(`ws://26.45.29.100:8000/ws1?userId=${userId}`);
  //const socket = new WebSocket(`ws://localhost:8080/ws?userId=${userId}`);

  useEffect(() => {
    // Обработка события открытия соединения
    const handleOpen = (event: Event) => {
      console.log('Соединение установлено:', event);
    };

    // Обработка события приема сообщения от сервера
    const handleMessage = (event: MessageEvent) => {
      console.log('chatIds');
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

    // Обработка события закрытия соединения
    const handleClose = (event: CloseEvent) => {
      console.log('Соединение закрыто:', event);
    };

    // Подписываемся на события
    socket.addEventListener('open', handleOpen);
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('close', handleClose);

    // Отписываемся от событий при размонтировании компонента
    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('message', handleMessage);
      socket.removeEventListener('close', handleClose);
      socket.close();
    };
  }, []); // Пустой массив зависимостей означает, что эффект выполняется только при монтировании и размонтировании компонента

  const updateUnreadMessages = useCallback((chatId: string, count: number) => {
    setUnreadMessages((prevUnreadMessages) => ({
      ...prevUnreadMessages,
      [chatId]: count
    }));
  }, []);

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px' }}>
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
