import { parse, part1, part2 } from './14'

const example = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`

test('Part 1 on example', () => {
    expect(part1(parse(example), { x: 11, y: 7 })).toBe(12)
})

test('Part 2 on example', () => {
    // No tree in example. Lowest xy variance is at time 24
    expect(part2(parse(example), { x: 11, y: 7 })).toBe(24)
})
