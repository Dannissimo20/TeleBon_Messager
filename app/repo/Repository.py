import json
import uuid
from datetime import datetime, timedelta

import pytz
from sqlalchemy import desc

from app.models import Models
from sqlalchemy.orm import Session

from app.schemas import Schemas


def get_chats(db: Session, user: str):
    chat_ids = db.query(Models.chatusers).filter(Models.chatusers.user_id == user).all()
    chatList = []
    for item in chat_ids:
        chat = db.query(Models.Chat).filter(Models.Chat.id == item.chat_id).first()
        last_message = db.query(Models.Message).filter(Models.Message.chat == item.chat_id).order_by(desc(Models.Message.createdat)).first()
        unread = (db.query(Models.readbys).filter(Models.readbys.chat_id == item.chat_id).filter(Models.readbys.user_id == user).count())
        if last_message == None:
            last_message_content = None
        else:
            last_message_content = last_message.content
        users = db.query(Models.chatusers).filter(Models.chatusers.chat_id == item.chat_id).all()
        usersList = []
        for item2 in users:
            user1 = Schemas.UserBase(user_id=item2.user_id)
            usersList.append(user1.dict())
        users = usersList
        chatRes = Schemas.ChatsResponse(
            chat_id=str(chat.id),
            chat_name=chat.chat_name,
            users=users,
            isGroupChat=chat.is_group_chat,
            lastest_message=last_message_content,
            group_admin=str(chat.group_admin),
            is_tech_support=chat.is_tech_support,
            unread=unread,
            created_at=chat.createdat.isoformat(),
            updated_at=chat.updatedat.isoformat())
        chatRes = chatRes.dict()
        chatList.append(chatRes)
    sorted_chats = sorted(chatList, key=lambda chat: chat["updated_at"], reverse=True)
    db.close()
    return sorted_chats


def get_chat_by_id(db: Session, chat_id: str):
    chat = db.query(Models.Chat).filter(Models.Chat.id == chat_id).first()
    users = db.query(Models.chatusers).filter(Models.chatusers.chat_id == chat_id).all()
    usersList = []
    for item2 in users:
        user1 = Schemas.UserBase(user_id=item2.user_id)
        usersList.append(user1.dict())
    users = usersList
    chatRes = Schemas.ChatsResponse(
        chat_id=str(chat.id),
        chat_name=chat.chat_name,
        users=users,
        isGroupChat=chat.is_group_chat,
        lastest_message=str(chat.lastest_message),
        group_admin=str(chat.group_admin),
        is_tech_support=chat.is_tech_support,
        created_at=chat.createdat.isoformat(),
        updated_at=chat.updatedat.isoformat())
    db.close()
    return chatRes


def get_messages_for_chat(db: Session, chat_id: str, user_id: str):
    messages = db.query(Models.Message).filter(Models.Message.chat == chat_id).all()
    chat = get_chat_by_id(db, chat_id)
    messageList = []
    for message in messages:
        # all = db.query(Models.readbys).filter(Models.readbys.message_id == message.id).filter(Models.readbys.chat_id == chat_id).first()
        # is_read = False
        # if all is None:
        #     is_read = False
        # else:
        #     if message.sender != user_id:
        #         all.isRead = True
        #     else:
        #         is_read = all.isRead
        all = db.query(Models.readbys).filter(Models.readbys.message_id == message.id).filter(Models.readbys.user_id != user_id).filter(Models.readbys.chat_id == chat_id).all()
        db.query(Models.readbys).filter(Models.readbys.message_id == message.id).filter(Models.readbys.user_id == user_id).filter(Models.readbys.chat_id == chat_id).delete()
        is_read = False
        if len(all) >= 0:
           is_read = False
        if len(all) == 0:
           is_read = True
        messageResponse= Schemas.GetMessageResponse(
            id=str(message.id),
            sender=message.sender,
            content=str(message.content),
            chat=chat,
            is_read=is_read,
            created_at=message.createdat.isoformat(),
            updated_at=message.updatedat.isoformat()
        )
        messageList.append(messageResponse.dict())
        db.commit()
        db.close()
    return messageList


def add_chat(db: Session, users1: list[Schemas.UserBase], chatName: str):
    if len(users1) > 2:
        isGroupChat = True
        groupAdmin = users1[len(users1)-1].user_id
    else:
        isGroupChat = False
        groupAdmin = None

    uniq_uuid = uuid.uuid4()
    user_list = []
    for user in users1:
        chatUser = Models.chatusers(user_id=user.user_id, chat_id=uniq_uuid)
        user_list.append(chatUser)
    if chatName.split(" for ")[0] == "Tech Support":
        isTechSupport = True
    else:
        isTechSupport = False
    chat = Models.Chat(id=uniq_uuid,
                       chat_name=chatName,
                       is_group_chat=isGroupChat,
                       group_admin=groupAdmin,
                       lastest_message=None,
                       is_tech_support=isTechSupport,
                       createdat=datetime.now(pytz.timezone('Europe/Moscow')),
                       updatedat=datetime.now(pytz.timezone('Europe/Moscow')),
                       users=user_list)
    db.add(chat)
    db.commit()
    chat.id = str(chat.id)
    db.close()


def delete_chat(db: Session, chat_id: str):
    message_ids = []
    messages = db.query(Models.Message).filter(Models.Message.chat == chat_id).all()
    for message in messages:
        message_ids.append(message.id)
    for id in message_ids:
        db.query(Models.readbys).filter(Models.readbys.message_id == id).delete()
    db.query(Models.chatusers).filter(Models.chatusers.chat_id == chat_id).delete()
    db.query(Models.Message).filter(Models.Message.chat == chat_id).delete()
    db.query(Models.Chat).filter(Models.Chat.id == chat_id).delete()
    db.commit()
    db.close()


def rename_chat(db: Session, chat_id: str, new_name: str):
    chat = db.query(Models.Chat).filter(Models.Chat.id == chat_id).first()
    chat.chat_name = new_name
    chat.updatedat = datetime.now()
    db.commit()
    db.close()


def add_message(db: Session, sender: str, chat: str, content: str):
    uniq_id = uuid.uuid4()

    users_of_chat = []
    my_chat = db.query(Models.Chat).filter(Models.Chat.id == chat).first()
    for user in my_chat.users:
        if user.user_id != sender:
            users_of_chat.append(Models.readbys(
                id=str(uuid.uuid4()),
                user_id=user.user_id,
                message_id=str(uniq_id),
                isRead=False,
                chat_id=my_chat.id
            ))
    now = datetime.now() + timedelta(hours=3)
    message = Models.Message(
        id=uniq_id,
        sender=sender,
        chat=chat,
        content=content,
        createdat=now,
        updatedat=now,
        readbys=users_of_chat)
    db.add(message)
    my_chat.lastest_message = message.id
    my_chat.updatedat = datetime.now()
    db.add(my_chat)
    db.commit()
    db.close()


def get_users_from_chat_users(db: Session, chat_id: str):
    users = db.query(Models.chatusers).filter(Models.chatusers.chat_id == chat_id).all()
    list_users = []
    for user in users:
        user1 = Schemas.UserBase(user_id=user.user_id)
        list_users.append(user1)
    db.close()
    return users


def is_tech_support_exist(db: Session, user_id: str):
    is_tech_support_array = db.query(Models.Chat.is_tech_support).join(Models.chatusers).filter(Models.chatusers.user_id == user_id).all()
    if any(item[0] for item in is_tech_support_array):
        return True
    else:
        return False
