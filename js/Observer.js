import { Dep } from "./Dep.js";
import { target } from './Watcher.js';

export class Observe {
    constructor () {

    }

    // 数据监听
    _observe (data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(key => {
            let dep = new Dep();
            let val = data[key];
            this._observe(val);

            Object.defineProperty (data, key, {
                enumerable: true,
                configurable: true,

                get () {
                    // 初始化将watcher添加进来
                    target && dep._addSub(target);
                    return val;
                },
                set (newVal) {
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