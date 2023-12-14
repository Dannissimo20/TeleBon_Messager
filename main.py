import uuid

from fastapi import FastAPI
from sqlalchemy import *
from datetime import datetime
import psycopg2
from pydantic import BaseModel, Field

app = FastAPI()
engine = create_engine('postgresql+psycopg2://postgres:denchik2702@localhost:5432/telebon')

conn = engine.connect()

metadata = MetaData()

chats = Table('chat', metadata,
              Column('id', String, primary_key=True),
              Column('chatName', String),
              Column('isGroupChat', Boolean),
              Column('latestMessage', String, ForeignKey('message.id')),
              Column('groupAdmin', String),
              Column('createdAt', DateTime),
              Column('updatedAt', DateTime))

chatUsers = Table('chatUsers', metadata,
                  Column('user', String),
                  Column('chat', String))

messages = Table('message', metadata,
                 Column('id', String, primary_key=True),
                 Column('readBy', String),
                 Column('sender', String),
                 Column('content', String),
                 Column('chat', String, ForeignKey('chat.id')),
                 Column('createdAt', DateTime),
                 Column('updatedAt', DateTime))

class UserModel(BaseModel):
    email: str = Field(..., description="Электронная почта")
    name: str = Field(..., description="ФИО")
    id: str = Field(..., description="id пользователя")

class ChatModel(BaseModel):
    id: str = Field(..., description="id чата")
    chatName: str = Field(..., description="Название чата")
    isGroupChat: bool = Field(default=False, description="Является ли чат групповым")
    createdAt: datetime = Field(default=datetime.now(), description="Время создания чата")
    updatedAt: datetime = Field(default=datetime.now(), description="Время обновления чата")


class CreateChatModel(BaseModel):
    chatName: str = Field(..., description="Название чата")
    isGroupChat: bool = Field(default=False, description="Является ли чат групповым")
    createdAt: datetime = Field(default=datetime.now(), description="Время создания чата")
    updatedAt: datetime = Field(default=datetime.now(), description="Время обновления чата")
    users: list[UserModel]

class CreateMessageModel(BaseModel):
    readBy: list[UserModel] = Field(default=None, description="Пользователь/ли, который прочитал сообщение")
    sender: UserModel = Field(..., description="Отправитель сообщения")
    content: str = Field(..., description="Текст сообщения")
    chat: ChatModel
    createdAt: datetime = Field(default=datetime.now(), description="Время создания сообщения")
    updatedAt: datetime = Field(default=datetime.now(), description="Время обновления сообщения")




@app.post("/user")
async def user(user: UserModel):
    return {
        "user email": user.email,
        "user name": user.name,
        "user id": user.id
    }


@app.post("/create_chat")
async def create_chat(chat: CreateChatModel):
    uniq_id = uuid.uuid4()
    chat_insert = insert(chats).values(
        id=uniq_id,
        chatName=chat.chatName,
        isGroupChat=chat.isGroupChat,
        createdAt=chat.createdAt,
        updatedAt=chat.updatedAt,
    )
    conn.execute(chat_insert)
    for item in chat.users:
        chatUsers_insert = chatUsers.insert().values(
            user=item.id,
            chat=str(uniq_id)
        )
        conn.execute(chatUsers_insert)
    conn.commit()
    return {"code": 200}

@app.post("/create_meassage")
async def create_meassage(message_model: CreateMessageModel):
    uniq_id = uuid.uuid4()
    if(len(message_model.readBy) == 0):
        readBy = None
    else:
        readBy = message_model.readBy[0].id
    message_insert = insert(messages).values(
        id=uniq_id,
        readBy=readBy,
        sender=message_model.sender.id,
        content=message_model.content,
        chat=message_model.chat.id,
        createdAt=message_model.createdAt,
        updatedAt=message_model.updatedAt,
    )
    conn.execute(message_insert)
    chat_update = update(chats).where(chats.c.id == message_model.chat.id).values(
        latestMessage=uniq_id,
    )
    conn.execute(chat_update)
    conn.commit()
    return {"code": 200}
