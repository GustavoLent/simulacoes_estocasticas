import generateRandom from "./utils/generateRandom.js";

const arrived = ({current = {x, y}, destiny = {x, y}}) => current.x == destiny.x && current.y == destiny.y

const simulateDrunkWalk = ({
    randomValues, 
    totalMinutes, 
    origin = {x: 0, y:0}, 
    destiny = {x:3, y:4}
}) => {
    try {
        let randomValIdx = 0;
        const Xs = [],  Ys = [];
        let time = 0;
        let {x, y} = origin;        

        while(!arrived({current: {x, y}, destiny}) && time <= totalMinutes){
            const randon1 = randomValues[randomValIdx++];
            const randon2 = randomValues[randomValIdx++];

            if(randon1 <= 0.35){
                time = time + 1
            }

            if(randon2 <= 0.35) {
                x = x + 1;  // direção leste
            } else if(0.35 < randon2 && randon2 <= 0.80) {
                y = y + 1;  // direção norte
            } else if(0.80 < randon2 && randon2 <= 0.90) {
                x = x - 1;  // direção oeste
            } else {
                y = y -1;   // direção sul
            }

            time = time + 5   // andou uma quadra
            Xs.push(x);
            Ys.push(y);
        }
        
        return {
            Xs, 
            Ys, 
            time, 
            endedIdx: randomValIdx, 
            sucess: x == 3 && y == 4 && time <= 60
        };
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

    const totalHours = 5;
    const totalMinutes = totalHours * 60;
    const origin = {x: 0, y: 0};
    const destiny = {x: 3, y: 4};

    let randomValues = generateRandom({ ...param })
    const originalLength = randomValues.length
    console.log("Ended the creation of random values")
    
    const results = [];

    while(randomValues.length > 0){
        try{
            const drunkWalk = simulateDrunkWalk({randomValues, totalMinutes, origin, destiny});
            const { Xs, Ys, tempo, sucess, endedIdx } = drunkWalk;
            
            results.push({ Xs, Ys, tempo, sucess });
            randomValues = randomValues.slice(endedIdx)
        }catch(error){
            console.log(error)
        }
    }

    const sucessCases = results.filter(result => result.sucess)
    
    console.log(`Sucess rate: ${sucessCases.length}/${originalLength}: ${sucessCases.length/originalLength}`)

})()

