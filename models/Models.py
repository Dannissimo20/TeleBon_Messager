from sqlalchemy import Column, String, Table, ForeignKey
from sqlalchemy.orm import relationship

from database.Database import Base


chatUsers = Table("chatUsers", Base.metadata,
    Column("user",String, ForeignKey('users.id')),
    Column("chat", String, ForeignKey('chat.id')))


class User(Base):
    __tablename__ = "users"
    dtreg = Column(String, default="3")
    email = Column(String)
    fio = Column(String)
    id = Column(String, primary_key=True)
    idfather = Column(String, default="3")
    idfillial = Column(String, default="3")
    offline = Column(String, default="off")
    phone = Column(String, default="3")
    position = Column(String, default="3")
    role = Column(String, default="admin")
    chats = relationship("Chat", secondary=chatUsers, backref="users")


class Chat(Base):
    __tablename__ = "chat"
    id = Column(String, primary_key=True)
    chatName = Column(String)
    isGroupChat = Column(String)
    # latestMessage = relationship("Message")
    latestMessage = Column(String, ForeignKey("message.id"))
    groupAdmin = Column(String)
    createdAt = Column(String)
    updatedAt = Column(String)


class Message(Base):
    __tablename__ = "message"
    id = Column(String, primary_key=True)
    readBy = Column(String)
    sender = Column(String)
    content = Column(String)
    chat = relationship("Chat")
    createdAt = Column(String)
    updatedAt = Column(String)


