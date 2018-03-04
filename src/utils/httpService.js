import axios from 'axios';
import {getCookie} from './functions';
import Alert from 'react-s-alert';

class HttpService {

    constructor() {
        this.http = axios.create({
            headers: {'Content-Type': 'application/json',
                'Authorization': getCookie('Auth')},
            //withCredentials: true,
            Accept: '*/*'
        });
    }

    doGet(route, transformResponse, errorFunction, errorObj) {
        return this.http
            .get(route, {headers: {'Content-Type': 'application/json',
                'Authorization': getCookie('Auth')}})
            .then(result => {
                if (transformResponse) {
                    return transformResponse(result.data)
                }
                return result.data
            })
            .catch(e => this.handleError(e, errorObj, errorFunction));
    }

    doDelete(route, transformResponse, errorFunction, errorObj) {
        return this.http
            .delete(route, {headers: {'Content-Type': 'application/json',
                'Authorization': getCookie('Auth')}})
            .then(result => {
                if (transformResponse) {
                    return transformResponse(result.data)
                }
                return result.data
            })
            .catch(e => this.handleError(e, errorObj, errorFunction));
    }

    doPost(route, request, transformResponse, errorFunction, errorObj) {
        return this.http
            .post(route, JSON.stringify(request),
                {headers: {'Content-Type': 'application/json',
            'Authorization': getCookie('Auth')}})
            .then(result => {
                if (transformResponse) {
                    return transformResponse(result.data)
                }
                return result.data;
            })
            .catch(e => this.handleError(e, errorObj, errorFunction));
    }

    doPut(route, request, transformResponse, errorFunction, errorObj) {
        return this.http
            .put(route, JSON.stringify(request), {headers: {'Content-Type': 'application/json',
                'Authorization': getCookie('Auth')}})
            .then(result => {
                if (transformResponse) {
                    return transformResponse(result.data)
                }
                return result.data;
            })
            .catch(e => this.handleError(e, errorObj, errorFunction));
    }

    sendFile(route, reqObject, transformResponse, errorFunction, errorObj) {
        let fd = new FormData();
        Object.keys(reqObject).map(key => {
            fd.append(key, reqObject[key]);
        });

        return this.http
            .post(route, fd, {
                headers: {'Content-Type': 'multipart/form-data', 'Authorization': getCookie('Auth')}
            })
            .then(result => {
                if (transformResponse) {
                    return transformResponse(result.data)
                }
                return result.data;
            })
            .catch(e => this.handleError(e, errorObj, errorFunction));
    }

    handleError(e, errorObj, errorFunction) {
        let message = '';

        if (errorFunction) {
            errorFunction(e);
            return;
        }

        if (errorObj) {
            Object.keys(errorObj)
                .filter(key => key === e.response.status)
                .map(key => {
                    message = errorObj[key];
                });
        }

        if(!message) {
            switch(e.response.status) {
                case 401: message = 'Ви не авторизовані: введіть правильний логін і пароль'; break;
                case 500: message = 'На сервері сталася помилка. Вибачте за тимчасові незручності'; break;
                case 503: message = 'На сервері сталася помилка. Вибачте за тимчасові незручності'; break;
                default: message = '';
            }
        }

        if (message) {
            Alert.error(message, {})
        }
    }
}

export default new HttpService();