import React from 'react';
import Config from 'react-native-config';

import ProgressBarWebview from '@/components/ProgressBarWebview';

export default function PrivacyPolicyPage() {
    return <ProgressBarWebview source={{ uri: Config.WEB_PAGE_URI + 'privacy-policy' }} />;
}
