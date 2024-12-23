export function parse(input: string) {
    return input.split(/\r?\n/).map(Number)
}

export function part1(input: number[]) {
    let sum = BigInt(0)
    for (const monkey of input) {
        let secret = BigInt(monkey)
        for (let i = 0; i < 2000; i++) {
            secret = seq(secret)
        }
        sum += secret
    }
    return Number(sum)
}

function seq(secret: bigint): bigint {
    secret ^= secret * BigInt(64)
    secret %= BigInt(16777216)
    secret ^= secret / BigInt(32)
    secret %= BigInt(16777216)
    secret ^= secret * BigInt(2048)
    secret %= BigInt(16777216)
    return secret
}

function diffsKey(key: number[]): number {
    return key[0] * 1000000 + key[1] * 10000 + key[2] * 100 + key[3]
}

export function part2(input: number[]) {
    const all_strategies = new Map<number, number>()
    for (const monkey of input) {
        const strategies = new Map<number, number>()
        let secret = BigInt(monkey)
        let bananas = Number(secret % BigInt(10))
        const diffs = []
        for (let i = 0; i < 2000; i++) {
            secret = seq(secret)
            const new_bananas = Number(secret % BigInt(10))
            diffs.push(new_bananas - bananas)
            bananas = new_bananas
            if (diffs.length == 4) {
                const key = diffsKey(diffs)
                if (strategies.get(key) == undefined) {
                    strategies.set(key, bananas)
                }
                diffs.shift()
            }
        }
        strategies.forEach((bananas, key) => {
            all_strategies.set(key, (all_strategies.get(key) ?? 0) + bananas)
        })
    }
    let max_bananas = 0
    all_strategies.forEach((bananas) => {
        max_bananas = Math.max(max_bananas, bananas)
    })
    return max_bananas
}
