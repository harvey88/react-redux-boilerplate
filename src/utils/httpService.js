import axios from 'axios';
import {getCookie} from './functions';
import Alert from 'react-s-alert';

class HttpService {

    constructor() {
        if(!HttpService.instance) {
            this.http = axios.create({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('Auth')
                },
                //withCredentials: true,
                Accept: '*/*'
            });
            HttpService.instance = this;
            return HttpService.instance;
        }

    }

    setHistory(history) {
        this.history = history;
    }

    doGet(route, transformResponse, errorFunction, errorObj) {
        return this.http
            .get(route, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('Auth')
                }
            })
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
            .delete(route, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('Auth')
                }
            })
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
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getCookie('Auth')
                    }
                })
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
            .put(route, JSON.stringify(request), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('Auth')
                }
            })
            .then(result => {
                if (transformResponse) {
                    return transformResponse(result.data)
                }
                return result.data;
            })
            .catch(e => this.handleError(e, errorObj, errorFunction));
    }

    sendFile(route, fd, transformResponse, errorFunction, errorObj) {

        return this.http.post(route, fd, {
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

        if (!e.response) {
            this.history.push('/login');
            Alert.error('Сталася непердбачувана помилка, будь ласка зайдіть ще раз', {});
            return;
        }

        if (errorObj) {
            Object.keys(errorObj)
                .filter(key => key === e.response.status)
                .map(key => {
                    message = errorObj[key];
                });
        }

        if (!message) {
            switch (e.response.status) {
                case 401:
                    this.history.push('/login');
                    message = 'Ви не авторизовані: введіть правильний логін і пароль';
                    break;
                case 500:
                    message = 'На сервері сталася помилка. Вибачте за тимчасові незручності';
                    break;
                case 400:
                    message = 'Перевірте правильність введених даних';
                    break;
                case 503:
                    message = 'Сервер тимчасово недоступний. Вибачте за незручності';
                    break;
                default:
                    message = '';
            }
        }

        if (message) {
            Alert.error(message, {})
        }
    }
}

let instance = new HttpService();

const initHttpServer = (history) => {
    instance.setHistory(history);
}

export default instance;

export {initHttpServer};