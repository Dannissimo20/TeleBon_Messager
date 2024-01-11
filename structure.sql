create table chat
(
    id              uuid default gen_random_uuid() not null
        constraint chat_pk
            primary key,
    chat_name       text,
    is_group_chat   boolean,
    lastest_message uuid,
    group_admin     text,
    createdat       timestamp,
    updatedat       timestamp
);

alter table chat
    owner to postgres;

create table chatusers
(
    user_id      text,
    chat_id      uuid
        constraint fk_chat_id
            references chat,
    id_chatusers uuid default gen_random_uuid() not null
        constraint chatusers_pk
            primary key
);

alter table chatusers
    owner to postgres;

create table message
(
    id        uuid default gen_random_uuid() not null
        constraint message_pk
            primary key,
    content   text,
    chat      uuid
        constraint message_chat_id_fk
            references chat,
    createdat timestamp,
    updatedat timestamp,
    sender    text
);

alter table message
    owner to postgres;

create table readbys
(
    id         uuid default gen_random_uuid() not null
        constraint readbys_pk
            primary key,
    message_id uuid
        constraint readbys_message_id_fk
            references message,
    user_id    text,
    "isRead"   boolean
);

alter table readbys
    owner to postgres;