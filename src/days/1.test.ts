import { parse, part1, part2 } from './1'

const example = `3   4
4   3
2   5
1   3
3   9
3   3`

test('Part 1 on example', () => {
    expect(part1(parse(example))).toBe(11)
})

test('Part 2 on example', () => {
    expect(part2(parse(example))).toBe(31)
})
