import { Position } from '../helpers/position2d'
import { RealMapN } from '../helpers/realmap'

export function parse(input: string) {
    return input.split(/\r?\n/)
}

export function part1(input: string[]) {
    return moveRobotsDepth(input, 3)
}

export function part2(input: string[]) {
    return moveRobotsDepth(input, 26)
}

type PB = [Position, boolean]
const PBKeyFn = function (key: PB): number {
    return key[0].x * 1000 + key[0].y * 10 + (key[1] ? 1 : 0)
}

function getPos(map: Map<string, Position>, key: string): Position {
    const pos = map.get(key)
    if (pos == undefined) {
        return { x: 0, y: 0 }
    } else {
        return { x: pos.x, y: pos.y }
    }
}

function move_counts(
    pad: Map<string, Position>,
    space: Position,
    code: string,
    presses: number
): RealMapN<PB, number> {
    // Inputs always start at A. As code always ends on A.
    let current = getPos(pad, 'A')
    const move_counts = new RealMapN<PB, number>(PBKeyFn)
    for (const c of code) {
        const target = getPos(pad, c)
        const norm_path =
            (target.y == space.y && current.x == space.x) ||
            (target.x == space.x && current.y == space.y)
        move_counts.getSet(
            [{ x: target.x - current.x, y: target.y - current.y }, !norm_path],
            (value) => (value ?? 0) + presses
        )
        current = target
    }
    return move_counts
}

function pattern(pos: Position, reverse: boolean) {
    let pattern =
        '>'.repeat(pos.x > 0 ? pos.x : 0) +
        '^'.repeat(pos.y < 0 ? -pos.y : 0) +
        'v'.repeat(pos.y > 0 ? pos.y : 0) +
        '<'.repeat(pos.x < 0 ? -pos.x : 0)
    if (reverse) {
        pattern = pattern.split('').reverse().join('')
    }
    return pattern
}

function moveRobotsDepth(codes: string[], depth: number) {
    const keypad = new Map([
        ['7', { x: 0, y: 0 }],
        ['8', { x: 1, y: 0 }],
        ['9', { x: 2, y: 0 }],
        ['4', { x: 0, y: 1 }],
        ['5', { x: 1, y: 1 }],
        ['6', { x: 2, y: 1 }],
        ['1', { x: 0, y: 2 }],
        ['2', { x: 1, y: 2 }],
        ['3', { x: 2, y: 2 }],
        ['0', { x: 1, y: 3 }],
        ['A', { x: 2, y: 3 }],
    ])
    const keypad_space = { x: 0, y: 3 }
    const dirpad = new Map([
        ['^', { x: 1, y: 0 }],
        ['A', { x: 2, y: 0 }],
        ['<', { x: 0, y: 1 }],
        ['v', { x: 1, y: 1 }],
        ['>', { x: 2, y: 1 }],
    ])
    const dirpad_space = { x: 0, y: 0 }

    let total = 0
    for (const code of codes) {
        let mc = move_counts(keypad, keypad_space, code, 1)
        for (let i = 0; i < depth; i++) {
            const new_mc = new RealMapN<PB, number>(PBKeyFn)
            mc.forEach(([pos, reverse], presses) => {
                move_counts(
                    dirpad,
                    dirpad_space,
                    pattern(pos, reverse) + 'A',
                    presses
                ).forEach((key, val) => {
                    new_mc.getSet(key, (value) => (value ?? 0) + val)
                })
            })
            mc = new_mc
        }
        let moves = 0
        mc.forEach((_k, val) => {
            moves += val
        })
        total += moves * parseInt(code, 10)
    }
    return total
}
