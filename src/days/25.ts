export function parse(input: string) {
    return input.split(/\r?\n\r?\n/)
}
export function part1(input: string[]) {
    const locks = []
    const keys = []
    for (const map of input) {
        const lines = map.split('\n')
        const width = lines[0].length
        const is_lock = lines[0].startsWith('###')
        lines.pop()
        lines.shift()

        const nums = Array(width).fill(0)
        for (const line of lines) {
            for (let i = 0; i < width; i++) {
                if (line[i] == '#') {
                    nums[i] += 1
                }
            }
        }

        if (is_lock) {
            locks.push(nums)
        } else {
            keys.push(nums)
        }
    }

    let valid_combinations = 0
    for (const lock of locks) {
        for (const key of keys) {
            if (valid_key(key, lock)) {
                valid_combinations++
            }
        }
    }
    return valid_combinations
}

function valid_key(key: number[], lock: number[]) {
    for (let i = 0; i < key.length; i++) {
        if (lock[i] + key[i] > 5) {
            return false
        }
    }
    return true
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
    return 0
}
