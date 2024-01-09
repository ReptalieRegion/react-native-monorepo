import type { ModeType } from '@env';
import { END_POINT_URI, HOME_PAGE_URI, WEB_PAGE_URI } from '@env';

import { REACT_NATIVE_ENV } from './config';

const currentMode = (mode: ModeType) => REACT_NATIVE_ENV === mode;

const defaultEnv = {
    isLocal: currentMode('test'),
    isDev: currentMode('development'),
    isProd: currentMode('production'),
    END_POINT_URI,
    HOME_PAGE_URI,
    WEB_PAGE_URI,
};

const localEnv = {};

const developmentEnv = {};

const ENV = currentMode('production')
    ? defaultEnv
    : currentMode('development')
      ? Object.assign({}, defaultEnv, developmentEnv)
      : Object.assign({}, defaultEnv, localEnv);

export default ENV;
