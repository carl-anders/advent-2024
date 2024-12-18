import { directions } from '../helpers/direction'
import {
    addDirection,
    inBoundsInclusive,
    Position,
} from '../helpers/position2d'
import { Queue } from '../helpers/priorityqueue'

export function parse(input: string) {
    return input.split(/\r?\n/).map((line) => {
        const nums = line.split(',').map(Number)
        return { x: nums[0], y: nums[1] }
    })
}
export function part1(
    input: Position[],
    bounds: Position = { x: 70, y: 70 },
    steps: number = 1024
) {
    const walls = new Set<number>()
    for (let i = 0; i < steps; i++) {
        walls.add(posToKey(input[i]))
    }
    return sparseGridDjik(walls, bounds, { x: 0, y: 0 }, bounds)
}

function posToKey(pos: Position): number {
    return pos.x * 1000 + pos.y
}

function sparseGridDjik(
    walls: Set<number>,
    bounds: Position,
    start: Position,
    end: Position
): number {
    const costs = new Map<number, number>()
    const queue = new Queue<Position>()
    queue.push(start, 0)

    while (!queue.is_empty()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { value: pos, cost } = queue.pop()!

        directions.forEach((dir) => {
            const new_pos = addDirection(pos, dir)
            const new_key = posToKey(new_pos)
            if (inBoundsInclusive(new_pos, bounds) && !walls.has(new_key)) {
                const total_cost = cost + 1
                const stored_cost = costs.get(new_key)
                if (stored_cost == undefined || stored_cost > total_cost) {
                    costs.set(new_key, total_cost)
                    queue.push(new_pos, total_cost)
                }
            }
        })
    }

    return costs.get(posToKey(end)) ?? 0
}

function binarySearchFirst<T>(
    lower: number,
    upper: number,
    goal: T,
    fn: (i: number) => T
): number {
    while (upper > lower) {
        const testpos = lower + Math.floor((upper - lower) / 2)
        if (fn(testpos) == goal) {
            upper = testpos
        } else {
            lower = testpos + 1
        }
    }
    return upper
}

export function part2(input: Position[], bounds: Position = { x: 70, y: 70 }) {
    const found = binarySearchFirst(1, input.length, 0, (steps: number) => {
        const walls = new Set<number>()
        for (let i = 0; i < steps; i++) {
            walls.add(posToKey(input[i]))
        }
        return sparseGridDjik(walls, bounds, { x: 0, y: 0 }, bounds)
    })
    return `${input[found - 1].x},${input[found - 1].y}`
}
