import { parse, part1, part2 } from './13'

const example = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`

test('Part 1 on example', () => {
    expect(part1(parse(example))).toBe(480)
})

test('Part 2 on example', () => {
    expect(part2(parse(example))).toBe(875318608908)
})
