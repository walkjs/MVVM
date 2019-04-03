
import { Observe } from './Observer.js';
import { Compile } from './Compiler.js';
export class Vue {
    constructor($vm) {
        this.$vm = $vm
        this.$options = Object.assign($vm.data, $vm.methods)
        this.$el = document.querySelectorAll($vm.el)[0];
        this.$data = $vm.data;
        this.$methods = $vm.methods;
        this._init();
    }
    _init() {
        const observe = new Observe();
        const compile = new Compile();
        this.callHook('created')
        observe._observe(this.$data);
        compile._compile(this.$el, this);
        this.callHook('mounted')
    }
    callHook(str) {
        if (this.$vm[str]) {
            console.log(this.$vm[str])
            this.$vm[str].call(this.$options)
        }
    }
}