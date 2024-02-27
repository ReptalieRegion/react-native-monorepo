import type { FetchAdoptionPostList } from './adoption';

type QueryKey =
    | string
    | {
          type?: string;
          date?: string;
      };

type CustomQueryKey = readonly QueryKey[];

type AdoptionFilterQueryKey = (string | FetchAdoptionPostList['Request'])[];

export type { AdoptionFilterQueryKey, CustomQueryKey };
