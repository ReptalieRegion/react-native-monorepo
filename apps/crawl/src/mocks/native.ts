import { setupServer } from 'msw/native';

import { handlers } from './handlers';

export const native = setupServer(...handlers);
