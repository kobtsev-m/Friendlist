import { format, formatDistanceToNow, getTime } from 'date-fns';

export const fDate = (date: Date | string) => {
  return format(new Date(date), 'dd MMMM yyyy');
};

export const fDateTime = (date: Date | string) => {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
};

export const fTimestamp = (date: Date | string) => {
  return getTime(new Date(date));
};

export const fDateTimeSuffix = (date: Date | string) => {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
};

export const fToNow = (date: Date | string) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
};
