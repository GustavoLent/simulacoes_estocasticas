import buildGraph from "./utils/buildGraph.js";
import generateRandom from "./utils/generateRandom.js";

function fact(num) {
    if (num === 0) return 1;

    return num * fact(num - 1);
}

const calcX = ({b, randoms})=>{
    let P = 1;
    let x = 0;
    const Xs = []

    for(let i = 0; i < randoms.length; i++){
        const random = randoms[i];

        P = P * random;
        if(P < b){
            Xs.push(x)
        
            P = 1;
            x = 0;
        } else {
            x ++
        }
    }

    return Xs
}

const calcY = ({lambda, x})=>{
    return (Math.pow(lambda, x) * Math.exp(-lambda)) / fact(x)
}

function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

const buildPoisson = async (randoms, params, idx)=>{
    try {
        const Xs = calcX({...params, randoms})
        const Ys = [];
        
        Xs.forEach(x => Ys.push(calcY({...params, x})));

        const colors = `rgb(${getRandomItem(Xs)}, ${getRandomItem(Xs)}, ${getRandomItem(Xs)})`

        await buildGraph({ Xs, Ys, filename: `result/Distribuição Poisson ${idx}`, colors });
    } catch (error) {
        console.log(error)
    }
}

(async () => {
    const param = {
        "seed": 31,
        "amount": 100000,
        "a": 5039,
        "c": 0,
        "M": 2147483647
    }

    const params = [
        { lambda: 10, b: Math.exp(-10)}, 
        { lambda: 5, b: Math.exp(-5)},
        { lambda: 57, b: Math.exp(-57)},
        { lambda: 73, b: Math.exp(-73)},
        { lambda: 9, b: Math.exp(-9)},
    ]

    try {
        const { values: randoms } = generateRandom({ ...param })
        console.log("Ended the creation of random values")
        
        for(let i = 0; i < params.length; i++){
            await buildPoisson(randoms, params[i], i);
            console.log("Ended " + i)
        }

    } catch (error) {
        console.log(error)
    }

})()

