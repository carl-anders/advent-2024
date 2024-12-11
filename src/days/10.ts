import { move_delta_list } from '../helpers/direction'
import { addPosition, Position } from '../helpers/position2d'

export function parse(input: string) {
    return input.split(/\r?\n/).map((line) => line.split('').map(Number))
}

function trail_positions(
    map: number[][],
    pos: Position,
    top_positions: Set<string>
) {
    const height = map[pos.y][pos.x]
    if (height == 9) {
        top_positions.add(`${pos.y}_${pos.x}`)
    }
    for (const dir of move_delta_list) {
        const new_pos = addPosition(pos, dir)
        if (map[new_pos.y]?.[new_pos.x] == height + 1) {
            trail_positions(map, new_pos, top_positions)
        }
    }
}

export function part1(map: number[][]) {
    let score = 0
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] > 0) {
                continue
            }
            const top_positions = new Set<string>()
            trail_positions(map, { x: x, y: y }, top_positions)
            score += top_positions.size
        }
    }
    return score
}

function trail_score(map: number[][], pos: Position): number {
    const height = map[pos.y][pos.x]
    if (height == 9) {
        return 1
    }
    let score = 0
    for (const dir of move_delta_list) {
        const new_pos = addPosition(pos, dir)
        if (map[new_pos.y]?.[new_pos.x] == height + 1) {
            score += trail_score(map, new_pos)
        }
    }
    return score
}

export function part2(map: number[][]) {
    let score = 0
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] > 0) {
                continue
            }
            score += trail_score(map, { x: x, y: y })
        }
    }
    return score
}
