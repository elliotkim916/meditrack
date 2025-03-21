import moment from 'moment';

export const ConvertDateTime = (timeStamp: number) => {
  return new Date(timeStamp);
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

export const getDatesRange = (startDate: Date, endDate: Date) => {
  const start = moment(new Date(startDate), 'MM/DD/YYYY');
  const end = moment(new Date(endDate), 'MM/DD/YYYY');
  const dates = [];

  while (start.isSameOrBefore(end)) {
    dates.push(start.format('MM/DD/YYYY'));
    start.add(1, 'days');
  }

  return dates;
};

export const getDateRangeToDisplay = () => {
  const dateList = [];

  for (let i = 0; i <= 7; i++) {
    dateList.push({
      date: moment().add(i, 'days').format('DD'), // 27
      day: moment().add(i, 'days').format('dd'), // Tue
      formattedDate: moment().add(i, 'days').format('L'), //12/27/2025
    });
  }

  return dateList;
};
