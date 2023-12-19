import uuid
from datetime import datetime

from models import Models
from sqlalchemy.orm import Session

from schemas import Schemas


def get_users(db: Session):
    sql = db.query(Models.User)
    resulte = db.query(Models.User).all()
    # test = []
    # for res in resulte:
    #     temp = Schemas.User().model_validate(res)
    #     test.insert(temp)
    users = []
    chats = []
    for res in resulte:
        for chat in res.chats:
            chat = Schemas.ChatModel(id = str(chat.id), chatName = chat.chatName, isGroupChat = chat.isGroupChat, createdAt = chat.createdAt, updatedAt = chat.updatedAt)
            chats.append(chat)
        chats = []
        user = Schemas.User(id = str(res.id), email = res.email, fio = res.fio, offline = res.offline, phone = res.phone, chats = chats)
        users.append(user)
    return users


def add_chat(db: Session, users: list[Schemas.UserBase], chatName: str):
    if(len(users) > 2):
        isGroupChat = True
    else:
        isGroupChat = False

    users_list = []
    for user in users:
        userModel = db.query(Models.User).filter(Models.User.id == user["user"]).first()
        users_list.append(userModel)

    chat = Models.Chat(id=uuid.uuid4(),
                       chatName=chatName,
                       isGroupChat=isGroupChat,
                       groupAdmin=None,
                       latestMessage=None,
                       createdAt=datetime.now(),
                       updatedAt=datetime.now(),
                       users=users_list)
    db.add(chat)
    db.commit()
    chat.id = str(chat.id)
    for user in chat.users:
        user.id = str(user.id)
    return chat

