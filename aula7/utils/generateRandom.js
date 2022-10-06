import pseudoRandom from "./pseudoRandom.js";

export default function getRandomXsAndYs({ seed, amount, a, c, M }) {
    return pseudoRandom.randomValues({ seed, amount, a, c, M, });
}