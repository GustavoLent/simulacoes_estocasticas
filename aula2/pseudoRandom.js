const M = (Math.pow(2, 31) - 1)

const rand = (seed) => {
    const val = (16807 * seed) % M
    return val;
}

const randomValues = (seed, amount) => {
    const values = [seed]

    for (let i = 1; i < amount; i++) {
        const nextSeed = values[i - 1]
        const res = rand(nextSeed)

        values.push(res)
    }

    return values.map(v => v / M);
}

export default {
    rand,
    randomValues
}
