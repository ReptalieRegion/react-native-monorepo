type QueryKey =
    | string
    | {
          type?: string;
          date?: string;
      };

type CustomQueryKey = readonly QueryKey[];

export type { CustomQueryKey };
