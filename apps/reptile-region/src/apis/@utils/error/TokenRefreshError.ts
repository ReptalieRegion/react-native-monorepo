export default class TokenRefreshError extends Error {
    statusCode?: number;

    constructor(message?: string, statusCode?: number) {
        super(message);
        this.name = 'TokenRefreshError';
        this.statusCode = statusCode;
    }
}
