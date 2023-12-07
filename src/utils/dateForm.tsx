import React from 'react';

function formatDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date >= today) {
    return 'Сегодня';
  } else if (date >= yesterday) {
    return 'Вчера';
  }
  const diff = now.getTime() - date.getTime();
  const oneMinute = 60 * 1000;
  const oneHour = 60 * oneMinute;
  const oneDay = 24 * oneHour;
  const oneWeek = 7 * oneDay;
  const oneMonth = 30 * oneDay;
  const oneYear = 365 * oneDay;

  if (diff < oneDay) {
    const hoursAgo = Math.floor(diff / oneHour);
    return `${hoursAgo} час${getNounForm(hoursAgo, ['', 'а', 'ов'])} назад`;
  } else if (diff < oneWeek) {
    const daysAgo = Math.floor(diff / oneDay);
    return `${daysAgo} ден${getNounForm(daysAgo, ['ь', 'я', 'ей'])} назад`;
  } else if (diff < oneMonth) {
    const weeksAgo = Math.floor(diff / oneWeek);
    return `${weeksAgo} недел${getNounForm(weeksAgo, ['я', 'и', 'ь'])} назад`;
  } else if (diff < oneYear) {
    const monthsAgo = Math.floor(diff / oneMonth);
    return `${monthsAgo} месяц${getNounForm(monthsAgo, ['', 'а', 'ев'])} назад`;
  } else {
    const yearsAgo = Math.floor(diff / oneYear);
    return `${yearsAgo} год${getNounForm(yearsAgo, ['', 'а', 'ов'])} назад`;
  }
}

function getNounForm(number: any, forms: any) {
  const cases = [2, 0, 1, 1, 1, 2];
  return forms[number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]];
}

interface TimeAgoProps {
  timestamp: string;
}

function TimeAgo({ timestamp }: TimeAgoProps) {
  const date = new Date(timestamp);
  const formattedDate = formatDate(date);

  return <span>{formattedDate}</span>;
}

export function DateAgo({ timestamp }: TimeAgoProps) {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('ru-RU', options);

  return <p>{formattedDate}</p>;
}

export default TimeAgo;
