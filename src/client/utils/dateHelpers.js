import moment from 'moment';

export const calculateDiff = (time, option = 'year') => {
  const ts = Number(time);
  return moment().diff(ts || time, option);
};

export function timeFormat(time, pattern) {
  const timeStamp = Number(time);
  return moment(timeStamp || time).format(pattern);
}

export function getTimeObj(time) {
  return moment(time).toObject();
}

export function getGeneralDateFormat(time) {
  return timeFormat(time, 'DD MMM YYYY');
}
