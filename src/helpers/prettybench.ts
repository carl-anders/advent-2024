import { Target } from 'benchmark'
import chalk from 'chalk'

// Adapted from toStringBench function in benchmark.js licensed under MIT License. From https://github.com/bestiejs/benchmark.js
export function prettylog(bench: Target) {
    const name = (bench.name || 'Unknown').padEnd(15)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = (bench as any).error
    if (error) {
        console.log(`  ${name} ${chalk.gray('x')} ${chalk.red('FAILED')}`)
        console.log(error)
    } else {
        const size = bench.stats?.sample.length
        const hz = bench?.hz ?? 0
        const rme = bench.stats?.rme ?? 0

        const ops = chalk.yellow(hz.toFixed(hz < 100 ? 2 : 0).padStart(9))
        const rme_colored =
            rme > 5 ? chalk.red(rme.toFixed(2)) : chalk.green(rme.toFixed(2))
        const sampled = chalk.gray(
            `(${size} run${size == 1 ? '' : 's'} sampled)`
        )
        console.log(
            `  ${name} ${chalk.gray('x')} ${ops} ops/sec ${chalk.gray('\xb1')}${rme_colored}${chalk.gray('%')} ${sampled}`
        )
    }
}
