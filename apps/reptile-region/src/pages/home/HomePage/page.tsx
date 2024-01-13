import React from 'react';

import ProgressBarWebview from '@/components/ProgressBarWebview';
import ENV from '@/env';

export default function HomePage() {
    return <ProgressBarWebview source={{ uri: ENV.WEB_PAGE_URI + 'homepage' }} />;
}
