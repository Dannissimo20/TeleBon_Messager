import uuid

from sqlalchemy import Column, String, ForeignKey, UUID, Boolean, MetaData, DateTime
from sqlalchemy.orm import relationship

from app.database.Database import Base

class chatusers(Base):
    __tablename__ = "chatusers"
    id_chatusers = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String)
    chat_id = Column(UUID(as_uuid=True), ForeignKey('chat.id'))

class readbys(Base):
    __tablename__ = "readbys"
    id = Column(String, primary_key=True)
    message_id = Column(String, ForeignKey('message.id'))
    user_id = Column(String)
    isRead = Column(Boolean)
    chat_id = Column(String, ForeignKey('chat.id'))


class Chat(Base):
    __tablename__ = "chat"
    id = Column(String, primary_key=True)
    chat_name = Column(String)
    is_group_chat = Column(Boolean)
    lastest_message = Column(String, ForeignKey('message.id'))
    group_admin = Column(String)
    is_tech_support = Column(Boolean)
    createdat = Column(DateTime)
    updatedat = Column(DateTime)
    users = relationship("chatusers")


class Message(Base):
    __tablename__ = "message"
    id = Column(String, primary_key=True)
    sender = Column(String)
    content = Column(String)
    chat = Column(String, ForeignKey('chat.id'))
    createdat = Column(DateTime)
    updatedat = Column(DateTime)
    readbys = relationship("readbys")



