function default_key_fn<K>(key: K): string {
    return JSON.stringify(key)
}
export class RealMap<K, V> {
    map: Map<string, [K, V]>
    keyFn: (key: K) => string
    constructor(keyFn: (key: K) => string = default_key_fn) {
        this.map = new Map()
        this.keyFn = keyFn
    }
    set(key: K, value: V) {
        this.map.set(this.keyFn(key), [key, value])
    }
    getSet(key: K, fn: (value: V | undefined) => V) {
        const real_key = this.keyFn(key)
        const value = this.map.get(real_key)
        this.map.set(real_key, [
            key,
            fn(value == undefined ? undefined : value[1]),
        ])
    }
    get(key: K): V | undefined {
        const found = this.map.get(this.keyFn(key))
        if (found) {
            return found[1]
        } else {
            return undefined
        }
    }
    has(key: K): boolean {
        return this.map.has(this.keyFn(key))
    }
    forEach(fn: (key: K, value: V) => void) {
        this.map.forEach((value) => {
            fn(value[0], value[1])
        })
    }
}
export class RealMapN<K, V> {
    map: Map<number, [K, V]>
    keyFn: (key: K) => number
    constructor(keyFn: (key: K) => number) {
        this.map = new Map()
        this.keyFn = keyFn
    }
    set(key: K, value: V) {
        this.map.set(this.keyFn(key), [key, value])
    }
    getSet(key: K, fn: (value: V | undefined) => V) {
        const real_key = this.keyFn(key)
        const value = this.map.get(real_key)
        this.map.set(real_key, [
            key,
            fn(value == undefined ? undefined : value[1]),
        ])
    }
    get(key: K): V | undefined {
        const found = this.map.get(this.keyFn(key))
        if (found) {
            return found[1]
        } else {
            return undefined
        }
    }
    has(key: K): boolean {
        return this.map.has(this.keyFn(key))
    }
    forEach(fn: (key: K, value: V) => void) {
        this.map.forEach((value) => {
            fn(value[0], value[1])
        })
    }
}
