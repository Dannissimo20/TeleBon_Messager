import uuid

from fastapi import FastAPI
from sqlalchemy import *
from datetime import datetime
import psycopg2
from pydantic import BaseModel, Field

app = FastAPI()
engine = create_engine('postgresql+psycopg2://postgres:denchik2702@localhost:5432/telebon')

metadata = MetaData()

chats = Table('chat', metadata,
              Column('id', String, primary_key=True),
              Column('chatName', String),
              Column('isGroupChat', Boolean),
              Column('createdAt', DateTime),
              Column('updatedAt', DateTime))

chatUsers = Table('chatUsers', metadata,
                  Column('user', String),
                  Column('chat', String))

class UserModel(BaseModel):
    email: str = Field(..., description="Электронная почта")
    name: str = Field(..., description="ФИО")
    id: str = Field(..., description="id пользователя")


class CreateChatModel(BaseModel):
    chatName: str = Field(..., description="Название чата")
    isGroupChat: bool = Field(default=False, description="Является ли чат групповым")
    createdAt: datetime = Field(default=datetime.now(), description="Время создания чата")
    updatedAt: datetime = Field(default=datetime.now(), description="Время обновления чата")
    users: list[UserModel]




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
    conn = engine.connect()
    conn.execute(chat_insert)
    for user in chat.users:
        chatUsers_insert = chatUsers.insert().values(
            user=user.id,
            chat=str(uniq_id)
        )
        conn.execute(chatUsers_insert)
    conn.commit()
    return {"code": 200}
