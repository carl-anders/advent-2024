import * as Direction from '../helpers/direction'

enum Tile {
    Empty,
    Obstacle,
}
interface Guard {
    x: number
    y: number
    dir: Direction.Direction
}
interface Input {
    map: Tile[][]
    guard: Guard
}

export function parse(input: string) {
    let guard!: Guard
    const map = input.split(/\r?\n/).map((line, y) =>
        line.split('').map((c, x) => {
            switch (c) {
                case '.':
                    return Tile.Empty
                case '#':
                    return Tile.Obstacle
                case '^':
                    guard = { x: x, y: y, dir: Direction.Direction.North }
                    return Tile.Empty
                default:
                    return Tile.Empty
            }
        })
    )
    return {
        map: map,
        guard: guard,
    }
}

function guard_walk(guard: Guard, map: Tile[][]) {
    const visited = new Set([`${guard.y}_${guard.x}`])

    let outside = false
    while (!outside) {
        const in_front = {
            x: guard.x + Direction.move_deltas[guard.dir].x,
            y: guard.y + Direction.move_deltas[guard.dir].y,
        }
        switch (map[in_front.y]?.[in_front.x]) {
            case undefined: {
                outside = true
                break
            }
            case Tile.Empty: {
                visited.add(`${in_front.y}_${in_front.x}`)
                guard.x = in_front.x
                guard.y = in_front.y
                break
            }
            case Tile.Obstacle: {
                guard.dir = Direction.turnRight(guard.dir)
                break
            }
        }
    }
    return visited
}

export function part1(input: Input) {
    return guard_walk(input.guard, input.map).size
}

export function part2(input: Input) {
    const { map, guard } = input
    let loop_worlds = 0

    const original_visited = guard_walk(structuredClone(guard), map)

    for (let world_y = 0; world_y < map.length; world_y++) {
        for (let world_x = 0; world_x < map[world_y].length; world_x++) {
            if (guard.x == world_x && guard.y == world_y) {
                continue
            }
            if (map[world_y][world_x] == Tile.Obstacle) {
                continue
            }
            if (!original_visited.has(`${world_y}_${world_x}`)) {
                continue
            }
            map[world_y][world_x] = Tile.Obstacle

            const visited = new Set([`${guard.y}_${guard.x}_${guard.dir}`])
            const ng = structuredClone(guard)

            let outside = false
            let looping = false
            while (!outside && !looping) {
                const in_front = {
                    x: ng.x + Direction.move_deltas[ng.dir].x,
                    y: ng.y + Direction.move_deltas[ng.dir].y,
                }
                switch (map[in_front.y]?.[in_front.x]) {
                    case undefined: {
                        outside = true
                        break
                    }
                    case Tile.Empty: {
                        const key = `${in_front.y}_${in_front.x}_${ng.dir}`
                        if (visited.has(key)) {
                            looping = true
                        } else {
                            visited.add(key)
                            ng.x = in_front.x
                            ng.y = in_front.y
                        }
                        break
                    }
                    case Tile.Obstacle: {
                        ng.dir = Direction.turnRight(ng.dir)
                        break
                    }
                }
            }
            if (looping) {
                loop_worlds += 1
            }

            map[world_y][world_x] = Tile.Empty
        }
    }

    return loop_worlds
}
