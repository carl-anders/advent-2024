import { parse, part1, part2 } from './4'

const example = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

test('Part 1 on example', () => {
    expect(part1(parse(example))).toBe(18)
})

test('Part 2 on example', () => {
    expect(part2(parse(example))).toBe(9)
})
