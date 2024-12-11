export function parse(input: string) {
    const rows = []
    for (const row of input.split(/\r?\n/)) {
        const nums = row.split(' ').map((s) => {
            return Number(s)
        })
        rows.push(nums)
    }

    return rows
}

function check_safety(values: number[]) {
    const increasing = values[1] > values[0]
    for (let i = 0; i < values.length - 1; i++) {
        const diff = Math.abs(values[i] - values[i + 1])
        if (
            diff == 0 ||
            diff > 3 ||
            (increasing && values[i + 1] < values[i]) ||
            (!increasing && values[i + 1] > values[i])
        ) {
            return false
        }
    }
    return true
}

export function part1(input: number[][]) {
    return input.filter((values) => check_safety(values)).length
}

function check_pruned_safety(values: number[]) {
    for (let j = 0; j < values.length; j++) {
        const pruned_values = values.filter((_, index) => index != j)
        if (check_safety(pruned_values)) {
            return true
        }
    }
    return false
}

export function part2(input: number[][]) {
    return input.filter((values) => check_pruned_safety(values)).length
}
