import {ProxyStatusEnum} from '../enums/proxy-status.enum';
import {watchFunctionType} from '../types/watch-function.type';

const proxyMap: Map<object, watchFunctionType[]> = new Map();

export const isProxy = (value: any): boolean => {
    if (value == null) {
        return false;
    }

    return !!value[ProxyStatusEnum.isProxy];
};

export const addWatcher = (proxy: any, cb: watchFunctionType) => {
    let proxyListeners = proxyMap.get(proxy) || [];
    let proxyTmp = proxy;

    if (!isProxy(proxy)) {
        proxyTmp = createProxy(proxy);
    }

    proxyListeners.push(cb);
    proxyMap.set(proxyTmp, proxyListeners);
    return proxyTmp;
}

export const removeWatcher = (proxy: any, cb: watchFunctionType) => {
    const listeners = proxyMap.get(proxy) || [];
    const index = listeners.findIndex(listenerCallback =>  listenerCallback === cb);
    if (index > -1) {
        listeners.splice(index, 1);
    }

    if (listeners.length === 0) {
        proxyMap.delete(proxy);
    } else {
        proxyMap.set(proxy, listeners);
    }
};


const createProxy = (value: any) => {
    return new Proxy(value, {
        get: (target: any, p: string) => {
            if (p === ProxyStatusEnum.isProxy) {
                return true;
            }

            return target[p];
        },
        set: (target: any, p: string, value: any, receiver) => {
            const oldValue = target[p];
            const isCurrentValueProxy = isProxy(oldValue);
            const isNewValueProxy = isProxy(value);
            const listenerStack = proxyMap.get(receiver) || [];

            if (isCurrentValueProxy && !isNewValueProxy) {
                const olValueListeners = proxyMap.get(oldValue) || [];
                value = createProxy(value);
                proxyMap.delete(oldValue);
                proxyMap.set(value, olValueListeners);
                listenerStack.forEach(cb => cb(oldValue, value, receiver));
            }
            target[p] = value;
            listenerStack.forEach(cb => cb(oldValue, value, receiver));
            return true;
        }
    });
};
