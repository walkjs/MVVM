
import { parsePath } from "./utils.js";

let target = null;

export class Watcher {
    constructor($vm, type, el, attr, exp, attrName) {
        // vue实例
        this.$vm = $vm;
        // 绑定的类型
        this.type = type;
        // 变量对应节点
        this.el = el;
        // 指令对应的属性
        this.attr = attr;
        // 指令或者{{}}对应的变量值
        this.exp = exp;
        // 绑定的指令
        this.attrName = attrName;
        this.value = this._init();
        this._update();
        if(this.attrName === 'v-model'){
            this.el.addEventListener('input', (val) => {
                //触发set
                $vm.$data[this.exp] = val.target.value;
            });
        }
    }
    _init() {
        target = this;
        // 为了调用get将自身添加
        let value = parsePath(this.exp)(this.$vm.$data);
        target = null;
        return value;
    }

    _update() {
        if(this.type === 'dir'){
            this.el[this.attr] = this.value;
        }
        // {{}}
        else if(this.type === 'text'){
            this.el.textContent = this.value;
        }
    }
}
export { target };