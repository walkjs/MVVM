import { Watcher } from './Watcher.js';

export class Compile {

    constructor() {
        // this.$vm = $vm;
    }

    /**
     * 初始化劫持节点，进行模板编译
     * @param {*} node
     * @param {*} $vm
     * @memberof Compile
     */
    _compile(node, $vm) {
        let reg = /\{\{(.*)\}\}/;

        Array.prototype.slice.call(node.childNodes).forEach(node => {
            // dom节点
            if (this.isElementNode(node)) {
                // 属性编译
                this.compileNode(node, $vm);
            }
            // 文本节点
            if (this.isTextNode(node) && reg.test(node.textContent)) {
                //传入与正则式匹配的第一个字符串
                new Watcher($vm, 'text', node, null, RegExp.$1);
            }
            if (node.childNodes && node.childNodes.length) {
                this._compile(node, $vm);
            }
        });
    }

    isElementNode(node) {
        return node.nodeType === 1;
    }

    isTextNode(node) {
        return node.nodeType === 3;
    }

    /**
     * 对节点属性进行编译
     * @param {*} node
     * @param {*} $vm
     * @memberof Compile
     */
    compileNode(node, $vm) {
        if(node.hasAttribute('v-model')){
            new Watcher($vm, 'dir', node, 'value', node.getAttribute('v-model'), 'v-model');
        }
        if(node.hasAttribute('@click')){
            node.onclick = () => {
                $vm.$methods[node.getAttribute('@click')].call($vm.$data);
            }
        }
    }
}