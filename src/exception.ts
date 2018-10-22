import Util from './utils'
export interface HashMap<K, V> {
    key: K,
    value: V
}

export class Exception<K, V> {
    /**
     * 异常错误类型Map
     * @type: 错误类型id
     * @desc: 错误描述
     * @level: 预警级别
     */
    public __ERROR_TYPE__ = {
        audio: { type: 0, desc: '音频加载', level: 1 },
        video: { type: 1, desc: '视频加载', level: 1 },
        script: { type: 2, desc: 'js加载', level: 0, },
        link: { type: 3, desc: 'css加载', level: 0, },
        img: { type: 4, desc: 'img加载', level: 2 },
        window: { type: 5, desc: 'js runtime错误', level: 0 }
    }
    /**
     * 全局使用参数
     * @url: 上报日志url
     */
    private __WWS__ = {
        url: 'http://wws.com',
        errorListenerStatus: false
    }
    /**
     * 安卓品牌map
     */
    private __ANDROID_BRAND__ = {
        SM: '三星',
        MI: '小米',
        HUA: '华为',
        OP: 'OPPO',
        VV: 'vivo'
    }
    /**
     * 获取用户信息
     */
    public getUserInfo(): object {
        const uid: string = Util.getUid()
        const userInfo = {
            isLogin: !!uid,
            uid
        }
        return userInfo
    }
    /**
     * 获取设备信息
     */
    public getDeviceInfo(): object {
        const ua: string = window.navigator.userAgent.toLowerCase()

        const system: string = !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/) ? 'ios' : 'android'
        let version: string = '0.0.0'
        try {
            if (system === 'ios') {
                version = ua.split(';')[1].match(/(\d+)_(\d+)_?(\d+)?/)[0].split('_').join('.')
            } else {
                version = ua.match(/android\W*(\d+)\.(\d+)\.?(\d+)?/g)[0]
            }
        } catch (e) { }

        const deviceInfo = {
            client: 'ontouchstart' in window ? 'h5' : 'web',
            ua,
            system,
            isWeixin: ua.indexOf('micromessenger') > -1,
            isApp: ua.indexOf('iting') > -1,
            version
        }
        return deviceInfo
    }
    /**
     * 获取页面信息
     */
    public getPageInfo(): object {
        return {
            url: window.location.href,
            title: document.title,
            routerLength: window.history.length
        }
    }
    /**
     * 获取错误信息
     */
    public getErrorInfo(error): object {
        const errorInfo: any = {}
        let errorTarget: string = ''
        let filename: string = ''
        let message: string = 'loading error'
        let errorStack: string | null = null
        let lineno: number = 0
        let colno: number = 0
        //  分析错误类型
        if (error instanceof ErrorEvent) {
            errorTarget = 'window'
            filename = error.filename

            message = error.message
            errorStack = error.error.stack
            lineno = error.lineno
            colno = error.colno
        } else {
            errorTarget = error.target.localName
            filename = error.target.src || error.target.href
        }

        (<any>Object).assign(
            errorInfo,
            this.__ERROR_TYPE__[errorTarget],
            {
                filename,
                message,
                errorStack,
                lineno,
                colno,
                t: new Date().toLocaleString()
            }
        )

        return errorInfo
    }
    /**
     * 格式化参数
     */
    private serialize(error) {
        const tag: string = Util.generateHash()

        const userInfo = this.getUserInfo()

        const deviceInfo = this.getDeviceInfo()

        const pageInfo = this.getPageInfo()

        const errorInfo = this.getErrorInfo(error)
        console.log(' ===== error ==================================== error');
        console.log({
            tag,
            userInfo,
            deviceInfo,
            pageInfo,
            errorInfo
        })
        console.log('===== error ==================================== error');
    }

    public start(): void {
        // 避免多次监听
        if (!this.__WWS__.errorListenerStatus) {
            window.addEventListener('error', err => {
                this.serialize(err)
                return true
            }, true)
        }
        this.__WWS__.errorListenerStatus = true
    }

    private post(data: string, url: string): void {
        const xhr: XMLHttpRequest = new XMLHttpRequest()
        xhr.open('post', url, true)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.send(data)
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //  上报成功
            }
        }
    }
    private report(data: string): void {
        this.post(data, this.__WWS__.url)
    }
}
new Exception<string, any>().start()
