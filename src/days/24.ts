export function parse(input: string) {
    const [nums, wires] = input.split(/\r?\n\r?\n/)
    const wire_map = new Map<string, Wire>()
    for (const line of nums.split(/\r?\n/)) {
        const [name, value] = line.split(': ')
        wire_map.set(name, {
            type: WireType.Num,
            inputs: [],
            name,
            value: Number(value),
        })
    }
    for (const line of wires.split(/\r?\n/)) {
        const [inputs, output] = line.split(' -> ')
        const [input1, type, input2] = inputs.split(' ')
        wire_map.set(output, {
            type:
                type == 'XOR'
                    ? WireType.Xor
                    : type == 'AND'
                      ? WireType.And
                      : WireType.Or,
            inputs: [input1, input2],
            name: output,
            value: undefined,
        })
    }
    return wire_map
}
enum WireType {
    Num,
    Xor,
    And,
    Or,
}
interface Wire {
    type: WireType
    inputs: string[]
    name: string
    value: number | undefined
}

export function part1(wires: Map<string, Wire>) {
    const zs = []
    for (const [name, wire] of wires) {
        if (name.startsWith('z')) {
            find_value(wires, name)
            const a: [string, number] = [name, wire.value ?? 0]
            zs.push(a)
        }
    }
    const val = parseInt(
        zs
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([, value]) => value)
            .join(''),
        2
    )
    return val
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: Map<string, Wire>) {
    return 0
}
function find_value(wires: Map<string, Wire>, name: string): number {
    const wire = wires.get(name)
    if (wire == undefined) {
        return 0
    }
    if (wire.value != undefined) {
        return wire.value
    }
    const left = find_value(wires, wire.inputs[0])
    const right = find_value(wires, wire.inputs[1])
    switch (wire.type) {
        case WireType.Xor:
            wire.value = left ^ right
            break
        case WireType.And:
            wire.value = left & right
            break
        case WireType.Or:
            wire.value = left | right
            break
    }
    return wire.value ?? 0
}
