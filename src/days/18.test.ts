import { parse, part1, part2 } from './18'

const example = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`

test('Part 1 on example', () => {
    expect(part1(parse(example), { x: 6, y: 6 }, 12)).toBe(22)
})

test('Part 2 on example', () => {
    expect(part2(parse(example), { x: 6, y: 6 })).toBe('6,1')
})
