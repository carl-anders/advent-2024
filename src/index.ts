import * as fs from 'fs'

async function run_day(day: number, part: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let results: any
    try {
        results = JSON.parse(fs.readFileSync('input/results.json', 'utf8'))
    } catch {
        // Ignore
    }

    const input = fs.readFileSync(`input/${day}.txt`, 'utf8').trim()
    console.log(`###################################`)
    console.log(`Running day ${day}`)

    const runner = await import(`./days/${day}`)

    let parsed_input
    if (runner.parse != undefined) {
        parsed_input = runner.parse(input)
    } else {
        parsed_input = input
    }

    const run_part = (part: number) => {
        console.log(`Part ${part}:`)
        let result
        if (part == 1) {
            result = runner.part1(structuredClone(parsed_input))
        } else {
            result = runner.part2(structuredClone(parsed_input))
        }
        console.log(result)
        const saved_result = results[day]?.[part - 1]
        if (saved_result == undefined) {
            console.log('New value!')
        } else if (saved_result != result) {
            console.log(`Result is different from real result: ${saved_result}`)
        }
    }

    if (part != 2) {
        run_part(1)
    }
    if (part != 1) {
        run_part(2)
    }
}
async function run_profile(day: number, part: number) {
    const input = fs.readFileSync(`input/${day}.txt`, 'utf8').trim()

    const runner = await import(`./days/${day}`)

    let parsed_input
    if (runner.parse != undefined) {
        parsed_input = runner.parse(input)
    } else {
        parsed_input = input
    }

    if (part == 0) {
        const result = runner.part1(structuredClone(parsed_input))
        console.log(result)
        const result2 = runner.part2(parsed_input)
        console.log(result2)
    } else if (part == 1) {
        const result = runner.part1(parsed_input)
        console.log(result)
    } else if (part == 2) {
        const result = runner.part2(parsed_input)
        console.log(result)
    }
}
const latest_day = 19

import Benchmark, { Event } from 'benchmark'
import { prettylog } from './helpers/prettybench'

async function run_bench(bench_day: number, part: number) {
    let suite = new Benchmark.Suite()
    const start = bench_day == 0 ? 1 : bench_day
    const end = bench_day == 0 ? latest_day : bench_day
    for (let day = start; day <= end; day++) {
        const input = fs.readFileSync(`input/${day}.txt`, 'utf8').trim()

        const runner = await import(`./days/${day}`)

        let parsed_input
        if (runner.parse != undefined) {
            parsed_input = runner.parse(structuredClone(input))
        } else {
            parsed_input = input
        }

        if (part == 0 && runner.parse != undefined) {
            suite = suite.add(`Day ${day} Parse`, () => {
                runner.parse(structuredClone(input))
            })
        }
        if (part != 2) {
            suite = suite.add(`Day ${day} Part 1`, () => {
                runner.part1(structuredClone(parsed_input))
            })
        }
        if (part != 1) {
            suite = suite.add(`Day ${day} Part 2`, () => {
                runner.part2(structuredClone(parsed_input))
            })
        }
    }
    suite = suite.on('cycle', (event: Event) => {
        prettylog(event.target)
    })
    suite.run({ async: false })
}

async function main() {
    const run = process.argv[2] ?? 'all'
    const day = Number(process.argv[3] ?? 0)
    const part = Number(process.argv[4] ?? 0)
    switch (run) {
        case 'all':
            for (let day = 1; day <= latest_day; day++) {
                await run_day(day, 0)
            }
            break
        case 'day': {
            await run_day(day == 0 ? latest_day : day, part)
            break
        }
        case 'profile': {
            await run_profile(day == 0 ? latest_day : day, part)
            break
        }
        case 'bench': {
            await run_bench(day, part)
            break
        }
    }
}
main()
