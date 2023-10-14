cat >./src/env/config.ts <<EOF
import type { ModeType } from '@env';

export const REACT_NATIVE_ENV: ModeType = '$1';
export const CURRENT_IP = '$(ipconfig getifaddr en0)';
EOF
