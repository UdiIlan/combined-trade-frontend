import { format as fnsFormat, formatDistance, formatRelative, subDays } from 'date-fns';

const normalizedTo2Digits = (num: number) => {
    return num < 10 ? `0${num}` : num;
};

export const DateUtils = {
    defaultFormat: (date: any) => {
        return `${date.getYear() - 100}-${normalizedTo2Digits(date.getMonth() + 1)}-${normalizedTo2Digits(date.getDate())} ${normalizedTo2Digits(date.getHours())}:${normalizedTo2Digits(date.getMinutes())}:${normalizedTo2Digits(date.getSeconds())}`;
    },
    lastWeek: () => {
        // calculate last week date
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
    },
    yesterday: () => {
        // calculate yesterday date
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date;
    },
    format: (date: Date, format: string) => {
        return (fnsFormat(date, format));
    }
};
