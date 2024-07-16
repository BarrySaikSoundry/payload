import { format, formatDistanceToNow } from 'date-fns';
export const formatDate = ({ date, i18n, pattern })=>{
    const theDate = new Date(date);
    return format(theDate, pattern, {
        locale: i18n.dateFNS
    });
};
export const formatTimeToNow = ({ date, i18n })=>{
    const theDate = new Date(date);
    return formatDistanceToNow(theDate, {
        locale: i18n.dateFNS
    });
};

//# sourceMappingURL=formatDate.js.map