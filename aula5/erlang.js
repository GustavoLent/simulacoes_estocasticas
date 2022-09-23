import buildGraph from "./utils/buildGraph.js";
import generateRandom from "./utils/generateRandom.js";

function fact(num) {
    if (num === 0) return 1;

    return num * fact(num - 1);
}

const getPrime = (offset) => [3, 7, 11, 13, 17, 23][offset] || 23;

(async () => {

    const functions = [
        {
            "id": "Distribuição de Erlang",
            "assertation": ({ alpha, k }) => alpha > 0 && k > 0,
            "normalize": ({ offset, randomsList, alpha, k }) => {
                let product = 1

                for (let i = 0; i < k; i++) {
                    product *= randomsList[i][offset]
                }

                return - (Math.log(product) / alpha);
            },
            "getY": ({ x, alpha, k }) => {
                const negAlpha = 0 - alpha

                const alphaERes = alpha * (Math.pow(Math.E, (negAlpha * x))) // α * [e ^ (−α*x)]
                const alphaXRes = Math.pow((alpha * x), (k - 1)) // (α * x) ^ (k - 1)

                return (alphaERes * alphaXRes) / fact(k - 1)
            }
        }
    ]

    try {
        const params = {
            alpha: 3,
            k: 2
        }

        const randomsList = []

        for (let i = 0; i < params.k; i++) {
            console.log(`Creating random values for ${i}`)
            randomsList.push(generateRandom({
                "seed": getPrime(i),
                "amount": 10000,
                "a": 5039,
                "c": 0,
                "M": 2147483647
            }).values)
        }

        console.log("Ended the creation of random values")

        for (let funcIDX = 0; funcIDX < functions.length; funcIDX++) {
            const func = functions[funcIDX];
            console.log(`Running function "${func.id}"`)

            if (!func.assertation(params)) {
                console.error(`Assertation error on function "${func.id}"!`)
                continue;
            }

            const normalizedValues = [];
            const Ys = [];

            for (let i = 0; i < randomsList[0].length; i++) {
                const normalized = func.normalize({ offset: i, randomsList, ...params });
                normalizedValues.push(normalized);

                Ys.push(func.getY({ x: normalized, ...params }))
            }

            await buildGraph({ Xs: normalizedValues, Ys, filename: `${func.id}` });
        }

    } catch (error) {
        console.log(error)
    }

})()

