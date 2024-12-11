type Rules = Set<string>
type Pages = number[]
type Input = {
    rules: Rules
    updates: Pages[]
}

export function parse(input: string) {
    const [rules, updates] = input.split(/\r?\n\r?\n/)
    return {
        rules: new Set(rules.split(/\r?\n/)),
        updates: updates
            .split(/\r?\n/)
            .map((line) => line.split(',').map(Number)),
    }
}

function has_valid_pages(rules: Rules, pages: Pages) {
    for (let left = 0; left < pages.length; left++) {
        for (let right = left + 1; right < pages.length; right++) {
            if (rules.has(`${pages[right]}|${pages[left]}`)) {
                return false
            }
        }
    }
    return true
}

export function part1(input: Input) {
    let answer = 0
    for (const pages of input.updates) {
        if (has_valid_pages(input.rules, pages)) {
            answer += pages[(pages.length - 1) / 2]
        }
    }
    return answer
}

export function part2(input: Input) {
    let answer = 0
    for (const pages of input.updates) {
        if (!has_valid_pages(input.rules, pages)) {
            const sorted = pages.sort((a, b) => {
                if (input.rules.has(`${b}|${a}`)) {
                    return -1
                } else if (input.rules.has(`${a}|${b}`)) {
                    return 1
                }
                return 0
            })
            answer += sorted[(sorted.length - 1) / 2]
        }
    }
    return answer
}
