import { Dep } from "./Dep.js";

export class Observe {
    constructor() {
        this.target = null;
    }

    // 数据监听
    _observe(data) {

        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach( key => {
            let dep = new Dep();
            let val = data[key];
            this._observe(val);

            Object.defineProperty(data, key, {
                enumerable: true,
                configurable: true,

                get() {
                    // 初始化将watcher添加进来
                    this.target && dep._addSub(this.target);
                    return val;
                },
                set(newVal) {
                    if (newVal !== val) {
                        val = newVal;
                        // 数据变动通知更新视图
                        dep._notify(newVal);
                    }
                }
            })
        })
    }
}