import { parse, part1, part2 } from './25'

const example = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`

test('Part 1 on example', () => {
    expect(part1(parse(example))).toBe(0)
})

test('Part 2 on example', () => {
    expect(part2(parse(example))).toBe(0)
})
