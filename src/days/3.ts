export function part1(input: string) {
    let sum = 0
    for (const match of input.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g)) {
        sum += Number(match[1]) * Number(match[2])
    }
    return sum
}

export function part2(input: string) {
    let sum = 0
    let enabled = true
    for (const match of input.matchAll(
        /do\(\)|don't\(\)|mul\(([0-9]{1,3}),([0-9]{1,3})\)/g
    )) {
        switch (match[0]) {
            case 'do()':
                enabled = true
                break
            case "don't()":
                enabled = false
                break
            default:
                if (enabled) {
                    sum += Number(match[1]) * Number(match[2])
                }
                break
        }
    }
    return sum
}
