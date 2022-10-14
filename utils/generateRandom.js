const rand = (seed, a, c, M) => {
    const val = ((a * seed) + c) % M
    return val;
}

module.exports = function generateRandom({ seed, amount, a, c, M, slice = 10 }) {
    const values = [seed]

    for (let i = 1; i < amount + slice; i++) {
        const nextSeed = values[i - 1]
        const res = rand(nextSeed, a, c, M)

        values.push(res)
    }

    const randomValues =  values.map(v => v / M);

    return randomValues.slice(slice,randomValues.length)
}
