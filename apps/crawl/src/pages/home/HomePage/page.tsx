import React from 'react';
import Config from 'react-native-config';

import ProgressBarWebview from '@/components/ProgressBarWebview';

export default function HomePage() {
    return <ProgressBarWebview source={{ uri: Config.WEB_PAGE_URI }} />;
}
