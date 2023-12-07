import React, { FC, useCallback, useState } from 'react';

import MessengerChat from '../chat/MessengerChat';
import MessengerSide from '../side/MessengerSide';

const MessengerContent: FC = () => {
  const [unreadMessages, setUnreadMessages] = useState<{ [chatId: string]: number }>({});
  const [isTyping, setIsTyping] = useState(false);

  const updateUnreadMessages = useCallback((chatId: string, count: number) => {
    setUnreadMessages((prevUnreadMessages) => ({
      ...prevUnreadMessages,
      [chatId]: count
    }));
  }, []);

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px' }}>
      <MessengerChat
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        unreadMessages={unreadMessages}
        updateUnreadMessages={updateUnreadMessages}
      />
      <MessengerSide
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        unreadMessages={unreadMessages}
        updateUnreadMessages={updateUnreadMessages}
      />
    </div>
  );
};

export default MessengerContent;
