import getConfig from '../config/index';

const config = getConfig()

const routePrefix = config.baseUrl;

export const IMAGES_BASE_URL = config.imagesUrl;

export const LOGIN_ROUTE = routePrefix + '/login';

export const REGISTER_ROUTE = routePrefix + '/register';

