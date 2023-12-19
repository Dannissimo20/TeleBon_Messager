from datetime import datetime

from pydantic import BaseModel
from typing import List


class ChatBase(BaseModel):
    chatName: str


class UserBase(BaseModel):
    id: str

class UserMain(UserBase):
    email: str
    fio: str

class CreateChatResponse(BaseModel):
    id: str
    chatName: str
    isGroupChat: bool
    createdAt: datetime
    updatedAt: datetime
    users: List[UserMain]


class CreateChatModel(ChatBase):
    users: List[UserBase]


class User(UserBase):
    offline: str
    phone: str
    chats: List[ChatBase]
