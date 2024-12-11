import { parse, part1, part2 } from './6'

const example = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

test('Part 1 on example', () => {
    expect(part1(parse(example))).toBe(41)
})

test('Part 2 on example', () => {
    expect(part2(parse(example))).toBe(6)
})
