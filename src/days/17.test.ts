import { parse, part1, part2 } from './17'

const example1 = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`
const example2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`

test('Part 1 on example', () => {
    expect(part1(parse(example1))).toBe('4,6,3,5,6,3,5,2,1,0')
})

test('Part 2 on example', () => {
    expect(part2(parse(example2))).toBe(117440)
})
