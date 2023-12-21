import json
import uuid
from datetime import datetime

from models import Models
from sqlalchemy.orm import Session

from schemas import Schemas


def get_chats(db: Session, user: str):
    chat_ids = db.query(Models.chatusers).filter(Models.chatusers.user_id == user).all()
    chatList = []
    for item in chat_ids:
        chat = db.query(Models.Chat).filter(Models.Chat.id == item.chat_id).first()
        last_message = db.query(Models.Message).filter(Models.Message.chat == item.chat_id).first()
        if last_message == None:
            last_message_content = ""
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
            created_at=chat.createdat,
            updated_at=chat.updatedat)
        chatRes.created_at = str(chatRes.created_at)
        chatRes.updated_at = str(chatRes.updated_at)
        chatRes = chatRes.dict()
        chatList.append(chatRes)
    db.close()
    return json.dumps({'type': 'chatList', 'data': chatList})


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
        created_at=chat.createdat,
        updated_at=chat.updatedat)
    chatRes.created_at = str(chatRes.created_at)
    chatRes.updated_at = str(chatRes.updated_at)
    db.close()
    return chatRes


def get_messages_for_chat(db: Session, chat_id: str):
    messages = db.query(Models.Message).filter(Models.Message.chat == chat_id).all()
    chat = get_chat_by_id(db, chat_id)
    messageList = []
    for message in messages:
        messageResponse=Schemas.GetMessageResponse(
            id=str(message.id),
            sender=message.sender,
            content=str(message.content),
            chat=chat,
            created_at=message.createdat,
            updated_at=message.updatedat
        )
        messageResponse.created_at = str(messageResponse.created_at)
        messageResponse.updated_at = str(messageResponse.updated_at)
        messageList.append(messageResponse.dict())
        db.close()
    return json.dumps({'type': 'chatMessages', 'data': messageList})


def add_chat(db: Session, users1: list[Schemas.UserBase], chatName: str):
    if(len(users1) > 2):
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
    chat = Models.Chat(id=uniq_uuid,
                       chat_name=chatName,
                       is_group_chat=isGroupChat,
                       group_admin=groupAdmin,
                       lastest_message=None,
                       createdat=datetime.now(),
                       updatedat=datetime.now(),
                       users=user_list)
    db.add(chat)
    db.commit()
    chat.id = str(chat.id)
    db.close()
    return chat


def add_message(db: Session, sender: str, chat: str, content: str):
    uniq_id = uuid.uuid4()

    users_of_chat = []
    tmp = db.query(Models.Chat).filter(Models.Chat.id == chat).first().users
    for user in tmp:
        if user.user_id != sender:
            users_of_chat.append(Models.readbys(
                id=str(uuid.uuid4()),
                user_id=user.user_id,
                message_id=str(uniq_id),
                isRead=False
            ))

    message = Models.Message(
        id=uniq_id,
        sender=sender,
        chat=chat,
        content=content,
        createdat=datetime.now(),
        updatedat=datetime.now(),
        readbys=users_of_chat)
    db.add(message)
    my_chat = db.query(Models.Chat).filter(Models.Chat.id == chat).first()
    my_chat.lastest_message = message.id
    my_chat.updatedat = datetime.now()
    db.add(my_chat)
    db.commit()
    message.id = str(message.id)
    db.close()
    return message


def receive_message(db: Session, user_id: str, messages: list[str]):
    for message in messages:
        readbys = db.query(Models.readbys).filter(Models.readbys.message_id == message, Models.readbys.user_id == user_id).first()
        readbys.isRead = True
        db.add(readbys)
    db.commit()


def get_users_from_chat_users(db: Session, chat_id: str):
    users = db.query(Models.chatusers).filter(Models.chatusers.chat_id == chat_id).all()
    list_users = []
    for user in users:
        user1 = Schemas.UserBase(user_id=user.user_id)
        list_users.append(user1)
    db.close()
    return users