import json
import uuid

from fastapi import FastAPI, WebSocket, Depends
from sqlalchemy import *
from datetime import datetime
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from schemas import Schemas
from repo import Repository as repo

from database.Database import SessionLocal

app = FastAPI()
engine = create_engine('postgresql+psycopg2://postgres:denchik2702@localhost:5432/telebon')

conn = engine.connect()

metadata = MetaData()

users = Table('users', metadata,
              Column('dtreg', String),
              Column('email', String),
              Column('fio', String),
              Column('id', String, primary_key=True),
              Column("idfather", String),
              Column("idfillial", String),
              Column("offline", String),
              Column("phone", String),
              Column("position", String),
              Column("role", String))

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


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/users", response_model=list[Schemas.User])
async def users(db: Session = Depends(get_db)):
    users = repo.get_users(db)
    return users


@app.post("/create_chat", response_model=Schemas.CreateChatResponse)
async def create_chat(chat: Schemas.CreateChatModel, db: Session = Depends(get_db)):
    chat = repo.add_chat(db, chat.users, chat.chatName)
    return chat


@app.websocket("/ws")
async def create_chat(websocket: WebSocket, db: Session = Depends(get_db)):
    await websocket.accept()

    data = await websocket.receive_text()

    data = json.loads(data)

    if(data["message"] == "create chat"):
        chat = repo.add_chat(db, data["users"], data["chatName"])
        listUser = []
        for user in chat.users:
            u = Schemas.UserMain(
                id=str(user.id),
                fio=user.fio,
                email=user.email,
            )
            listUser.append(u)
        response = Schemas.CreateChatResponse(
            id=str(chat.id),
            chatName=chat.chatName,
            isGroupChat=chat.isGroupChat,
            users=listUser,
            createdAt=chat.createdAt,
            updatedAt=chat.updatedAt,
            groupAdmin=chat.groupAdmin
        )

        response.createdAt = str(response.createdAt)
        response.updatedAt = str(response.updatedAt)

        # uniq_id = uuid.uuid4()
        # chat_insert = chats.insert().values(
        #     id=uniq_id,
        #     chatName=data["chatName"],
        #     isGroupChat=data["isGroupChat"],
        #     latestMessage=None,
        #     groupAdmin=None,
        #     createdAt=datetime.now(),
        #     updatedAt=datetime.now(),
        # )
        # conn.execute(chat_insert)
        # for item in data["users"]:
        #     chatUsers_insert = chatUsers.insert().values(
        #         user=item["user"],
        #         chat=str(uniq_id)
        #     )
        #     conn.execute(chatUsers_insert)
        # conn.commit()
        #
        # result = chats.select().where(chats.c.id == str(uniq_id))
        # result = conn.execute(result)
        # result = result.fetchone()
        #
        # response = {
        #     "id": str(result[0]),
        #     "chatName": result[1],
        #     "isGroupChat": result[2],
        #     "users": data["users"],
        #     "createdAt": str(result[5]),
        #     "updatedAt": str(result[6]),
        # }


        await websocket.send_json(response.dict())

        # await websocket.close()


    elif(data["message"] == "create message"):
        uniq_id = uuid.uuid4()
        sender = conn.execute(users.select().where(users.c.id == data["sender"])).fetchone()
        chat = conn.execute(chats.select().where(chats.c.id == data["chat"])).fetchone()
        chatUser = conn.execute(chatUsers.select().where(chatUsers.c.chat == data["chat"])).fetchall()
        message_insert = insert(messages).values(
            id=uniq_id,
            readBy=None,
            sender=sender['id'],
            content=data["content"],
            chat=chat['id'],
            createdAt=datetime.now(),
            updatedAt=datetime.now(),
        )
        conn.execute(message_insert)
        chat_update = update(chats).where(chats.c.id == chat['id']).values(
            latestMessage=uniq_id,
        )
        conn.execute(chat_update)
        conn.commit()

    #     response = {
    #         "readBy":[],
    #         "id": str(uniq_id),
    #         "sender":{
    #             "id": str(sender['id']),
    #             "name": sender['fio'],
    #         },
    #         "content": data["content"],
    #         "chat":{
    #             "isGroupChat": chat['isGroupChat'],
    #             "users": [
    #                 {
    #                     "id": chatUser['user'],
    #                 },
    #                 {
    #                     "id": chatUser['user'],
    #                 }
    #             ],
    #             "id": str(chat['id']),
    #             "chatName": chat['chatName'],
    #             "createdAt": str(chat['createdAt']),
    #             "updatedAt": str(chat['updatedAt'])
    #         },
    #         "createdAt": ,
    #     }
    #
    #
    #
    # elif(data["message"] == "close connection"):
    #     await websocket.close()

    else:
        response = {"code": 400, "message": "Bad request: no type of message"}
        await websocket.send_json(response)
        await websocket.close()



# @app.post("/create_meassage")
# async def create_meassage(message_model: CreateMessageModel):
#     uniq_id = uuid.uuid4()
#     if(len(message_model.readBy) == 0):
#         readBy = None
#     else:
#         readBy = message_model.readBy[0].id
#     message_insert = insert(messages).values(
#         id=uniq_id,
#         readBy=readBy,
#         sender=message_model.sender.id,
#         content=message_model.content,
#         chat=message_model.chat.id,
#         createdAt=message_model.createdAt,
#         updatedAt=message_model.updatedAt,
#     )
#     conn.execute(message_insert)
#     chat_update = update(chats).where(chats.c.id == message_model.chat.id).values(
#         latestMessage=uniq_id,
#         updatedAt=datetime.now()
#     )
#     conn.execute(chat_update)
#     conn.commit()
#     return {"code": 200}
