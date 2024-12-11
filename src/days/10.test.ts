import { parse, part1, part2 } from './10'

const example = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

test('Part 1 on example', () => {
    expect(part1(parse(example))).toBe(36)
})

test('Part 2 on example', () => {
    expect(part2(parse(example))).toBe(81)
})
