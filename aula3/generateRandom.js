import pseudoRandom from "./pseudoRandom.js";
import metrics from "./metrics.js";
import utils from "./utils.js";

export default function generateRandom({ seed, amount, a, c, M }) {

    const values = pseudoRandom.randomValues({ seed, amount, a, c, M, });

    const mean = metrics.mean(values);
    const std = metrics.standardDeviation(values);

    const Xs = utils.takeFromArrayWhereIndex(values, (index) => index % 2 === 0)
    const Ys = utils.takeFromArrayWhereIndex(values, (index) => index % 2 !== 0)

    const covariance = metrics.covariance(Xs, Ys);

    const { counts, asList: countsAsList } = metrics.countIncidencesOnInterval(values, 0.1, 1)

    let chiSquare = 0
    const n = values.length

    countsAsList.forEach(count => {
        const diff = count - (n / 10)
        const squaredDiff = diff * diff;

        chiSquare += squaredDiff / (n / 10)
    })

    return {
        values,
        Xs,
        Ys,
        mean,
        std,
        covariance,
        counts,
        countsAsList,
        chiSquare
    }
}