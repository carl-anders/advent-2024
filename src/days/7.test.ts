import { parse, part1, part2 } from './7'

const example = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`

test('Part 1 on example', () => {
    expect(part1(parse(example))).toBe(3749)
})

test('Part 2 on example', () => {
    expect(part2(parse(example))).toBe(11387)
})
