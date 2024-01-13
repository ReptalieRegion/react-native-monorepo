import fetcher from './fetcher';

const initRefreshFailCallback = fetcher.initRefreshFailCallback;
const clientFetch = fetcher.clientFetch;

export * from './constants';
export { initRefreshFailCallback };
export default clientFetch;
