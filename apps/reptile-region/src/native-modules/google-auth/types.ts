type GoogleUser = {
    familyName: string;
    givenName: string;
    id: string;
    name: string;
    password: string | null;
    photo: string | null;
};

type GoogleResult = {
    idToken: string;
    user: GoogleUser;
};

export type { GoogleResult };
