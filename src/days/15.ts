import { Direction } from '../helpers/direction'
import { addDirection, Position } from '../helpers/position2d'

interface Input {
    map: Tile[][]
    moves: Direction[]
    robot: Position
}

enum Tile {
    Empty,
    Wall,
    Box,
    BoxLeft,
    BoxRight,
}

export function parse(input: string) {
    const [map, moves] = input.split(/\r?\n\r?\n/)
    let robot = { x: 0, y: 0 }
    const map_split = map.split(/\r?\n/).map((line, y) =>
        line.split('').map((c, x) => {
            if (c == '#') {
                return Tile.Wall
            } else if (c == 'O') {
                return Tile.Box
            } else if (c == '@') {
                robot = { x: x, y: y }
                return Tile.Empty
            } else {
                return Tile.Empty
            }
        })
    )
    const moves_split = moves
        .replace(/\r?\n/g, '')
        .split('')
        .map((c) => {
            if (c == '^') {
                return Direction.North
            } else if (c == '>') {
                return Direction.East
            } else if (c == 'v') {
                return Direction.South
            } else if (c == '<') {
                return Direction.West
            } else {
                console.log(`Invalid character: ${c.charCodeAt(0)}`)
                return Direction.West
            }
        })

    return { map: map_split, moves: moves_split, robot: robot }
}

function getTile(map: Tile[][], pos: Position): Tile {
    return map[pos.y][pos.x]
}

function setTile(map: Tile[][], pos: Position, tile: Tile) {
    map[pos.y][pos.x] = tile
}

function moveBox(map: Tile[][], pos: Position, dir: Direction): boolean {
    const tile = getTile(map, pos)
    if (tile == Tile.Empty) {
        return true
    } else if (tile == Tile.Wall) {
        return false
    } else {
        const new_pos = addDirection(pos, dir)
        if (moveBox(map, new_pos, dir)) {
            setTile(map, new_pos, Tile.Box)
            setTile(map, pos, Tile.Empty)
            return true
        } else {
            return false
        }
    }
}

function score(map: Tile[][]): number {
    let score = 0
    map.forEach((line, y) => {
        line.forEach((t, x) => {
            if (t == Tile.Box || t == Tile.BoxLeft) {
                score += y * 100 + x
            }
        })
    })
    return score
}

export function part1(input: Input) {
    const { map, moves } = input
    let robot = input.robot
    for (const dir of moves) {
        const new_pos = addDirection(robot, dir)
        if (moveBox(map, new_pos, dir)) {
            robot = new_pos
        }
    }

    return score(map)
}

function widen_map(map: Tile[][]): Tile[][] {
    return map.map((line) =>
        line.flatMap((t) => {
            if (t == Tile.Box) {
                return [Tile.BoxLeft, Tile.BoxRight]
            } else {
                return [t, t]
            }
        })
    )
}

function canMoveWide(map: Tile[][], pos: Position, dir: Direction): boolean {
    const tile = getTile(map, pos)
    if (tile == Tile.Empty) {
        return true
    } else if (tile == Tile.Wall) {
        return false
    } else if (dir == Direction.East || dir == Direction.West) {
        return canMoveWide(map, addDirection(pos, dir), dir)
    } else {
        const new_pos = addDirection(pos, dir)
        const other_dir = tile == Tile.BoxLeft ? Direction.East : Direction.West
        return (
            canMoveWide(map, new_pos, dir) &&
            canMoveWide(map, addDirection(new_pos, other_dir), dir)
        )
    }
}

function doMoveWide(map: Tile[][], pos: Position, dir: Direction) {
    const tile = getTile(map, pos)
    if (tile == Tile.Empty || tile == Tile.Wall) {
        return
    }

    const new_pos = addDirection(pos, dir)
    doMoveWide(map, new_pos, dir)
    setTile(map, new_pos, tile)
    setTile(map, pos, Tile.Empty)

    if (dir == Direction.North || dir == Direction.South) {
        const other_dir = tile == Tile.BoxLeft ? Direction.East : Direction.West
        const other_pos = addDirection(new_pos, other_dir)
        doMoveWide(map, other_pos, dir)
        const other_tile = tile == Tile.BoxLeft ? Tile.BoxRight : Tile.BoxLeft
        setTile(map, other_pos, other_tile)
        setTile(map, addDirection(pos, other_dir), Tile.Empty)
    }
}

export function part2(input: Input) {
    const moves = input.moves
    const map = widen_map(input.map)
    let robot = { y: input.robot.y, x: input.robot.x * 2 }
    for (const dir of moves) {
        const new_pos = addDirection(robot, dir)
        if (canMoveWide(map, new_pos, dir)) {
            doMoveWide(map, new_pos, dir)
            robot = new_pos
        }
    }

    return score(map)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function displayMap(map: Tile[][], robot: Position): string {
    return map
        .map((line, y) => {
            return line
                .map((t, x) => {
                    if (robot.y == y && robot.x == x) {
                        return '@'
                    }
                    if (t == Tile.Box) {
                        return 'O'
                    } else if (t == Tile.Empty) {
                        return '.'
                    } else if (t == Tile.Wall) {
                        return '#'
                    } else if (t == Tile.BoxLeft) {
                        return '['
                    } else if (t == Tile.BoxRight) {
                        return ']'
                    } else {
                        return '?'
                    }
                })
                .join('')
        })
        .join('\n')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function countTile(map: Tile[][], tile: Tile): number {
    let count = 0
    for (const line of map) {
        for (const t of line) {
            if (t == tile) {
                count++
            }
        }
    }
    return count
}
