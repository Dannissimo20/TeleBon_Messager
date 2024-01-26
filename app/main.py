import json
from typing import List

import telebot
from starlette import websockets
from fastapi import FastAPI, WebSocket, Depends
from datetime import datetime
from sqlalchemy.orm import Session

from app.schemas import Schemas
from app.repo import Repository as repo

from app.database.Database import SessionLocal

app = FastAPI(description='Подключение к вебсокету производится с помощью строки "ws://ip-адрес:8001/ws1?userId=id юзера"<br>'
                          'Для получения списка чатов необходимо подключиться к серверу<br>'
                          'Для получения списка сообщений необходимо передать JSON {"type": "getChatMessages", "data" : {"chatId": "id чата"}}<br>'
                          'Для создания нового сообщения необходимо передать JSON {"type": "sendMessage", "data" : {"sender_id": "id отправителя", "chat_id": "id чата", "content": "сообщение"}}<br>'
                          'Для создания нового чата необходимо передать JSON {"type": "createChat", "data" : {"createdByUserId": "id создателя", "chatName": "имя чата", "withUserId": [{"user_id": "id юзера1"}, {"user_id": "id юзера2"}]}}<br>'
              )


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()





@app.get("/chat/get_all",
         response_model=Schemas.WebSocketGetChats,
         tags=["Чаты"],
         summary="Получить список чатов",
         description='В websocket функция возвращает JSON: {"type": "chatList", "data" : (список чатов)}')
async def get_chats(db: Session = Depends(get_db), userId: str | None = None):
    return Schemas.WebSocketGetChats(type="chatList",data=repo.get_chats(db, userId))

@app.get("/chat/get_by_id",
         response_model=Schemas.ChatsResponse,
         tags=["Чаты"],
         summary="Получить чат по ID",
         description="В websocket функция не отправляет данные на фронт")
async def get_chat_by_id(db: Session = Depends(get_db), chat_id: str | None = None):
    return repo.get_chat_by_id(db, chat_id)


@app.post("/chat/create",
          response_model=Schemas.ChatsResponse,
          tags=["Чаты"],
          summary="Создать чат",
          description='В websocket функция возвращает 2 JSONа: сначала {"type": "chatList", "data" : (список чатов)}, а потом {"type": "chatMessages", "data" : (список сообщений)}')
async def add_chat(db: Session = Depends(get_db), userId: str | None = None, withUserId: list[str] | None = None, chatName: str | None = None):
    user_list = []
    for user in withUserId:
        user_list.append(Schemas.UserBase(user_id=user))
    user_list.append(Schemas.UserBase(user_id=userId))

    return repo.add_chat(db, user_list, chatName)


@app.delete("/chat/delete",
            response_model=List[Schemas.ChatsResponse],
            tags=["Чаты"],
            summary="Удалить чат",
            description='В websocket функция возвращает JSON: {"type": "chatList", "data" : (список чатов)}')
async def delete_chat(db: Session = Depends(get_db), chat_id: str | None = None):
    return repo.delete_chat(db, chat_id)


@app.get("/message/get_all",
         response_model=List[Schemas.GetMessageResponse],
         tags=["Сообщения"],
         summary="Получить список сообщений",
         description='В websocket функция возвращает JSON: {"type": "chatMessages", "data" : (список сообщений)}')
async def get_messages_for_chat(db: Session = Depends(get_db), chat_id: str | None = None):
    return repo.get_messages_for_chat(db, chat_id)


@app.post("/message/create",
         response_model=Schemas.GetMessageResponse,
         tags=["Сообщения"],
         summary="Создать сообщение",
         description='В websocket функция возвращает два JSON-а:<br>'
                     '{"type": "chatMessages", "data" : (список чатов)}<br>'
                     '{"type": "chatMessages", "data" : (список сообщений)}')
async def create_message(db: Session = Depends(get_db), senderId: str | None = None, chatId: str | None = None, content: str | None = None):
    return repo.add_message(db, senderId, chatId, content)


websocket_connections = []
app.websocket_timeout = 60
bot = telebot.TeleBot("6326079925:AAFbnXcr-zx5Is_lzhg8dK02hMp1PdwFxY4")
tech_support_chat_id = -4165711798
tech_support_user_id = '65a8d81df5353df12690729f'


