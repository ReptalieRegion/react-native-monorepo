import React from 'react';

import ProgressBarWebview from '@/components/ProgressBarWebview';
import ENV from '@/env';

export default function PrivacyPolicyPage() {
    return <ProgressBarWebview source={{ uri: ENV.WEB_PAGE_URI + 'terms-of-use' }} />;
}
