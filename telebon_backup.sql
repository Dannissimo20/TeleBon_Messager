PGDMP                      {            telebon    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24653    telebon    DATABASE     {   CREATE DATABASE telebon WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE telebon;
                postgres    false            �            1259    24749    chat    TABLE       CREATE TABLE public.chat (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "chatName" text,
    "isGroupChat" boolean,
    "latestMessage" uuid,
    "groupAdmin" uuid,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.chat;
       public         heap    postgres    false            �            1259    24722 	   chatUsers    TABLE     D   CREATE TABLE public."chatUsers" (
    "user" uuid,
    chat uuid
);
    DROP TABLE public."chatUsers";
       public         heap    postgres    false            �            1259    24761    message    TABLE     �   CREATE TABLE public.message (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    sender uuid,
    content text,
    chat uuid,
    "readBy" uuid,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.message;
       public         heap    postgres    false            �            1259    24654    users    TABLE     �   CREATE TABLE public.users (
    dtreg text,
    email text,
    fio text,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    idfather text,
    idfillial text,
    offline text,
    phone text,
    "position" text,
    role text
);
    DROP TABLE public.users;
       public         heap    postgres    false            �          0    24749    chat 
   TABLE DATA           v   COPY public.chat (id, "chatName", "isGroupChat", "latestMessage", "groupAdmin", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   �       �          0    24722 	   chatUsers 
   TABLE DATA           3   COPY public."chatUsers" ("user", chat) FROM stdin;
    public          postgres    false    216   r       �          0    24761    message 
   TABLE DATA           `   COPY public.message (id, sender, content, chat, "readBy", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   �       �          0    24654    users 
   TABLE DATA           m   COPY public.users (dtreg, email, fio, id, idfather, idfillial, offline, phone, "position", role) FROM stdin;
    public          postgres    false    215   �       a           2606    24755    chat chat_pk 
   CONSTRAINT     J   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_pk PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.chat DROP CONSTRAINT chat_pk;
       public            postgres    false    217            c           2606    24767    message message_pk 
   CONSTRAINT     P   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pk PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.message DROP CONSTRAINT message_pk;
       public            postgres    false    218            _           2606    24742    users users_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
       public            postgres    false    215            d           2606    24783    chatUsers chatUsers_chat_id_fk    FK CONSTRAINT     }   ALTER TABLE ONLY public."chatUsers"
    ADD CONSTRAINT "chatUsers_chat_id_fk" FOREIGN KEY (chat) REFERENCES public.chat(id);
 L   ALTER TABLE ONLY public."chatUsers" DROP CONSTRAINT "chatUsers_chat_id_fk";
       public          postgres    false    4705    216    217            e           2606    24788    chatUsers chatUsers_users_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public."chatUsers"
    ADD CONSTRAINT "chatUsers_users_id_fk" FOREIGN KEY ("user") REFERENCES public.users(id);
 M   ALTER TABLE ONLY public."chatUsers" DROP CONSTRAINT "chatUsers_users_id_fk";
       public          postgres    false    216    215    4703            f           2606    24756    chat chat_users_id_fk    FK CONSTRAINT     y   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_users_id_fk FOREIGN KEY ("groupAdmin") REFERENCES public.users(id);
 ?   ALTER TABLE ONLY public.chat DROP CONSTRAINT chat_users_id_fk;
       public          postgres    false    215    4703    217            g           2606    24773    message message_chat_id_fk    FK CONSTRAINT     u   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_chat_id_fk FOREIGN KEY (chat) REFERENCES public.chat(id);
 D   ALTER TABLE ONLY public.message DROP CONSTRAINT message_chat_id_fk;
       public          postgres    false    4705    218    217            h           2606    24768    message message_users_id_fk    FK CONSTRAINT     y   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_users_id_fk FOREIGN KEY (sender) REFERENCES public.users(id);
 E   ALTER TABLE ONLY public.message DROP CONSTRAINT message_users_id_fk;
       public          postgres    false    218    215    4703            i           2606    24778    message message_users_id_fk2    FK CONSTRAINT     |   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_users_id_fk2 FOREIGN KEY ("readBy") REFERENCES public.users(id);
 F   ALTER TABLE ONLY public.message DROP CONSTRAINT message_users_id_fk2;
       public          postgres    false    215    4703    218            �   �   x�}αMD1�:��-�S��~�k���	�I^A��Ұƍpt�0Cn#�"!$K�l��G��\A*��-0�.I[J5����������|��Ϯ�h��)+F`��^:�P,�X+3rzp(Ҭ%�ƺE�k�צ�XD0�iX�V�ګ0�&n\�u|�����_�l���İe�8si��'FK��,	)�t����׸1x�����?��?�L�      �   |   x���� ߡG��%���J�#�4�8� .	l<��0XO�B�A�c��U��߿�ak���.k�Ȥ�F���M���ݱ����/M3�|р����)�!Q!<(��������*M�      �   �   x��OKJA]w��/���Jҩ>����&�aTp��Sx�9�x#�s#"^�M'9�bfl�N�T-�ب�ZvI�@}I�C�3Q��X���a\�����v~{/}!��{%(Ux$��Pt��S��L�Qw�2���l�L��޵K�D�b�d�#�a+��`�0+Q9�h-P�!�Hd�s��o_�>ԫe�F��WV�Q���,�ǟ0��9�'�u7��^N�~�`@      �   �   x�E��J�0���S�����mn{�1�e��Z�vA�.�����Q��y)+��3L���z����?���D����(P��qX/�f���=���P�Gz��?�O/%}�.=Җ~iOG��z�������Ҡ�d�{#QE�P���X�F���q�a*@\0���UX�nyB����K��}.�k����H�L�����Q��B�z-�m�t�W�#{堋Xg�����rQ��Ku%     