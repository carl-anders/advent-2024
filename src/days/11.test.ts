import { parse, part1, part2 } from './11'

const example = `125 17`

test('Part 1 on example', () => {
    expect(part1(parse(example))).toBe(55312)
})

test('Part 2 on example', () => {
    expect(part2(parse(example))).toBe(65601038650482)
})
