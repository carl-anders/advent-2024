interface File {
    id: number
    pos: number
    size: number
}

function stair(start: number, num: number) {
    return start * num + ((num - 1) * num) / 2
}

export function part1(input: string) {
    const files: File[] = []
    const empty_space: number[][] = []
    let file = true
    let file_id = 0

    let position = 0
    for (const c of input.split('')) {
        const size = Number(c)
        if (file) {
            files.push({ id: file_id, pos: position, size: size })
            file_id++
        } else {
            empty_space.push([position, size])
        }
        position += size
        file = !file
    }

    let checksum = 0
    for (let i = files.length - 1; i >= 0; i--) {
        const file = files[i]

        if (empty_space.length > 0 && empty_space[0][0] < file.pos) {
            while (file.size > 0) {
                if (empty_space[0][0] < file.pos) {
                    const nypos = empty_space[0][0]
                    if (empty_space[0][1] > file.size) {
                        empty_space[0][0] += file.size
                        empty_space[0][1] -= file.size

                        checksum += stair(nypos, file.size) * file.id
                        file.size = 0
                    } else {
                        const space_size = empty_space[0][1]

                        checksum += stair(nypos, space_size) * file.id
                        file.size -= space_size
                        empty_space.shift()
                    }
                } else {
                    checksum += stair(file.pos, file.size) * file.id
                    break
                }
            }
        } else {
            checksum += stair(file.pos, file.size) * file.id
        }
    }

    return checksum
}

import sortedIndex from 'lodash/sortedindex'

export function part2(input: string) {
    const files: File[] = []
    const empty_space: number[][] = [[], [], [], [], [], [], [], [], [], []]
    let file = true
    let file_id = 0

    let position = 0
    for (const c of input.split('')) {
        const size = Number(c)
        if (file) {
            files.push({ id: file_id, pos: position, size: size })
            file_id++
        } else {
            empty_space[size].push(position)
        }
        position += size
        file = !file
    }

    for (let i = files.length - 1; i >= 0; i--) {
        const file = files[i]
        let lowest_empty = [0, Number.MAX_SAFE_INTEGER]
        for (let size = file.size; size < 10; size++) {
            const space = empty_space[size]
            if (
                space != undefined &&
                space.length > 0 &&
                space[0] < lowest_empty[1]
            ) {
                lowest_empty = [size, space[0]]
            }
        }
        if (lowest_empty[1] < file.pos) {
            file.pos = lowest_empty[1]
            const extra_space = lowest_empty[0] - file.size
            empty_space[lowest_empty[0]].shift()
            if (extra_space > 0) {
                const space_cat = empty_space[extra_space]
                if (space_cat != undefined) {
                    space_cat.splice(
                        sortedIndex(space_cat, file.pos + file.size),
                        0,
                        file.pos + file.size
                    )
                }
            }
        }
    }

    let checksum = 0
    for (const file of files) {
        for (let i = 0; i < file.size; i++) {
            checksum += file.id * (file.pos + i)
        }
    }

    return checksum
}
