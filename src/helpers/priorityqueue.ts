import { sortedIndexBy } from 'lodash'

export interface Store<T> {
    value: T
    cost: number
}
export class Queue<T> {
    store: Store<T>[]
    constructor() {
        this.store = []
    }
    push(value: T, cost: number) {
        const item = { value: value, cost: cost }
        this.store.splice(
            sortedIndexBy(this.store, item, (o) => o.cost),
            0,
            item
        )
    }
    pop(): Store<T> | undefined {
        return this.store.shift()
    }
    is_empty(): boolean {
        return this.store.length == 0
    }
}
