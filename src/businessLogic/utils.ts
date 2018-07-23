
const normalizedTo2Digits = (num: number) => {
    return num < 10 ? `0${num}` : num;
};

export const DateUtils = {
    format: (date: any) => {
        return `${date.getYear() - 100}-${normalizedTo2Digits(date.getMonth() + 1)}-${normalizedTo2Digits(date.getDate())} ${normalizedTo2Digits(date.getHours())}:${normalizedTo2Digits(date.getMinutes())}:${normalizedTo2Digits(date.getSeconds())}`;
    },
    lastWeek: () => {
        // calculate last week date
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
    }
};
