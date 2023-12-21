import uuid
from datetime import datetime

from pydantic import BaseModel
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
    created_at: datetime
    updated_at: datetime


class GetMessageResponse(BaseModel):
    id: str
    sender: str
    content: str
    chat: ChatsResponse
    created_at: datetime
    updated_at: datetime


class ReadBysResponse(BaseModel):
    id: str
    message_id: str
    user_id: str
    isRead: bool = False
