// 初始化劫持节点，进行模板编译
let _compile = function (node, $vm) {
    let reg = /\{\{(.*)\}\}/

    Array.prototype.slice.call(node.childNodes).forEach(node => {
        // dom节点
        if (isElementNode(node)) {
            // 属性编译
            compileNode(node, $vm)
        }
        // 文本节点
        if (isTextNode(node) && reg.test(node.textContent)) {
            //传入与正则式匹配的第一个字符串
            new Watcher($vm, 'text', node, null, RegExp.$1)
        }
        if (node.childNodes && node.childNodes.length) {
            _compile(node, $vm)
        }
    })
}
// 对节点属性进行编译
let compileNode = function (node, $vm) {
    if(node.hasAttribute('v-model')){
        new Watcher($vm, 'dir', node, 'value', node.getAttribute('v-model'), 'v-model')
    }
    if(node.hasAttribute('@click')){
        node.onclick = () => {
            $vm.$methods[node.getAttribute('@click')].call($vm.$data)
        }
    }
}

isElementNode = function(node) {
    return node.nodeType === 1
}

isTextNode = function(node) {
    return node.nodeType === 3
}