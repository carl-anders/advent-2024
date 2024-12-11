import { parse, part1, part2 } from './2'

const example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

test('Part 1 on example', () => {
    expect(part1(parse(example))).toBe(2)
})

test('Part 2 on example', () => {
    expect(part2(parse(example))).toBe(4)
})
