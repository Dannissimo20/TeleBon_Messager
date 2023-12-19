import { EIcon, IconNew as IconInstance } from '../../icons/medium-new-icons/icon';

import React from 'react';

export const submenu = [
  {
    title: 'Рабочий стол',
    icon: <IconInstance name={EIcon.home} />,
    to: '/workbench',
    click: true
  },
  {
    title: 'Вызов',
    icon: <IconInstance name={EIcon.phone} />,
    to: '/call',
    click: false
  },
  {
    title: 'Мессенджер',
    icon: <IconInstance name={EIcon.chat} />,
    to: '/messenger/1/1',
    click: true
  },
  {
    title: 'Задачи',
    icon: <IconInstance name={EIcon.calendar} />,
    to: '/taskbook',
    endTab: true,
    click: true
  },
  {
    title: 'Клиенты',
    icon: <IconInstance name={EIcon.users} />,
    to: '/clients',
    click: true
  },
  {
    title: 'Запись',
    icon: <IconInstance name={EIcon.recording} />,
    to: '/products/cabinets',
    endTab: true,
    click: true
  },

  {
    title: 'Финансы',
    icon: <IconInstance name={EIcon.finans} />,
    to: '/finans',
    click: false
  },
  {
    title: 'Аналитика',
    icon: <IconInstance name={EIcon.analytic} />,
    to: '/analytics/1',
    click: false
  },
  {
    title: 'Компания',
    icon: <IconInstance name={EIcon.filial} />,
    to: '/management/service-categories',
    click: true
  },
  {
    title: 'Настройки',
    icon: <IconInstance name={EIcon.settings} />,
    to: '/settings/payments',
    click: true
  }
];
