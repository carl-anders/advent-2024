import * as fs from 'fs'

async function run_day(day: number, part1: boolean, part2: boolean) {
    let results
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
    const parsed_input_clone = structuredClone(parsed_input)
    if (part1) {
        console.log('Part 1:')
        const part1_result = runner.part1(parsed_input)
        console.log(part1_result)
        const saved_result = results[day]?.[0]
        if (saved_result == undefined) {
            console.log('New value!')
        } else if (saved_result != part1_result) {
            console.log(`Result is different from real result: ${saved_result}`)
        }
    }
    if (part2) {
        console.log('Part 2:')
        const part2_result = runner.part2(parsed_input_clone)
        console.log(part2_result)
        const saved_result = results[day]?.[1]
        if (saved_result == undefined) {
            console.log('New value!')
        } else if (saved_result != part2_result) {
            console.log(`Result is different from real result: ${saved_result}`)
        }
    }
}
async function run_day_profile(day: number, part: number) {
    const input = fs.readFileSync(`input/${day}.txt`, 'utf8').trim()

    const runner = await import(`./days/${day}`)

    let parsed_input
    if (runner.parse != undefined) {
        parsed_input = runner.parse(input)
    } else {
        parsed_input = input
    }

    if (part != 2) {
        const result = runner.part1(parsed_input)
        console.log(result)
    }
    if (part != 1) {
        const result = runner.part2(parsed_input)
        console.log(result)
    }
}
const latest_day = 11

import Benchmark, { Event } from 'benchmark'
import { prettylog } from './helpers/prettybench'

async function run_all_bench(bench_day: number, bench_part: number) {
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

        if (bench_part == 0 && runner.parse != undefined) {
            suite = suite.add(`Day ${day} Parse`, () => {
                runner.parse(structuredClone(input))
            })
        }
        if (bench_part != 2) {
            suite = suite.add(`Day ${day} Part 1`, () => {
                runner.part1(structuredClone(parsed_input))
            })
        }
        if (bench_part != 1) {
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
    switch (run) {
        case 'all':
            for (let day = 1; day <= latest_day; day++) {
                await run_day(day, true, true)
            }
            break
        case 'day': {
            const day = Number(process.argv[3] ?? latest_day)
            await run_day(day, process.argv[4] != '2', process.argv[4] != '1')
            break
        }
        case 'profile': {
            const day = Number(process.argv[3] ?? latest_day)
            const part = Number(process.argv[4] ?? 0)
            await run_day_profile(day, part)
            break
        }
        case 'bench': {
            const day = Number(process.argv[3] ?? 0)
            const part = Number(process.argv[4] ?? 0)
            await run_all_bench(day, part)
            break
        }
    }
}
main()
