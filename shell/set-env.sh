cat >./src/const/config.ts <<EOF
import { ModeType } from '@env';

export const REACT_NATIVE_ENV: ModeType = '$1';
export const CURRENT_IP = '';
EOF
