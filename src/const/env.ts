import { CURRENT_IP, REACT_NATIVE_ENV } from './config';
import { END_POINT_URI, HOME_PAGE_URI, ModeType } from '@env';

const currentMode = (mode: ModeType) => REACT_NATIVE_ENV === mode;

const defaultEnv = {
    isLocal: currentMode('local'),
    isDev: currentMode('development'),
    isProd: currentMode('production'),
    END_POINT_URI,
    HOME_PAGE_URI,
};

const localEnv = {
    HOME_PAGE_URI: 'http://' + CURRENT_IP + ':3000',
};

const developmentEnv = {
    HOME_PAGE_URI: 'http://' + CURRENT_IP + ':3000',
};

const ENV = currentMode('production')
    ? defaultEnv
    : currentMode('development')
    ? Object.assign({}, defaultEnv, developmentEnv)
    : Object.assign({}, defaultEnv, localEnv);

export default ENV;
