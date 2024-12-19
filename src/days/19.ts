import RE2 from 're2'

interface Input {
    towels: string[]
    patterns: string[]
}

export function parse(input: string) {
    const [towels, patterns] = input.split(/\r?\n\r?\n/)

    return { towels: towels.split(', '), patterns: patterns.split('\n') }
}
export function part1(input: Input) {
    const regex = new RE2(`^(${input.towels.join('|')})+$`)
    return input.patterns.reduce(
        (sum, pattern) => sum + (regex.test(pattern) ? 1 : 0),
        0
    )
}
/*
// Interestingly, RE2 is slightly faster than the very naive recursive function with cache below
export function part1(input: Input) {
    const { towels, patterns } = input

    const cache = new Map<string, boolean>()
    const find_match = (pattern: string): boolean => {
        const cache_get = cache.get(pattern)
        if (cache_get != undefined) {
            return cache_get
        }
        for (const towel of towels) {
            if (pattern.startsWith(towel)) {
                const new_pattern = pattern.slice(towel.length)
                if (new_pattern.length == 0 || find_match(new_pattern)) {
                    cache.set(pattern, true)
                    return true
                }
            }
        }
        cache.set(pattern, false)
        return false
    }
    let sum = 0
    for (const pattern of patterns) {
        if (find_match(pattern)) {
            sum++
        }
    }
    return sum
}
*/

export function part2(input: Input) {
    const { towels, patterns } = input

    const cache = new Map<string, number>()
    const find_match = (pattern: string): number => {
        const cache_get = cache.get(pattern)
        if (cache_get != undefined) {
            return cache_get
        }
        let matches = 0
        for (const towel of towels) {
            if (pattern.startsWith(towel)) {
                const new_pattern = pattern.slice(towel.length)
                if (new_pattern.length == 0) {
                    matches += 1
                } else {
                    matches += find_match(new_pattern)
                }
            }
        }
        cache.set(pattern, matches)
        return matches
    }
    let sum = 0
    for (const pattern of patterns) {
        sum += find_match(pattern)
    }
    return sum
}
