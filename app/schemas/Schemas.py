import uuid
from datetime import datetime

from pydantic import BaseModel, Field
from typing import List


class UserBase(BaseModel):
    user_id: str


class ChatsResponse(BaseModel):
    chat_id: str
    chat_name: str
    users: list[UserBase]
    isGroupChat: bool
    lastest_message: str | None
    group_admin: str | None
    #unread: int = 0
    created_at: datetime
    updated_at: datetime


class GetMessageResponse(BaseModel):
    id: str
    sender: str
    content: str
    chat: ChatsResponse
    #is_read: bool = False
    created_at: datetime
    updated_at: datetime


class ReadBysResponse(BaseModel):
    id: str
    message_id: str
    user_id: str
    isRead: bool = False
    #chat_id: str


class WebSocketGetChats(BaseModel):
    type: str = "chatList"
    data: list[ChatsResponse]


class WebSocketGetMessages(BaseModel):
    type: str = "chatMessages"
    data: list[GetMessageResponse]


