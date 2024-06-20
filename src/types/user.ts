export type loginDataType = {
    username?: string;
    password?: string;
    auto?: string;
};


export type userInfoType = {
    username: string;
    password: string;
    email: string;
}

export type emailType = {
    email: string;
    type:string
}

export type remeberDataType = {
    email: 'string',
    password: 'string',
    code: 'string',
}

export type registerDataType = {
    email: 'string',
    password: 'string',
    username: 'string',
    code: 'string',
}