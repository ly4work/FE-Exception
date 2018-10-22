export interface ErrorLog {
    tag: string,
    userInfo: {
        isLogin: boolean,
        uid: string
    },
    deviceInfo: {
        client: 'h5',
        ua: string,
        system: string,
        isWeixin: boolean,
        isApp: boolean,
        // brand: string,
        version: string
    },
    pageInfo: {
        url: string,
        title: string,
        routerLength: number
    },
    errorInfo: {
        type: number,
        desc: string,
        level: number,
        filename: string,
        message: string,
        errorStack: object,
        lineno: number,
        colno: number,
        t: number
    }
}