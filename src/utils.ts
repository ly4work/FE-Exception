export default class Util {
    public static prefix: string = 'wws'
    public static isDev: boolean =
        location.href.indexOf('test') > -1
        || /\d+\.\d+\.\d+\.\d+/g.test(location.href)

    public static generateHash(): string {
        return this.prefix + '_' + (+new Date()).toString(36) + Math.random().toString(36).substr(2, 6)
    }
    public static getUid(): string {
        let id: string
        let token: string = this.getCookie(`${this.isDev ? 4 : 1}&_token`)
        if (token) {
            id = token.split('&')[0]
            return id
        } else {
            return ''
        }
    }
    public static getCookie(name: string): string {
        let cookieValue = ''
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';')
            for (var i = 0; i < cookies.length; i++) {
                var cookie = (cookies[i] + '').trim()
                if (cookie.substring(0, name.length + 1) === name + '=') {
                    cookieValue = decodeURIComponent(
                        cookie.substring(name.length + 1)
                    )
                    break
                }
            }
        }
        return cookieValue
    }
}