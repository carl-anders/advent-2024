export enum Direction {
    North,
    East,
    South,
    West,
}
export function turnRight(direction: Direction): Direction {
    switch (direction) {
        case Direction.North:
            return Direction.East
        case Direction.East:
            return Direction.South
        case Direction.South:
            return Direction.West
        case Direction.West:
            return Direction.North
    }
}
export const move_deltas = {
    [Direction.North]: { x: 0, y: -1 },
    [Direction.East]: { x: 1, y: 0 },
    [Direction.South]: { x: 0, y: 1 },
    [Direction.West]: { x: -1, y: 0 },
}
export const move_delta_list = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
]
export const direction_description = {
    [Direction.North]: 'North',
    [Direction.East]: 'East',
    [Direction.South]: 'South',
    [Direction.West]: 'West',
}
