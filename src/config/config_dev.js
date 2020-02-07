//const https = process.env.HTTPS;

const isHttp = process.env.NODE_ENV == 'development'

const domain = 'api.ping.k-3soft.com';//domain
//const credentials = 'include'

const origin = `${isHttp ? 'http' : 'https'}://${domain}`;

export default {
    baseUrl: origin + '/api/v1',
    imagesUrl: origin + '/uploads/'
}