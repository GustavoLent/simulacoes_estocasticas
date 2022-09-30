import buildGraph from "./utils/buildGraph.js";
import generateRandom from "./utils/generateRandom.js";

const calcX = ({p, random})=>{
    return Math.floor(1 + ((Math.log(random))/(Math.log(1-p))))
}

const calcY = ({p, x})=>{
    const q = 1-p
    
    return p * Math.pow(q, x-1)
}

(async () => {
    const param = {
        "seed": 31,
        "amount": 10000,
        "a": 5039,
        "c": 0,
        "M": 2147483647
    }

    const params = { p: 0.1}

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

        await buildGraph({ Xs, Ys, filename: `result/Distribuição Geométrica` });

    } catch (error) {
        console.log(error)
    }

})()

