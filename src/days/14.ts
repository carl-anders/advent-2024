import { Position } from '../helpers/position2d'

interface Bot {
    pos: Position
    vel: Position
}

export function parse(input: string) {
    return input.split(/\r?\n/).map((line) => {
        const nums = [...line.matchAll(/-?\d+/g)].map((res) => Number(res[0]))
        return {
            pos: { x: nums[0], y: nums[1] },
            vel: { x: nums[2], y: nums[3] },
        }
    })
}

function mod(num: number, div: number) {
    return ((num % div) + div) % div
}
export function part1(bots: Bot[], bounds: Position = { x: 101, y: 103 }) {
    const quad_size: Position = { x: (bounds.x - 1) / 2, y: (bounds.y - 1) / 2 }
    const quad_bots: number[] = [0, 0, 0, 0]
    for (const bot of bots) {
        const x_pos = mod(bot.pos.x + bot.vel.x * 100, bounds.x)
        const y_pos = mod(bot.pos.y + bot.vel.y * 100, bounds.y)
        if (y_pos != quad_size.y && x_pos != quad_size.x) {
            quad_bots[
                (y_pos < quad_size.y ? 0 : 2) + (x_pos < quad_size.x ? 0 : 1)
            ] += 1
        }
    }
    return quad_bots[0] * quad_bots[1] * quad_bots[2] * quad_bots[3]
}

/*
function visualize_bots(robots: Robot[], bounds: Position): string {
    let out = ''
    for (let y = 0; y < bounds.y; y++) {
        for (let x = 0; x < bounds.x; x++) {
            let found = 0
            for (const robot of robots) {
                if (robot.pos.x == x && robot.pos.y == y) {
                    found += 1
                }
            }
            out += found > 0 ? found : '.'
        }
        out += '\n'
    }
    return out
}
*/

import { variance } from 'mathjs'

function arrayMin(arr: number[]) {
    return arr.reduce((min, num, i) => (num < arr[min] ? i : min), 0)
}

export function part2(bots: Bot[], bounds: Position = { x: 101, y: 103 }) {
    const bot_var = (length: number, fn: (t: number, bot: Bot) => number) => {
        return (
            arrayMin(
                Array.from({ length: length }, (_, t) => {
                    return Number(variance(bots.map((bot) => fn(t + 1, bot))))
                })
            ) + 1
        )
    }
    const lowest_x_var = bot_var(bounds.x, (t: number, bot: Bot) =>
        mod(bot.pos.x + bot.vel.x * t, bounds.x)
    )
    const lowest_y_var = bot_var(bounds.y, (t: number, bot: Bot) =>
        mod(bot.pos.y + bot.vel.y * t, bounds.y)
    )

    // We assume that the bots look like a "tree" if the variance of rows and colums is the lowest
    for (let t = lowest_x_var; t < bounds.x * bounds.y; t += bounds.x) {
        if (t % bounds.y == lowest_y_var) {
            return t
        }
    }
    return 0
}
