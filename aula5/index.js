import buildGraph from "./utils/buildGraph.js";
import generateRandom from "./utils/generateRandom.js";

(async () => {
    const param = {
        "seed": 31,
        "amount": 1000,
        "a": 5039,
        "c": 0,
        "M": 2147483647
    }

    const functions = [
        // {
        //     "id": "Uniform Distribution",
        //     "assertation": ({ a, b }) => a <= b,
        //     "normalize": ({ random, a, b }) => ((b - a) * random) + a
        // },
        // {
        //     "id": "Função Densidade de Probabilidade",
        //     "assertation": ({ alpha }) => alpha > 0,
        //     "normalize": ({ random, alpha }) => - ((Math.log(random)) / alpha)
        // }
        // {
        //     "id": "Distribuição Weibull",
        //     "assertation": ({ }) => true,
        //     "normalize": ({ random, alpha, beta }) => {
        //         const negLog = - (Math.log(random)) // −ln(randon)
        //         const powOfAlphaInverse = Math.pow(negLog, (1 / alpha)) // −ln(randon)^(1/α)

        //         return beta * powOfAlphaInverse; // β * {−ln(randon)^(1/α)}
        //     },
        //     "getY": ({ x, alpha, beta }) => {
        //         const exp = - Math.pow((x / beta), alpha) // − { (x/β)^α }
        //         const eRes = Math.pow(Math.E, exp); // e ^ exp

        //         const xRes = Math.pow(x, (alpha - 1)) // x ^ (α −1) 
        //         const betaRes = Math.pow(beta, (0 - alpha)) // β ^ (-α) 

        //         return alpha * betaRes * xRes * eRes
        //     }
        // }
        // {
        //     "id": "Distribuição de Erlang",
        //     "assertation": ({ alpha, k }) => alpha > 0 && k > 0,
        //     "normalize": ({ random, randoms, alpha, k }) => {
        //         let product = 1

        //         for (let i = 0; i < k; i++) {
        //             product *= randoms[i]
        //         }

        //         return - (Math.log(product / alpha)); // β * {−ln(randon)^(1/α)}
        //     },
        //     "getY": ({ x, alpha, k }) => {
        //         const negAlpha = 0 - alpha

        //         const alphaERes = alpha * (Math.pow(Math.E, (negAlpha * x))) // α * [e ^ (−α*x)]
        //         const alphaXRes = Math.pow((alpha * x), (k - 1)) // (α * x) ^ (k - 1)

        //         return (alphaERes * alphaXRes) / fact(k - 1)
        //     }
        // },
        {
            "id": "Distribuição Normal",
            "assertation": ({ }) => true,
            "normalize": ({ random }) => {
                const innerRoot = (- 2) * (Math.log(random))
                const outRoot = Math.sin(2 * Math.PI * random);

                return (Math.sqrt(innerRoot)) * outRoot;
            },
            "getY": ({ x, stdDeviation, mean }) => {
                const powXMiDiff = Math.pow((x - mean), 2) // (x − μ)²
                const powStdDeviation = Math.pow(stdDeviation, 2) // σ²
                const exp = (- (powXMiDiff)) / (2 * powStdDeviation)

                const div = (1 / (stdDeviation * Math.sqrt(2 * Math.PI))) * Math.E

                return Math.pow(div, exp)
            }
        }
    ]

    try {
        const { values } = generateRandom({ ...param })
        console.log("Ended the creation of random values")

        const params = { stdDeviation: 0, mean: 1 }

        for (let funcIDX = 0; funcIDX < functions.length; funcIDX++) {
            const func = functions[funcIDX];
            console.log(`Running function "${func.id}"`)

            if (!func.assertation(params)) {
                console.error(`Assertation error on function "${func.id}"!`)
                continue;
            }

            const normalizedValues = [];
            const Ys = [];

            for (let i = 0; i < values.length; i++) {
                const random = values[i];

                const normalized = func.normalize({ random, ...params });
                normalizedValues.push(normalized);

                Ys.push(func.getY({ x: normalized, ...params }))
            }

            await buildGraph({ Xs: normalizedValues, Ys, filename: `${func.id}` });
        }

    } catch (error) {
        console.log(error)
    }

})()

