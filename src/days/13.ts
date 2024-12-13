interface Machine {
    ax: number
    ay: number
    bx: number
    by: number
    prizex: number
    prizey: number
}

export function parse(input: string) {
    return input.split(/\r?\n\r?\n/).map((machine) => {
        const [a, b, prize] = machine
            .split(/\r?\n/)
            .map((line) =>
                [...line.matchAll(/\d+/g)].map((res) => Number(res[0]))
            )
        return {
            ax: a[0],
            ay: a[1],
            bx: b[0],
            by: b[1],
            prizex: prize[0],
            prizey: prize[1],
        }
    })
}

function machine_tokens(machine: Machine) {
    const coefficient = machine.ax * machine.by - machine.bx * machine.ay
    const a = machine.prizex * machine.by - machine.prizey * machine.bx
    const b = machine.ax * machine.prizey - machine.ay * machine.prizex
    if (a % coefficient == 0 && b % coefficient == 0) {
        return (a / coefficient) * 3 + b / coefficient
    }
    return 0
}

export function part1(machines: Machine[]) {
    let result = 0
    for (const machine of machines) {
        result += machine_tokens(machine)
    }
    return result
}

export function part2(machines: Machine[]) {
    let result = 0
    for (const machine of machines) {
        machine.prizex += 10000000000000
        machine.prizey += 10000000000000
        result += machine_tokens(machine)
    }
    return result
}
