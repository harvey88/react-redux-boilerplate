const clearAllCookies = () => {
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf('=');
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
}

const getCookie = (name) => {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + name + '=');
    if (parts.length == 2)
        return parts
            .pop()
            .split(';')
            .shift();
}

const setCookie = (cname, cvalue, exMins) => {
    const d = new Date();
    d.setTime(d.getTime() + (exMins*60*1000));
    const expires = 'expires='+d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=';
}

const getAllCookies = () => {
    let theCookies = document.cookie.split(';');
    let aString = '';
    for (let i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + '\n';
    }
    return aString;
}

const formatAMPM = (ms) => {
    let date = new Date(ms)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
}

const createDateTimeString = (ms) => {
    let date = new Date(ms)
    let locale = 'en-us'
    let year = date.getFullYear()
    let month = date.toLocaleString(locale, {month: 'short'})
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    let strDateTime =
        month + ' ' + day + ' ' + year + ' ' + hours + ':' + minutes + ' ' + ampm
    return strDateTime
}

const youtubeParser = (url) => {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#]*).*/;
    let match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

const MINUTES_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * MINUTES_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 12 * 30 * DAY_IN_MS;
const YEAR_IN_MS = 12 * MONTH_IN_MS;

const getTimeDiffFromNow = (date) => {
    const currentTime = new Date();
    const msDiff =  currentTime - new Date(date.replace(/\s/, 'T'));
    let diffObj = {};
    diffObj.years = parseInt(msDiff / YEAR_IN_MS);
    let remainder = msDiff % YEAR_IN_MS;
    diffObj.months = parseInt(remainder / MONTH_IN_MS);
    remainder = remainder % MONTH_IN_MS;
    diffObj.days = parseInt(remainder / DAY_IN_MS);
    remainder = remainder % DAY_IN_MS;
    diffObj.hours = parseInt(remainder / HOUR_IN_MS);
    remainder = remainder % HOUR_IN_MS;
    diffObj.minutes = parseInt(remainder / MINUTES_IN_MS);
    return diffObj;
}

const createLastActivityTimeString = (last_activity_at) => {
    let lastActivityTime;
    let lastActivityMs;
    let isTodayOnline;

    const currentTime = new Date();
    if (last_activity_at) {
        const date = last_activity_at.replace(/\s/, 'T')
        lastActivityTime = new Date(date);
        lastActivityMs = lastActivityTime.getTime();
        isTodayOnline = currentTime.getFullYear() === lastActivityTime.getFullYear() &&
            currentTime.getMonth() === lastActivityTime.getMonth() &&
            currentTime.getDate() === lastActivityTime.getDate()
    }

    const currentMs = currentTime.getTime()

    let lastSeenString = '-';

    if (last_activity_at && ((currentMs - lastActivityMs + 300000) < 3600000) && (currentMs - lastActivityMs > 300000)) { // less then 1 hour more than 5 minutes
        const lastSeen = (currentTime - lastActivityTime + 300000) / 60000

        lastSeenString = `був в мережі ${Math.round(lastSeen)} хвилин тому`
    }

    if (last_activity_at && (currentMs - lastActivityMs < 300000)) { // less then 5 minutes
        lastSeenString = 'Online'
    }

    if (last_activity_at && isTodayOnline && (currentMs - lastActivityMs + 300000) > 3600000) { // was online today
        let minutes = lastActivityTime.getMinutes()

        const min = minutes < 10 ? '0' + minutes : minutes

        const lastSeen = lastActivityTime.getHours() + '-' + min

        lastSeenString = `був в мережі сьогодні о ${lastSeen}`
    }

    if (last_activity_at && !isTodayOnline) { // was online at another day

        let minutes = lastActivityTime.getMinutes()

        const min = minutes < 10 ? '0' + minutes : minutes

        const lastSeenTime = lastActivityTime.getHours() + '-' + min
        const lastSeenDate = lastActivityTime.getFullYear() + '/' + lastActivityTime.getMonth() + '/' + lastActivityTime.getDate()

        lastSeenString = `був в мережі ${lastSeenDate} о ${lastSeenTime}`
    }

    return lastSeenString;
}

const groupBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

const getMessageTime = (createdAt) => {
    const timeDiffObject = getTimeDiffFromNow(createdAt);
    let str = '';
    if (timeDiffObject.years || timeDiffObject.months) {
        const date = new Date(createdAt)
        str = `${date.getFullYear()} ${date.getTime()}`
    } else if (timeDiffObject.days) {
        const days = timeDiffObject.days;
        str = `${days} ${days.toString().endsWith('1')
            ? 'день'
            : days.toString().endsWith('12') || days.toString().endsWith('13') || days.toString().endsWith('14')
                ? 'днів'
                : days.toString().endsWith('2') || days.toString().endsWith('3') || days.toString().endsWith('4')
                    ? 'дня'
                    : 'днів' } тому`
    } else if(timeDiffObject.hours) {
        const hours = timeDiffObject.hours;
        str = `${hours} ${hours.toString().endsWith('1')
            ? 'година '
            : hours.toString().endsWith('12') || hours.toString().endsWith('13') || hours.toString().endsWith('14')
                ? 'годин'
                : hours.toString().endsWith('2') || hours.toString().endsWith('3') || hours.toString().endsWith('4')
                    ? 'години'
                    : 'годин' } тому`
    } else if(timeDiffObject.minutes) {
        const minutes = timeDiffObject.minutes;
        str = `${minutes} ${minutes.toString().endsWith('1')
            ? 'хвилина '
            : minutes.toString().endsWith('12') || minutes.toString().endsWith('13') || minutes.toString().endsWith('14')
                ? 'хвилин'
                : minutes.toString().endsWith('2') || minutes.toString().endsWith('3') || minutes.toString().endsWith('4')
                    ? 'хвилини'
                    : 'хвилин' } тому`
    } else  {
        str = 'тільки що';
    }
    return str;
}

export {
    clearAllCookies,
    getCookie,
    getAllCookies,
    formatAMPM,
    setCookie,
    createDateTimeString,
    youtubeParser,
    createLastActivityTimeString,
    groupBy,
    getMessageTime
}