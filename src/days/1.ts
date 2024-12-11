export function parse(input: string) {
    const left: number[] = []
    const right: number[] = []
    for (const row of input.split(/\r?\n/)) {
        const sides = row.split('   ')
        left.push(Number(sides[0]))
        right.push(Number(sides[1]))
    }

    return [left, right]
}

export function part1(input: number[][]) {
    const [left, right] = input
    left.sort()
    right.sort()

    let distance = 0

    left.forEach((l, index) => {
        const r: number = right[index]
        const diff = Math.abs(l - r)
        distance += diff
    })

    return distance
}

export function part2(input: number[][]) {
    const [left, right] = input

    let score = 0
    left.forEach((l) => {
        score += l * right.filter((x) => x == l).length
    })

    return score
}
