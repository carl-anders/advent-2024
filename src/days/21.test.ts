import { parse, part1, part2 } from './21'

const example = `029A
980A
179A
456A
379A`

test('Part 1 on example', () => {
    expect(part1(parse(example))).toBe(126384)
})

test('Part 2 on example', () => {
    // No example result, hopefully this is correct
    expect(part2(parse(example))).toBe(154115708116294)
})
