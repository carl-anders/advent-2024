import { part1, part2 } from './12'

const example1 = `AAAA
BBCD
BBCC
EEEC`
const example2 = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`
const example3 = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`

test('Part 1 on example', () => {
    expect(part1(example1)).toBe(140)
    expect(part1(example2)).toBe(772)
    expect(part1(example3)).toBe(1930)
})

test('Part 2 on example', () => {
    expect(part2(example1)).toBe(80)
    expect(part2(example2)).toBe(436)
    expect(part2(example3)).toBe(1206)
})
