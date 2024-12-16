import { uniq } from 'lodash'
import {
    Direction,
    directions,
    turnLeft,
    turnRight,
} from '../helpers/direction'
import { addDirection, Position } from '../helpers/position2d'
import { Queue } from '../helpers/priorityqueue'

enum Tile {
    Wall,
    None,
}

interface Input {
    grid: Tile[][]
    start: Position
    end: Position
}

export function parse(input: string) {
    let start = { x: 0, y: 0 }
    let end = { x: 0, y: 0 }
    const grid = input.split(/\r?\n/).map((line, y) =>
        line.split('').map((c, x) => {
            if (c == '#') {
                return Tile.Wall
            } else if (c == '.') {
                return Tile.None
            } else if (c == 'S') {
                start = { x: x, y: y }
                return Tile.None
            } else if (c == 'E') {
                end = { x: x, y: y }
                return Tile.None
            } else {
                console.log(`Invalid character: ${c}.`)
                return Tile.None
            }
        })
    )
    return { grid: grid, start: start, end: end }
}

type GraphN = Map<number, Map<number, number>>

export function part1(input: Input) {
    const { grid: map, start, end } = input
    const graph: GraphN = makeGraph(map, end)
    return simpleDjik(
        graph,
        posDirToKey(start, Direction.East),
        Number.MAX_SAFE_INTEGER
    )
}

function posDirToKey(pos: Position, dir: Direction): number {
    return pos.x * 10000 + pos.y * 10 + dir
}

function makeGraph(map: Tile[][], end: Position) {
    const graph: GraphN = new Map()
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] != Tile.None) {
                continue
            }
            const pos = { x: x, y: y }
            for (const from_dir of directions) {
                const from_key = posDirToKey(pos, from_dir)
                graph.set(from_key, new Map())

                const dirs = [from_dir, turnRight(from_dir), turnLeft(from_dir)]
                for (const new_dir of dirs) {
                    const new_pos = addDirection(pos, new_dir)
                    if (new_pos.x == end.x && new_pos.y == end.y) {
                        graph.get(from_key)?.set(Number.MAX_SAFE_INTEGER, 1)
                    } else if (map[new_pos.y][new_pos.x] == Tile.None) {
                        graph
                            .get(from_key)
                            ?.set(
                                posDirToKey(new_pos, new_dir),
                                new_dir == from_dir ? 1 : 1001
                            )
                    }
                }
            }
        }
    }
    return graph
}

function simpleDjik(graph: GraphN, start: number, end: number): number {
    const costs = new Map<number, number>()
    const queue = new Queue<number>()
    queue.push(start, 0)

    while (!queue.is_empty()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { value: key, cost } = queue.pop()!

        const nodes = graph.get(key)
        nodes?.forEach((new_cost, node) => {
            const total_cost = cost + new_cost
            const stored_cost = costs.get(node)
            if (stored_cost == undefined || stored_cost > total_cost) {
                costs.set(node, total_cost)
                queue.push(node, total_cost)
            }
        })
    }

    return costs.get(end) ?? 0
}

interface QueueData {
    pos: Position
    dir: Direction
    path: Position[]
}

export function part2(input: Input) {
    const { grid: map, start, end } = input

    const seen: Position[] = []
    let best = Number.MAX_SAFE_INTEGER
    const costs = new Map<number, number>()
    const queue = new Queue<QueueData>()
    queue.push({ pos: start, dir: Direction.East, path: [start] }, 0)

    while (!queue.is_empty()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { value: data, cost } = queue.pop()!

        const pd_key = posDirToKey(data.pos, data.dir)
        const stored_score = costs.get(pd_key)
        if (stored_score !== undefined && cost > stored_score) {
            continue
        } else {
            costs.set(pd_key, cost)
        }

        if (data.pos.x == end.x && data.pos.y == end.y && cost <= best) {
            seen.push(...data.path)
            best = cost
        }

        const dirs = [data.dir, turnRight(data.dir), turnLeft(data.dir)]
        for (const new_dir of dirs) {
            const new_pos = addDirection(data.pos, new_dir)
            if (map[new_pos.y][new_pos.x] == Tile.None) {
                queue.push(
                    {
                        pos: new_pos,
                        dir: new_dir,
                        path: [...data.path, new_pos],
                    },
                    cost + (new_dir == data.dir ? 1 : 1001)
                )
            }
        }
    }

    return uniq(seen.map((pos) => `${pos.x}_${pos.y}`)).length
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function displayGrid(path: string[]) {
    const map = Array.from({ length: 142 }, () =>
        Array.from({ length: 142 }, () => ' ')
    )
    for (const p of path) {
        const [x, y] = p.split('_').map(Number)
        map[y][x] = 'O'
    }
    console.log(map.map((line) => line.join('')).join('\n'))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPos(pre_last: string): string {
    return pre_last.substring(0, pre_last.lastIndexOf('_'))
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDir(pre_last: string): string {
    return pre_last.substring(pre_last.lastIndexOf('_') + 1)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function displayPath(path: string[]) {
    const map = Array.from({ length: 20 }, () =>
        Array.from({ length: 20 }, () => ' ')
    )
    for (const p of path) {
        const [x, y, dir] = p.split('_').map(Number)
        if (dir == Direction.North) {
            map[y][x] = '^'
        } else if (dir == Direction.East) {
            map[y][x] = '>'
        } else if (dir == Direction.South) {
            map[y][x] = 'v'
        } else if (dir == Direction.West) {
            map[y][x] = '<'
        }
    }
    console.log(map.map((line) => line.join('')).join('\n'))
}