@app.websocket("/ws1")
async def my_websocket_endpoint(websocket: WebSocket, db: Session = Depends(get_db), userId: str = ""):
    try:
        # region Создание websocket соединения
        for ws in websocket_connections:
            if ws.query_params.get("userId") == userId:
                websocket_connections.remove(ws)
        await websocket.accept()
        if userId == "undefined":
            await  websocket.send_text('connection closed')
            raise ValueError('User ID is undefined')
        websocket_connections.append(websocket)
        print(f"{datetime.now()} - New Connection for {userId}")
        # endregion

        exist = repo.is_tech_support_exist(db, userId)
        if not exist:
            repo.add_chat(db, [Schemas.UserBase(user_id=userId), Schemas.UserBase(user_id=tech_support_user_id)], f"Tech Support for user {userId}")
        #chats = json.dumps({'type': 'chat_list', 'data': repo.get_chats(db, userId)}, cls=Schemas.ChatsResponseEncoder)
        chats = json.dumps({'type': 'chat_list', 'data': repo.get_chats(db, userId)})

        await websocket.send_text(chats)
        # endregion

        while True:
            # TODO Не создавать несколько чатов с одним и тем же человеком
            data = await websocket.receive_text()
            data = json.loads(data)
            # region Удаление чата
            if data["type"] == "delete_chat":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                repo.delete_chat(db, data["data"]["chat_id"])
                await websocket.send_text(json.dumps({'type': 'chat_list', 'data': repo.get_chats(db, userId)}))
            # endregion

            # region Обработка запроса сообщений для конкретного чата конкретным пользователем
            if data["type"] == "get_chat_messages":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                # messages = repo.get_messages_for_chat(db, data["data"]["chat_id"], userId)
                # chats = repo.get_chats(db, userId)
                # await websocket.send_text(json.dumps({'type': 'chat_messages', 'data': messages}))
                # await websocket.send_text(json.dumps({'type': 'chat_list', 'data': chats}))
                users = repo.get_users_from_chat_users(db, data["data"]["chat_id"])
                for user in users:
                    for ws in websocket_connections:
                        if ws.query_params.get("userId") == user.user_id:
                            messages = repo.get_messages_for_chat(db, data["data"]["chat_id"], userId)
                            chats = repo.get_chats(db, user.user_id)
                            await websocket.send_text(json.dumps({'type': 'chat_messages', 'data': messages}))
                            await websocket.send_text(json.dumps({'type': 'chat_list', 'data': chats}))

            # endregion

            # region Обработка отправки сообщения для конкретного чата конкретным пользователем
            elif data["type"] == "send_message":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                repo.add_message(db, data["data"]["sender_id"], data["data"]["chat_id"], data["data"]["content"])
                users = repo.get_users_from_chat_users(db, data["data"]["chat_id"])
                #if "65a8d81df5353df12690729f" == user.user_id and "65a8d81df5353df12690729f" == data["data"]["sender_id"]:
                # region Отправка сообщения в техподдержку
                for user in users:
                   if tech_support_user_id == user.user_id and tech_support_user_id != data["data"]["sender_id"]:
                       bot.send_message(tech_support_chat_id, f"Сообщение от {data['data']['sender_fio']}:\n\"{data['data']['content']}\"")
                # endregion

                users.sort(key=lambda x: x.user_id != data["data"]["sender_id"])

                for user in users:
                    for ws in websocket_connections:
                        if ws.query_params.get("userId") == user.user_id:
                            web = []
                            for w in websocket_connections:
                                web.append(w.query_params.get("userId"))
                            print("Websockets: ", web)
                            messages = repo.get_messages_for_chat(db, data["data"]["chat_id"], user.user_id)
                            chats = repo.get_chats(db, user.user_id)
                            await ws.send_text(json.dumps({'type': 'chat_list', 'data': chats}))
                            await ws.send_text(json.dumps({'type': 'chat_messages', 'data': messages}))
                            print("Сообщение успешно отправлено")
            # endregion

            # region Обработка запроса на создание чата (группового или обычного)
            elif data["type"] == "create_chat":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                list_users = []
                for user in data["data"]["with_user_id"]:
                    list_users.append(Schemas.UserBase(user_id=user["user_id"]))
                list_users_no_creator = list_users
                list_users.append(Schemas.UserBase(user_id=data["data"]["created_by_user_id"]))
                repo.add_chat(db, list_users, data["data"]["chat_name"])

                for user in list_users_no_creator:
                    for ws in websocket_connections:
                        if ws.query_params.get("user_id") == user.user_id:
                            chats_for_user = repo.get_chats(db, user.user_id)
                            await ws.send_text(json.dumps({'type': 'chat_list', 'data': chats_for_user}))
                            print("Сообщение успешно отправлено")
            # endregion

            # region Поменяние названия чата
            elif data["type"] == "rename_chat":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                repo.rename_chat(db, data["data"]["chat_id"], data["data"]["new_name"])
                await websocket.send_text(json.dumps({'type': 'chat_list', 'data': repo.get_chats(db, userId)}))
            # endregion

            # region Обработка "печатания" пользователя
            # TODO отправление JSON когда пользователь печатает
            elif data["type"] == "typing":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                users = repo.get_users_from_chat_users(db, data["data"]["chatId"])
                for user in users:
                    if websocket.query_params.get("user_d") == user.user_id:
                        await websocket.send_text(json.dumps({"type": "typing", "data": {"user_id": user.user_id}}))
            # endregion

            # region Обработка "переставания печатания" пользователя
            # TODO отправление JSON когда пользователь перестает печатать
            elif data["type"] == "stop typing":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
            # endregion



    except websockets.WebSocketDisconnect:
        print(f"{datetime.now()} - {userId} disconnected")
        websocket_connections.remove(websocket)
    except ValueError:
        #print(f"{datetime.now()} - {userId} disconnected")
        #await websocket.send_text("connection closed")
        websocket_connections.remove(websocket)