import { move_delta_list } from '../helpers/direction'
import { addPosition, Position } from '../helpers/position2d'

function internal_parse(input: string) {
    return input.split(/\r?\n/).map((line) => line.split(''))
}

interface Score {
    area: number
    count: number
}

function garden_travel(
    map: string[][],
    visited: boolean[][],
    score: Score,
    pos: Position
) {
    const plant = map[pos.y][pos.x]
    visited[pos.y][pos.x] = true
    score.area += 1
    for (const dir of move_delta_list) {
        const new_pos = addPosition(pos, dir)
        const near_plant = map[new_pos.y]?.[new_pos.x]
        if (near_plant == plant) {
            if (!visited[new_pos.y][new_pos.x]) {
                garden_travel(map, visited, score, new_pos)
            }
        } else {
            score.count += 1
        }
    }
}

export function part1(input: string) {
    const map = internal_parse(input)
    const visited = Array.from({ length: map.length }, () =>
        Array.from({ length: map[0].length }, () => false)
    )
    let sum_score = 0
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (!visited[y][x]) {
                const score = { area: 0, count: 0 }
                garden_travel(map, visited, score, { x: x, y: y })
                sum_score += score.area * score.count
            }
        }
    }
    return sum_score
}

const corners = [
    [move_delta_list[0], move_delta_list[1]],
    [move_delta_list[1], move_delta_list[2]],
    [move_delta_list[2], move_delta_list[3]],
    [move_delta_list[3], move_delta_list[0]],
]

function garden_edges(
    map: string[][],
    visited: boolean[][],
    score: Score,
    pos: Position
) {
    const plant = map[pos.y][pos.x]
    visited[pos.y][pos.x] = true
    score.area += 1

    for (const [left_dir, right_dir] of corners) {
        const left_pos = addPosition(pos, left_dir)
        const right_pos = addPosition(pos, right_dir)
        const left_plant = map[left_pos.y]?.[left_pos.x]
        const right_plant = map[right_pos.y]?.[right_pos.x]
        // Exterior corner
        if (left_plant != plant && right_plant != plant) {
            score.count += 1
        }
        // Interior corner
        if (left_plant == plant && right_plant == plant) {
            const diagonal_pos = addPosition(left_pos, right_dir)
            const diagonal_plant = map[diagonal_pos.y]?.[diagonal_pos.x]
            if (diagonal_plant != plant) {
                score.count += 1
            }
        }
        // Follow same plants
        if (left_plant == plant && !visited[left_pos.y][left_pos.x]) {
            garden_edges(map, visited, score, left_pos)
        }
    }
}

export function part2(input: string) {
    const map = internal_parse(input)
    const visited = Array.from({ length: map.length }, () =>
        Array.from({ length: map[0].length }, () => false)
    )
    let sum_score = 0
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (!visited[y][x]) {
                const score = { area: 0, count: 0 }
                garden_edges(map, visited, score, { x: x, y: y })
                sum_score += score.area * score.count
            }
        }
    }
    return sum_score
}
