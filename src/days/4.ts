export function parse(input: string) {
    const out = []
    for (const line of input.split(/\r?\n/)) {
        out.push(Array.from(line))
    }
    return out
}

function search_at_pos(grid: string[][], x: number, y: number) {
    const directions = [
        [0, 1], // E
        [1, 1], // SE
        [1, 0], // S
        [1, -1], // SW
        [0, -1], // W
        [-1, -1], // NW
        [-1, 0], // N
        [-1, 1], // NE
    ]
    const xmas = Array.from('XMAS')
    return directions
        .map(([y_move, x_move]) =>
            xmas.every(
                (letter, i) => grid[y + i * y_move]?.[x + i * x_move] == letter
            )
        )
        .filter((bool) => bool).length
}

export function part1(grid: string[][]) {
    let found = 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            found += search_at_pos(grid, x, y)
        }
    }
    return found
}

function mas_check(grid: string[][], x: number, y: number) {
    return [
        [
            [y, x],
            [y + 1, x + 1],
            [y + 2, x + 2],
        ],
        [
            [y + 2, x],
            [y + 1, x + 1],
            [y, x + 2],
        ],
    ]
        .map((dir) => dir.map(([ny, nx]) => grid[ny]?.[nx] ?? '').join(''))
        .every((seq) => seq == 'MAS' || seq == 'SAM')
}

export function part2(grid: string[][]) {
    const height = grid.length
    const width = grid[0].length
    let found = 0
    for (let y = 0; y < height - 2; y++) {
        for (let x = 0; x < width - 2; x++) {
            found += mas_check(grid, x, y) ? 1 : 0
        }
    }

    return found
}
