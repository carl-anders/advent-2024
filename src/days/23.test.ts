import { parse, part1, part2 } from './23'

const example = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`

test('Part 1 on example', () => {
    expect(part1(parse(example))).toBe(7)
})

test('Part 2 on example', () => {
    expect(part2(parse(example))).toBe('co,de,ka,ta')
})
