import { part1, part2 } from './9'

const example = `2333133121414131402`

test('Part 1 on example', () => {
    expect(part1(example)).toBe(1928)
})

test('Part 2 on example', () => {
    expect(part2(example)).toBe(2858)
})
