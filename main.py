# TODO Написать список библиотек и команд для сервера
import json
import uuid

import starlette.websockets
from fastapi import FastAPI, WebSocket, Depends
from sqlalchemy import *
from datetime import datetime
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from models import Models
from schemas import Schemas
from repo import Repository as repo

from database.Database import SessionLocal

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


websocket_connections = []
app.websocket_timeout = 60


@app.websocket("/ws1")
async def my_websocket_endpoint(websocket: WebSocket, db: Session = Depends(get_db), userId: str | None = None):
    try:
        # region Создание websocket соединения
        await websocket.accept()
        print(f"{datetime.now()} - New Connection for {userId}")
        websocket_connections.append(websocket)

        # ws_id = websocket.query_params.get("userId")

        chats = repo.get_chats(db, userId)

        await websocket.send_text(chats)
        # endregion

        while True:

            data = await websocket.receive_text()
            data = json.loads(data)
            # region Обработка запроса сообщений для конкретного чата конкретным пользователем
            if data["type"] == "getChatMessages":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                messages = repo.get_messages_for_chat(db, data["data"]["chatId"])

                await websocket.send_text(messages)
            # endregion

            # region Обработка отправки сообщения для конкретного чата конкретным пользователем
            elif data["type"] == "sendMessage":
                print(f"{datetime.now()} - {data['type']} for user: {userId}\n{data['data']}")
                repo.add_message(db, data["data"]["sender_id"], data["data"]["chat_id"], data["data"]["content"])
                #messages = repo.get_messages_for_chat(db, data["data"]["chat_id"])

                users = repo.get_users_from_chat_users(db, data["data"]["chat_id"])

                for user in users:
                    for ws in websocket_connections:
                        if ws.query_params.get("userId") == user.user_id  and ws.client_state == starlette.websockets.WebSocketState.CONNECTED:
                            chats_for_user = repo.get_chats(db, userId)
                            await ws.send_text(chats_for_user)
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

                #for ws in websocket_connections:
                for user in list_users_no_creator:
                    for ws in websocket_connections:
                        if ws.query_params.get("userId") == user.user_id and ws.client_state == starlette.websockets.WebSocketState.CONNECTED:
                            chats_for_user = repo.get_chats(db, userId)
                            await ws.send_text(chats_for_user)
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
                print(f"Ну вроде пользователь {userId} прочитал сообщения")
                # TODO узать у Паши что возврашать
            # endregion

    except starlette.websockets.WebSocketDisconnect as e:
        print(f"{datetime.now()} - {userId} disconnected")
    # finally:
        # await websocket.close()