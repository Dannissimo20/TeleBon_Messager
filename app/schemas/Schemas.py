import json
import uuid
from datetime import datetime

from pydantic import BaseModel, Field
from typing import List, Any


class UserBase(BaseModel):
    user_id: str


class ChatsResponse(BaseModel):
    chat_id: str
    chat_name: str
    users: list[UserBase]
    isGroupChat: bool
    lastest_message: str | None
    group_admin: str | None
    is_tech_support: bool
    unread: int = 0
    created_at: str
    updated_at: str


class GetMessageResponse(BaseModel):
    id: str
    sender: str
    content: str
    chat: ChatsResponse
    is_read: bool
    created_at: str
    updated_at: str


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


