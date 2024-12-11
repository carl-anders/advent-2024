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
export function addPosition(a: Position, b: Position): Position {
    return { x: a.x + b.x, y: a.y + b.y }
}
