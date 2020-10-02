export default function getDateDescription(date: Date) {
    const currentDate = new Date();

    if (currentDate.getFullYear() !== date.getFullYear()) {
        return date.toLocaleDateString();
    }

    if (currentDate.getMonth() !== date.getMonth()) {
        return date.toLocaleDateString();
    }

    if (currentDate.getDate() !== date.getDate()) {
        const daysDiff = currentDate.getDate() - date.getDate();
        if (daysDiff === 1) {
            return "1 day ago";
        }
        return `${daysDiff} days ago`;
    }

    const currentHours = currentDate.getHours();
    const hours = date.getHours();
    if (currentHours !== hours) {
        const hoursDiff = currentHours - hours;
        if (hoursDiff === 1) {
            return "1 hour ago";
        }
        return `${hoursDiff} hours ago`;
    }

    const currentMin = currentDate.getMinutes();
    const mins = date.getMinutes();
    if (currentMin !== mins) {
        const minsDiff = currentMin - mins;
        if (minsDiff === 1) {
            return "1 minute ago";
        }
        return `${minsDiff} minutes ago`;
    }

    const currentSecond = currentDate.getSeconds();
    const seconds = date.getSeconds();
    if (currentSecond !== seconds) {
        const secondsDiff = currentSecond - seconds;
        if (secondsDiff === 1) {
            return "1 second ago";
        }
        return `${secondsDiff} seconds ago`;
    }
}
