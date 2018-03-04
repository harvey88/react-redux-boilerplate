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

export {
    clearAllCookies,
    getCookie,
    getAllCookies,
    formatAMPM,
    setCookie,
    createDateTimeString,
}