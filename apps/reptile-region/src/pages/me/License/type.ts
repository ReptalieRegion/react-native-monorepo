import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '@/types/routes/param-list';

// 라이선스 상세 페이지
type LicenseContentScreenProps = NativeStackScreenProps<RootRoutesParamList, 'me/license/contents'>;

// 라이선스 페이지
type LicenseListScreenProps = NativeStackScreenProps<RootRoutesParamList, 'me/license'>;

type License = {
    libraryName: string;
    description?: string;
    licenseType: string;
    licenseContent: string;
    homepage?: string;
};

export type { License, LicenseContentScreenProps, LicenseListScreenProps };
