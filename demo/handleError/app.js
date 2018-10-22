let name = 'nardo'

// try {
//     name.map((item, i) => {
//         return item.name
//     })
// }catch(e) {
//     console.log(e)
//     Exception.error(e)
// }

let error500 = new Promise((resolve, reject) => {
    return reject(500)
})
var h1 = document.querySelector('h1')

// var node = document.getElementsByTagName('h1').item(0);
// var refnode = node.nextSibling;
// var newnode = document.createTextNode('这就是为何你挂了！');
// node.insertBefore(newnode, refnode);

h1.addEventListener('click', () => {
    console.log('====================================');
    console.log(111);
    console.log('====================================');
    name.map((item, i) => {
        return item.name
    })
}, false)


