interface Equation {
    result: number
    values: number[]
}

export function parse(input: string) {
    return input.split(/\r?\n/).map((line) => {
        const [result, values] = line.split(': ')
        return { result: Number(result), values: values.split(' ').map(Number) }
    })
}

function optest(eq: Equation, left: number, index: number): boolean {
    if (left > eq.result) {
        return false
    }
    const add = left + eq.values[index]
    const mult = left * eq.values[index]

    if (index + 1 == eq.values.length) {
        return add == eq.result || mult == eq.result
    } else {
        return optest(eq, add, index + 1) || optest(eq, mult, index + 1)
    }
}

export function part1(input: Equation[]) {
    let result = 0
    for (const eq of input) {
        if (optest(eq, eq.values[0], 1)) {
            result += eq.result
        }
    }
    return result
}

function concatenate(a: number, b: number) {
    return a * Math.pow(10, Math.floor(Math.log10(b) + 1)) + b
}

function optest2(eq: Equation, left: number, index: number): boolean {
    if (left > eq.result) {
        return false
    }
    const add = left + eq.values[index]
    const mult = left * eq.values[index]
    const conc = concatenate(left, eq.values[index])

    if (index + 1 == eq.values.length) {
        return add == eq.result || mult == eq.result || conc == eq.result
    } else {
        return (
            optest2(eq, add, index + 1) ||
            optest2(eq, mult, index + 1) ||
            optest2(eq, conc, index + 1)
        )
    }
}

export function part2(input: Equation[]) {
    let result = 0
    for (const eq of input) {
        if (optest2(eq, eq.values[0], 1)) {
            result += eq.result
        }
    }
    return result
}
