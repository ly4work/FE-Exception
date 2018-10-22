const errorMap = {
    message: '错误类型:',
    filename: '错误脚本:',
    lineno: '出错代码行数:',
    colno: '出错代码列数:',
    error: '完整错误信息:'
}
const Exception = {
    error: (error) => {
        console.log('出错信息： \n', error)
        // console.log('====================================');
        console.log(typeof error.error.stack);
        // console.log('====================================');
        logger(error, '.error-content')
    },
    unHandledRejection: (error) => {
        console.log('出错信息： \n', error)
        logger(error, '.rejection-content')
    }
}
//  由于网络请求异常不会事件冒泡，
//  因此必须在捕获阶段将其捕捉到才行
//  虽然可以捕捉到网络请求的异常，但是无法判断 HTTP 的状态是 404 还是其他比如 500 
//  所以还需要配合服务端日志才进行排查分析才可以。

window.addEventListener('error', error => {
    Exception.error(error)
    return true
}, true)

// unhandledrejection捕获promise的异常错误，一般用于ajax接口报错，但有兼容性问题
window.addEventListener('unhandledrejection', error => {
    Exception.unHandledRejection(error)
    return true
}, true)


function logger(info, wrapper) {
    const content = document.querySelector(wrapper)
    for(let key in info) {
        if(errorMap.hasOwnProperty(key)) {
            content.appendChild(createElement(`<p class='error'>${key}</p><p class='info'>${info[key]}</p>`))
        }
    }
}

function createElement(html) {
    const newElement =  document.createElement('div')
    newElement.innerHTML = html
    return newElement
}

window.Exception = Exception