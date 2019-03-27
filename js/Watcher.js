export class Watcher {
    constructor($vm, type, el, attr, exp, attrName) {
        this.$vm = $vm
        // 绑定的类型
        this.type = type
        // 变量对应节点
        this.el = el
        // 指令对应的变量
        this.attr = attr
        // 指令或者{{}}对应的变量值
        this.exp = exp
        // 绑定的指令
        this.attrName = attrName
        this.value = this._init();
        this._update()
        if(this.attrName === 'v-model'){
            this.el.addEventListener('input', (val) => {
                //触发set
                $vm.$data[this.exp] = val.target.value
            })
        }
    }

    _init() {
        let target = this;
        // 为了调用get将自身添加
        let value = this.$vm.$data[this.exp]
        target = null;
        return value
    }

    _update() {
        if(this.type === 'dir'){
            this.el[this.attr] = this.value
        }
        // {{}}
        else if(this.type === 'text'){
            this.el.textContent = this.value;
        }
    }
}