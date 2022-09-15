import pseudoRandom from "./pseudoRandom.js";

const takeFromArrayWhereIndex = (values, shouldTake) => values.filter((_, index) => shouldTake(index))

export default function getRandomXsAndYs({ seed, amount, a, c, M }) {
    const values = pseudoRandom.randomValues({ seed, amount, a, c, M, });

    const Xs = takeFromArrayWhereIndex(values, (index) => index % 2 === 0)
    const Ys = takeFromArrayWhereIndex(values, (index) => index % 2 !== 0)

    return { Xs, Ys }
}