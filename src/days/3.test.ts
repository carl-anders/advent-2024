import { part1, part2 } from './3'

const example1 = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
const example2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

test('Part 1 on example', () => {
    expect(part1(example1)).toBe(161)
})

test('Part 2 on example', () => {
    expect(part2(example2)).toBe(48)
})
