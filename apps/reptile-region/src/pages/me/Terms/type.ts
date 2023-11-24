export enum TERMS_TYPE {
    TITLE,
    ARTICLE,
    NUMBER_ARTICLE,
}

export interface Title {
    type: TERMS_TYPE.TITLE;
    contents: string;
}

export interface Article {
    type: TERMS_TYPE.ARTICLE;
    subTitle: string;
    contents: string;
}

export interface NumberArticle {
    type: TERMS_TYPE.NUMBER_ARTICLE;
    subTitle: string;
    contents: string[];
}

export type Terms = Title | Article | NumberArticle;
