import moment from 'moment';

export const ConvertDateTime = (timeStamp: number) => {
  return new Date(timeStamp).setHours(0, 0, 0, 0);
};

export const formatDateForText = (date: Date) => {
  return moment(date).format('ll');
};

export const formatTime = (timeStamp: number) => {
  const date = new Date(timeStamp);
  const timeString = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return timeString;
};
