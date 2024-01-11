import json
import subprocess
from typing import List
import pdb

from pydantic import BaseModel
from starlette import websockets
from fastapi import FastAPI, WebSocket, Depends
from datetime import datetime
from sqlalchemy.orm import Session

from app.schemas import Schemas
from app.repo import Repository as repo

from app.database.Database import SessionLocal
from app.schemas.Schemas import UserBase

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
          description='В websocket функция возвращает JSON: {"type": "chatList", "data" : (список чатов)}')
async def add_chat(db: Session = Depends(get_db), userId: str | None = None, withUserId: list[str] | None = None, chatName: str | None = None):
    user_list = []
    for user in withUserId:
        user_list.append(Schemas.UserBase(user_id=user))
    user_list.append(Schemas.UserBase(user_id=userId))

    return repo.add_chat(db, user_list, chatName)


@app.get("/message/get_all",
         response_model=List[Schemas.GetMessageResponse],
         tags=["Сообщения"],
         summary="Получить список сообщений",
         description='В websocket функция возвращает JSON: {"type": "chatMessages", "data" : (список сообщений)}')
async def get_messages_for_chat(db: Session = Depends(get_db), chatId: str | None = None):
    return repo.get_messages_for_chat(db, chatId)


@app.post("/message/create",
         response_model=Schemas.GetMessageResponse,
         tags=["Сообщения"],
         summary="Создать сообщение",
         description='В websocket функция возвращает два JSON-а:<br>'
                     '{"type": "chatMessages", "data" : (список чатов)}<br>'
                     '{"type": "chatMessages", "data" : (список сообщений)}')
async def create_message(db: Session = Depends(get_db), senderId: str | None = None, chatId: str | None = None, content: str | None = None):
    return repo.add_message(db, senderId, chatId, content)


class Message(BaseModel):
    message: str

process = None

@app.post("/api/message")
async def receive_message(message: Message):
    global process
    if message.message == "stop":
        if process is not None:
            process.terminate()
            process = None
        return {"status": "Process stopped successfully"}
    elif message.message == "start":
        file_path = "D:/_Work/TelegramBot/Weather_bot.py"
        process = subprocess.Popen(["python", file_path], creationflags=subprocess.DETACHED_PROCESS)
    else:
        return {"status": "Invalid message"}
    return {"status": 200}


websocket_connections = []
app.websocket_timeout = 60


@app.websocket("/ws1")
async def my_websocket_endpoint(websocket: WebSocket, db: Session = Depends(get_db), userId: str | None = None):
    try:
        # region Создание websocket соединения
        await websocket.accept()
        websocket_connections.append(websocket)
        print(f"{datetime.now()} - New Connection for {userId}")

        chats = json.dumps({'type': 'chatList', 'data': repo.get_chats(db, userId)})

        await websocket.send_text(chats)
        # endregion

        while True:
            data = await websocket.receive_text()
            data = json.loads(data)
            # region Обработка запроса сообщений для конкретного чата конкретным пользователем
            if data["type"] == "getChatMessages":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                messages = repo.get_messages_for_chat(db, data["data"]["chatId"])

                await websocket.send_text(json.dumps({'type': 'chatMessages', 'data': messages}))
            # endregion

            # region Обработка отправки сообщения для конкретного чата конкретным пользователем
            elif data["type"] == "sendMessage":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                message = repo.add_message(db, data["data"]["sender_id"], data["data"]["chat_id"], data["data"]["content"])
                users = repo.get_users_from_chat_users(db, data["data"]["chat_id"])

                for user in users:
                    for ws in websocket_connections:
                        if ws.query_params.get("userId") == user.user_id and ws.client_state == websockets.WebSocketState.CONNECTED:
                            chats = repo.get_chats(db, userId)
                            await ws.send_text(json.dumps({'type': 'chatList', 'data': chats}))
                            messages = repo.get_messages_for_chat(db, data["data"]["chat_id"])
                            await ws.send_text(json.dumps({'type': 'chatMessages', 'data': messages}))
                            print("Сообщение успешно отправлено")
            # endregion

            # region Обработка запроса на создание чата (группового или обычного)
            elif data["type"] == "createChat":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                list_users = []
                for user in data["data"]["withUserId"]:
                    list_users.append(Schemas.UserBase(user_id=user["user_id"]))
                list_users_no_creator = list_users
                list_users.append(Schemas.UserBase(user_id=data["data"]["createdByUserId"]))
                chat = repo.add_chat(db, list_users, data["data"]["chatName"])

                for user in list_users_no_creator:
                    for ws in websocket_connections:
                        if ws.query_params.get("userId") == user.user_id and ws.client_state == websockets.WebSocketState.CONNECTED:
                            chats_for_user = repo.get_chats(db, userId)
                            await ws.send_text(json.dumps({'type': 'chatList', 'data': chats_for_user}))
                            print("Сообщение успешно отправлено")
            # endregion

            # region Обработка "печатания" пользователя
            # TODO отправление JSON когда пользователь печатает
            elif data["type"] == "typing":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                users = repo.get_users_from_chat_users(db, data["data"]["chatId"])
                for user in users:
                    if websocket.query_params.get("userId") == user.user_id:
                        await websocket.send_text(json.dumps({"type": "typing", "data": {"user_id": user.user_id}}))
            # endregion

            # region Обработка "переставания печатания" пользователя
            # TODO отправление JSON когда пользователь перестает печатать
            elif data["type"] == "stop typing":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
            # endregion


            # region Обработка события прочтения сообщения
            elif data["type"] == "messageRecieved":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                messages_id_list = []
                for message in data["data"]["messages"]:
                    messages_id_list.append(message["message_id"])
                repo.receive_message(db, userId, messages_id_list)
            # endregion

    except websockets.WebSocketDisconnect as e:
        print(f"{datetime.now()} - {userId} disconnected")
        websocket_connections.remove(websocket)