import { Direction, move_deltas } from './direction'

export interface Position {
    x: number
    y: number
}
export function inBoundsInclusive(
    position: Position,
    bounds: Position
): boolean {
    return (
        position.x >= 0 &&
        position.x <= bounds.x &&
        position.y >= 0 &&
        position.y <= bounds.y
    )
}
export function inBoundsIncExc(
    position: Position,
    start_bound: Position,
    end_bound: Position
): boolean {
    return (
        position.x >= start_bound.x &&
        position.x < end_bound.x &&
        position.y >= start_bound.y &&
        position.y < end_bound.y
    )
}
export function addPosition(a: Position, b: Position): Position {
    return { x: a.x + b.x, y: a.y + b.y }
}
export function addDirection(pos: Position, dir: Direction): Position {
    return addPosition(pos, move_deltas[dir])
}
export function PositionEq(a: Position, b: Position): boolean {
    return a.x == b.x && a.y == b.y
}
