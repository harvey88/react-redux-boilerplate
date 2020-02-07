import prod from './config_prod'
import dev from './config_dev'

const getConfig = () => (process.env.NODE_ENV == 'development') ? dev : prod

export default getConfig