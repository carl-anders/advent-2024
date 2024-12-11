export function parse(input: string) {
    return input.split(' ').map(Number)
}

function map_add(map: Map<number, number>, key: number, add: number) {
    map.set(key, (map.get(key) ?? 0) + add)
}

function num_stones_after_blinks(stone_list: number[], blinks: number) {
    let stones = new Map<number, number>()
    for (const stone of stone_list) {
        stones.set(stone, stones.get(stone) ?? 0 + 1)
    }
    for (let i = 0; i < blinks; i++) {
        const new_stones = new Map<number, number>()
        for (const [stone, count] of stones) {
            const digits = (Math.log10(stone) + 1) | 0
            if (stone == 0) {
                map_add(new_stones, 1, count)
            } else if (digits % 2 == 0) {
                const divisor = Math.pow(10, digits / 2)
                const left = Math.floor(stone / divisor)
                const right = stone % divisor
                map_add(new_stones, left, count)
                map_add(new_stones, right, count)
            } else {
                map_add(new_stones, stone * 2024, count)
            }
        }
        stones = new_stones
    }
    let sum = 0
    for (const [, count] of stones) {
        sum += count
    }
    return sum
}

export function part1(stones: number[]) {
    return num_stones_after_blinks(stones, 25)
}

export function part2(stones: number[]) {
    return num_stones_after_blinks(stones, 75)
}
