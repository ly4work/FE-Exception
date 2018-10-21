const errorMap = {
    msg: '错误类型:',
    url: '错误脚本:',
    row: '出错代码行数:',
    col: '出错代码列数:',
    error: '完整错误信息:'
}
const Exception = {
    error: (msg, url, row, col, error) => {
        console.log('出错信息： \n', {
            msg,url, row, col, error
        })
        logger({
            msg,url, row, col, error
        }, '.error-content')
    }
}
//  onerror的方式，无法捕获到网络异常，而且捕获的错误信息也非常有限
//  对于跨域调用的js脚本，onerror事件只会给出很少的报错信息：error: Script error.
//  这个简单的信息很明显不足以看出脚本的具体错误
//  使用crossorigin属性，使得加载的跨域脚本可以得出跟同域脚本同样的报错信息
window.onerror = Exception.error

function logger(info, wrapper) {
    const content = document.querySelector(wrapper)
    const errorElements = Object.keys(info).map((k, i) => {
        content.appendChild(createElement(`<p class='err'>${errorMap[k]}</p><p class='info'>${info[k]}</p>`))
    })
}

function createElement(html) {
    const newElement =  document.createElement('div')
    newElement.innerHTML = html
    return newElement
}
window.Exception = Exception