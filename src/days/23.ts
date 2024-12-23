export function parse(input: string) {
    return input
        .split(/\r?\n/)
        .map((line) => line.split('-') as [string, string])
}
function addToMapArr(map: Map<string, string[]>, key: string, value: string) {
    const found = map.get(key)
    if (found == undefined) {
        map.set(key, [value])
    } else {
        found.push(value)
    }
}
export function part1(input: [string, string][]) {
    const edges = new Map<string, string[]>()
    for (const path of input) {
        addToMapArr(edges, path[0], path[1])
        addToMapArr(edges, path[1], path[0])
    }

    const threes = new Set<string>()
    for (const [first_key, first_val] of edges) {
        if (first_key.startsWith('t')) {
            for (const second_key of first_val) {
                for (const third_key of edges.get(second_key) ?? []) {
                    if (
                        third_key != first_key &&
                        (edges.get(third_key) ?? []).includes(first_key)
                    ) {
                        const found_set = [first_key, second_key, third_key]
                        found_set.sort()
                        threes.add(found_set.join(''))
                    }
                }
            }
        }
    }
    return threes.size
}
import BronKerbosch from '@seregpie/bron-kerbosch'

export function part2(input: [string, string][]) {
    const edges: [string, string][] = []
    for (const path of input) {
        edges.push([path[0], path[1]])
        edges.push([path[1], path[0]])
    }

    let password = ''
    let password_length = 0
    for (const clique of BronKerbosch(edges)) {
        if (clique.length > password_length) {
            password_length = clique.length
            clique.sort()
            password = clique.join(',')
        }
    }
    return password
}
