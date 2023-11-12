import moment from 'moment';

export const getRelativeTime = (date: string) => {
  const dateObject = new Date(date);
  const sec = dateObject.getSeconds();
  const min = dateObject.getMinutes();
  const hh = dateObject.getHours();
  const dd = dateObject.getDate();
  const mm = dateObject.getMonth();
  const yyyy = dateObject.getFullYear();
  date = `${moment([yyyy, mm, dd, hh, min, sec]).fromNow(true)} ago`;
  return date;
};
