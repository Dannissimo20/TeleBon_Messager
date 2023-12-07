import { fullHd, laptop } from '../pages/private/schedule/Schedule';
import moment from 'moment-timezone';

const events = [{ title: 'fdsf', start: getDate('YEAR-MONTH-03') }];
function getDate(dayString: string) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();

  if (month.length === 1) {
    month = '0' + month;
  }

  return dayString.replace('YEAR', year).replace('MONTH', month);
}

export default events;

export const range = (keyCount: any) => Array.from({ length: keyCount }, (_, i) => i);

export const timeStringToNumber = (timeString: string) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours;
};
export const calculateEventWidth = (startTime: number, endTime: number) => {
  const windowWidth = window.innerWidth;
  const minutesDifference = endTime - startTime;
  const baseWidth = windowWidth > 1500 ? fullHd : laptop;
  const additionalWidth = Math.max(0, minutesDifference) * (baseWidth + 11) - (baseWidth + 11);
  return minutesDifference === 1 ? baseWidth : baseWidth + additionalWidth;
};
export const areDatesSame = (first: Date, second: Date) => {
  return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
};
export const addDateBy = (date: Date, count: number) => {
  const d = new Date(date);
  return new Date(d.setDate(d.getDate() + count));
};

export const getMonday = () => {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  return new Date(today.setDate(first));
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options).replace(/\//g, '.');
};

export const formatDay = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  return day.toString().padStart(2, '0');
};

export const formatMonth = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const monthIndex = date.getMonth();
  return months[monthIndex];
};

export const formatYear = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return year.toString();
};

export const convertToUTCFormat = (events: any) => {
  return events.map((event: any) => ({
    ...event,
    start: moment(event.start, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss') + 'Z',
    end: moment(event.end, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss') + 'Z'
  }));
};

export const optionsDateInModal: any = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};
