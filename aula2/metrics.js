import assert from "assert";

const sum = (values) => values.reduce((a, b) => a + b, 0);

const mean = (values) => (sum(values) / values.length) || 0;

const variance = (values) => values.reduce((s, n) => s + (n - mean(values)) ** 2, 0) / (values.length - 1);

const standardDeviation = (values) => Math.sqrt(variance(values));

const covariance = (Xs, Ys) => {
    assert(Xs.length === Ys.length, "Amount of numbers must be equals!")
    const n = Xs.length

    let sumOfMultiplications = 0;

    for (let i = 0; i < n; i++) {
        sumOfMultiplications += Xs[i] * Ys[i];
    }

    const sumXs = sum(Xs);
    const sumYs = sum(Ys);
    const multiplyOfSums = (sumXs * sumYs);

    return ((n * sumOfMultiplications) - multiplyOfSums) / (n * (n - 1));
}

const countIncidencesOnInterval = (values, step, limit) => {
    const intervalIncludingUpper = (value, lower, upper) => {
        return value >= lower && value <= upper;
    }

    const intervalExcludingUpper = (value, lower, upper) => {
        return value >= lower && value < upper;
    }

    let isInLastInterval = false;
    let i = 0.0;
    const counts = {}
    const asList = []

    while (!isInLastInterval) {
        const lowerLimit = i;
        i = parseFloat((i + step).toFixed(1), 10);
        const upperLimit = i;

        isInLastInterval = i === limit;

        const incidences = values.filter(v =>
            isInLastInterval ?
                intervalIncludingUpper(v, lowerLimit, upperLimit) :
                intervalExcludingUpper(v, lowerLimit, upperLimit)
        );

        const parsedUpperLimit = isInLastInterval ? upperLimit : (upperLimit - 0.01).toFixed(2)

        counts[`${lowerLimit}-${parsedUpperLimit}`] = incidences.length
        asList.push(incidences.length)
    }

    return { counts, asList };
}

export default {
    sum,
    mean,
    variance,
    standardDeviation,
    covariance,
    countIncidencesOnInterval
}
