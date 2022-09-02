import pseudoRandom from "./pseudoRandom.js";
import metrics from "./metrics.js";
import utils from "./utils.js";

const values = pseudoRandom.randomValues(10, 80000);

const mean = metrics.mean(values);
const std = metrics.standardDeviation(values);

console.log(mean)
console.log(std)

const Xs = utils.takeFromArrayWhereIndex(values, (index) => index % 2 === 0)
const Ys = utils.takeFromArrayWhereIndex(values, (index) => index % 2 !== 0)

const covariance = metrics.covariance(Xs, Ys);
console.log(covariance)

const { counts, asList } = metrics.countIncidencesOnInterval(values, 0.1, 1)

let chiSquare = 0
const n = values.length

asList.forEach(count => {

    const diff = count - (n / 10)
    const squaredDiff = diff * diff;

    chiSquare += squaredDiff / (n / 10)
})

console.log(chiSquare)