import buildGraph from "./utils/buildGraph.js";
import generateRandom from "./utils/generateRandom.js";

const calcX = ({a, b, c, random})=>{
    const diff = (b-a)/(c-a);

    if(random <= diff){
        return a + Math.sqrt(random * (b - a) * (c - a))
    }

    return c - Math.sqrt((1-random) * (c - b) * (c - a))
    
}

const calcY = ({a, b, c, x})=>{
    if(a <= x && x <= b){
        return (2 * (x-a)) / ((b-a)*(c-a))
    }
    
    return (2 * (c-x)) / ((c-b)*(c-a))
}

(async () => {
    const param = {
        "seed": 31,
        "amount": 1000000,
        "a": 5039,
        "c": 0,
        "M": 2147483647
    }

    const params = { a: 2, b: 3, c: 5}

    try {
        const { values } = generateRandom({ ...param })
        console.log("Ended the creation of random values")

        const Xs = [];
        const Ys = [];

        for (let i = 0; i < values.length; i++) {
            const random = values[i];

            const x = calcX({...params, random})
            Xs.push(x)

            Ys.push(calcY({...params, x}))
        }

        await buildGraph({ Xs, Ys, filename: `result/Distribuição triangular` });

    } catch (error) {
        console.log(error)
    }

})()

