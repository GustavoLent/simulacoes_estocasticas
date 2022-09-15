import buildGraph from "./utils/buildGraph.js";
import generateRandom from "./utils/generateRandom.js";

(async () => {
    const param = {
        "seed": 31,
        "amount": 10000000,
        "a": 5039,
        "c": 0,
        "M": 2147483647
    }

    const functions = [
        {
            "id": "PI",
            "isUnderGraph": (x, y) => (Math.pow(x, 2) + Math.pow(y, 2)) <= 1,
            "print": (underGraphCount, total) => {
                const pi = 4 * (underGraphCount / total)
                console.log(`PI: ${pi}`)
            }
        },
        {
            "id": "sen(x) cosh(x)",
            "isUnderGraph": (x, y) => {
                const calculatedY = Math.sin(x) * Math.cosh(x)

                return y < calculatedY
            },
            "print": (underGraphCount, total) => {
                console.log(`Area: ${underGraphCount / total}`)
            }
        },
        {
            "id": "sen(x) senh(x)",
            "isUnderGraph": (x, y) => {
                const calculatedY = Math.sin(x) * Math.sinh(x)

                return y < calculatedY
            },
            "print": (underGraphCount, total) => {
                console.log(`Area: ${underGraphCount / total}`)
            }
        },
        {
            "id": "x²",
            "isUnderGraph": (x, y) => {
                const calculatedY = x * x

                return y < calculatedY
            },
            "print": (underGraphCount, total) => {
                console.log(`Area: ${underGraphCount / total}`)
            }
        }
    ]

    try {
        const { Xs, Ys } = generateRandom({ ...param })
        console.log("Ended the creation of random values")

        for (let funcIDX = 0; funcIDX < functions.length; funcIDX++) {
            const func = functions[funcIDX];
            console.log(`Running function ${func.id}`)

            const colors = []
            let underGraphCount = 0;
            const total = Xs.length;

            for (let i = 0; i < Xs.length; i++) {
                const x = Xs[i];
                const y = Ys[i];

                if (func.isUnderGraph(x, y)) {
                    colors.push('rgb(51, 204, 204)')
                    underGraphCount++
                } else {
                    colors.push('rgb(124, 102, 204)')
                }
            }

            await buildGraph({ Xs, Ys, filename: func.id, colors });
            func.print(underGraphCount, total)
        }

    } catch (error) {
        console.log(error)
    }

})()

