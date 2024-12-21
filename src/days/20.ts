import { directions } from '../helpers/direction'
import { addDirection, Position, PositionEq } from '../helpers/position2d'

enum Tile {
    Wall,
    Empty,
}

interface Input {
    map: Tile[][]
    start: Position
    end: Position
}

export function parse(input: string) {
    let start = { x: 0, y: 0 }
    let end = { x: 0, y: 0 }
    const map = input.split(/\r?\n/).map((line, y) =>
        line.split('').map((c, x) => {
            switch (c) {
                case '#':
                    return Tile.Wall
                case 'S':
                    start = { x: x, y: y }
                    break
                case 'E':
                    end = { x: x, y: y }
                    break
            }
            return Tile.Empty
        })
    )
    return { map: map, start: start, end: end }
}

export function part1(input: Input, savings: number = 100) {
    const { path, scores } = runSimpleMaze(input.map, input.start, input.end)
    path.splice(path.length - 2, 2)
    let num_cheats = 0
    for (const pos of path) {
        const my_score = scores.get(posToKey(pos)) ?? 0
        manhattanFn(pos, 2, (p) => {
            const score_at = scores.get(posToKey(p)) ?? 0
            const saves = score_at - my_score - 2
            if (saves >= savings) {
                num_cheats++
            }
        })
    }
    return num_cheats
}

function runSimpleMaze(map: Tile[][], start: Position, end: Position) {
    const scores = new Map<number, number>()
    const path = []
    let pos = { x: start.x, y: start.y }
    let walked = 0
    while (true) {
        scores.set(posToKey(pos), walked)
        path.push(pos)
        if (PositionEq(pos, end)) {
            break
        }
        walked++

        for (const dir of directions) {
            const new_pos = addDirection(pos, dir)
            if (
                map[new_pos.y][new_pos.x] == Tile.Empty &&
                !scores.has(posToKey(new_pos))
            ) {
                pos = new_pos
                break
            }
        }
    }
    return { path, scores }
}

function manhattanFn(
    pos: Position,
    radius: number,
    fn: (pos: Position) => void
) {
    for (let i = 0; i < radius; i++) {
        const inv_i = radius - i
        fn({ x: pos.x + i, y: pos.y + inv_i })
        fn({ x: pos.x + inv_i, y: pos.y - i })
        fn({ x: pos.x - i, y: pos.y - inv_i })
        fn({ x: pos.x - inv_i, y: pos.y + i })
    }
}

function posToKey(pos: Position): number {
    return pos.x * 1000 + pos.y
}

export function part2(input: Input, savings: number = 100) {
    const { path, scores } = runSimpleMaze(input.map, input.start, input.end)
    path.splice(path.length - 2, 2)
    let num_cheats = 0
    for (const pos of path) {
        const my_score = scores.get(posToKey(pos)) ?? 0
        for (let range = 2; range <= 20; range++) {
            manhattanFn(pos, range, (p) => {
                const score_at = scores.get(posToKey(p)) ?? 0
                const saves = score_at - my_score - range
                if (saves >= savings) {
                    num_cheats++
                }
            })
        }
    }
    return num_cheats
}
