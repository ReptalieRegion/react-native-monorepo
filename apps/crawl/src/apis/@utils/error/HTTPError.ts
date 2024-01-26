export interface HTTPErrorField {
    msg: string;
    statusCode: number;
    code: number;
    path: string;
    timestamp: string;
}

export default class HTTPError extends Error implements Omit<HTTPErrorField, 'msg'> {
    statusCode: number;
    code: number;
    path: string;
    timestamp: string;

    constructor(msg: string, statusCode: number, code: number, path: string, timestamp: string) {
        super(msg);
        this.name = 'HTTPError';
        this.statusCode = statusCode;
        this.code = code;
        this.path = path;
        this.timestamp = timestamp;
    }
}
