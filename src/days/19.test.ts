import { parse, part1, part2 } from './19'

const example = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`

test('Part 1 on example', () => {
    expect(part1(parse(example))).toBe(6)
})

test('Part 2 on example', () => {
    expect(part2(parse(example))).toBe(16)
})
