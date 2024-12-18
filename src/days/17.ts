interface Registers {
    a: bigint
    b: bigint
    c: bigint
    counter: number
}

interface Input {
    regs: Registers
    program: number[]
}

export function parse(input: string) {
    const [regs, program] = input.split(/\r?\n\r?\n/)
    const reg_nums = regs
        .split(/\r?\n/)
        .map((line) => BigInt(line.split(' ')[2]))
    return {
        regs: { a: reg_nums[0], b: reg_nums[1], c: reg_nums[2], counter: 0 },
        program: program.slice(9).split(',').map(Number),
    }
}

export function part1(input: Input) {
    const { regs, program } = input
    return runProgram(program, regs).join(',')
}

function comboOp(op: number, registers: Registers): bigint {
    if (op < 4) {
        return BigInt(op)
    } else if (op == 4) {
        return registers.a
    } else if (op == 5) {
        return registers.b
    } else if (op == 6) {
        return registers.c
    } else {
        console.log('Invalid operand')
        return BigInt(0)
    }
}

enum OpCode {
    adv = 0,
    bxl = 1,
    bst = 2,
    jnz = 3,
    bxc = 4,
    out = 5,
    bdv = 6,
    cdv = 7,
}

function runOp(
    registers: Registers,
    op_code: OpCode,
    literal: number
): number[] {
    const combo = comboOp(literal, registers)
    switch (op_code) {
        case OpCode.adv: {
            const den = Math.pow(2, Number(combo))
            registers.a = registers.a / BigInt(den)
            break
        }
        case OpCode.bxl: {
            registers.b ^= BigInt(literal)
            break
        }
        case OpCode.bst: {
            registers.b = combo % BigInt(8)
            break
        }
        case OpCode.jnz: {
            if (registers.a !== BigInt(0)) {
                registers.counter = literal
            }
            break
        }
        case OpCode.bxc: {
            registers.b ^= registers.c
            break
        }
        case OpCode.out: {
            return [Number(combo % BigInt(8))]
        }
        case OpCode.bdv: {
            const den = Math.pow(2, Number(combo))
            registers.b = registers.a / BigInt(den)
            break
        }
        case OpCode.cdv: {
            const den = Math.pow(2, Number(combo))
            registers.c = registers.a / BigInt(den)
            break
        }
    }
    return []
}

function runProgram(program: number[], regs: Registers): number[] {
    const outputs = []
    while (regs.counter + 1 < program.length && regs.counter >= 0) {
        const opcode = program[regs.counter]
        const literal = program[regs.counter + 1]
        regs.counter += 2
        const result = runOp(regs, opcode, literal)
        if (result.length == 1) {
            outputs.push(result[0])
        }
    }
    return outputs
}

export function part2(input: Input) {
    const { program } = input

    const recursiveA = (a: bigint, depth: number): bigint => {
        const output = runProgram(program, {
            a: a,
            b: BigInt(0),
            c: BigInt(0),
            counter: 0,
        })
        if (depth == 0 || output[0] == program[program.length - depth]) {
            if (program.length == output.length) {
                return a
            }

            for (let i = 0; i < 8; i++) {
                const recurse = recursiveA(a * BigInt(8) + BigInt(i), depth + 1)
                if (recurse > 0) {
                    return recurse
                }
            }
        }
        return BigInt(0)
    }
    return Number(recursiveA(BigInt(0), 0))
}
