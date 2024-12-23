import { parse, part1, part2 } from './22'

const example1 = `1
10
100
2024`

const example2 = `1
2
3
2024`

test('Part 1 on example', () => {
    expect(part1(parse(example1))).toBe(37327623)
})

test('Part 2 on example', () => {
    expect(part2(parse(example2))).toBe(23)
})
