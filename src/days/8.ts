import * as Pos from '../helpers/position2d'
type Position = Pos.Position
interface Antenna {
    name: string
    locations: Position[]
}
interface Input {
    antennae: Antenna[]
    bounds: Position
}

export function parse(input: string) {
    let max_x = 0
    let max_y = 0
    const antennae = new Map<string, Position[]>()
    input.split(/\r?\n/).forEach((line, y) => {
        line.split('').forEach((c, x) => {
            if (c != '.') {
                if (!antennae.has(c)) {
                    antennae.set(c, [])
                }
                antennae.get(c)?.push({ x: x, y: y })
            }
            max_x = x
        })
        max_y = y
    })

    return {
        antennae: Array.from(antennae, ([key, value]) => {
            return { name: key, locations: value }
        }),
        bounds: { x: max_x, y: max_y },
    }
}

export function part1(input: Input) {
    const { antennae, bounds } = input
    const antinodes = new Set<number>()

    const factor = bounds.y + 1

    for (const antenna of antennae) {
        for (const first of antenna.locations) {
            for (const second of antenna.locations) {
                if (first == second) {
                    continue
                }
                const pos = {
                    x: first.x + first.x - second.x,
                    y: first.y + first.y - second.y,
                }
                if (Pos.inBoundsInclusive(pos, bounds)) {
                    antinodes.add(pos.x * factor + pos.y)
                }
            }
        }
    }
    return antinodes.size
}

export function part2(input: Input) {
    const { antennae, bounds } = input
    const antinodes = new Set<number>()

    const factor = bounds.y + 1

    for (const antenna of antennae) {
        for (const first of antenna.locations) {
            for (const second of antenna.locations) {
                if (first == second) {
                    continue
                }
                const pos = { ...first }
                while (Pos.inBoundsInclusive(pos, bounds)) {
                    antinodes.add(pos.x * factor + pos.y)
                    pos.x += first.x - second.x
                    pos.y += first.y - second.y
                }
            }
        }
    }
    return antinodes.size
}
