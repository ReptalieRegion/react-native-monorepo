import { useQuery } from '@tanstack/react-query';

import { fetchWebviewPage } from '../repository';

import { WEB_VIEW } from '@/apis/@utils/query-keys';

export default function useFetchWebView(path: string) {
    return useQuery({
        queryKey: WEB_VIEW.webview(path),
        queryFn: () => fetchWebviewPage(path),
        staleTime: 5 * 60 * 1000,
        gcTime: 6 * 60 * 1000,
    });
}
