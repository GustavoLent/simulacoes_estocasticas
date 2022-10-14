const generateRandom = require("./utils/generateRandom.js");

/** The Arrival Time is the time spent since the last client arrives */
const getArrivalTime = ({ random }) => -20 * Math.log(random);

const getServiceDuration = ({ a, b, random }) => ((b - a) * random) + a;

const calculateClientTimes = ({
    serviceDuration,
    arrivalTimeInClock,
    serviceStartTimeInClock,
}) => {
    const serviceEndTimeInClock = serviceDuration + serviceStartTimeInClock;
    const timeSpentInQueue = serviceStartTimeInClock - arrivalTimeInClock;
    const timeSpentInSystem = serviceDuration + timeSpentInQueue;

    return { serviceEndTimeInClock, timeSpentInQueue, timeSpentInSystem };
}

const getFirstClientValues = ({ a, b, random }) => {
    const arrivalTime = getArrivalTime({ random });
    const serviceDuration = getServiceDuration({ a, b, random });
    const arrivalTimeInClock = arrivalTime;
    const serviceStartTimeInClock = arrivalTime;
    const { serviceEndTimeInClock, timeSpentInQueue, timeSpentInSystem, } = calculateClientTimes({ serviceDuration, arrivalTimeInClock, serviceStartTimeInClock })
    const systemFreeTime = arrivalTime;
    
    return {
        arrivalTime, serviceDuration,
        arrivalTimeInClock, serviceStartTimeInClock,
        serviceEndTimeInClock, timeSpentInQueue, timeSpentInSystem,
        systemFreeTime
    };
}

const getClientValues = ({lastClientValues, a, b, random}) =>{
    const arrivalTime = getArrivalTime({ random });
    const serviceDuration = getServiceDuration({ a, b, random });
    const arrivalTimeInClock = lastClientValues.arrivalTimeInClock + arrivalTime;
    
    const serviceStartTimeInClock = arrivalTimeInClock >= lastClientValues.serviceEndTimeInClock ? arrivalTimeInClock : lastClientValues.serviceEndTimeInClock;
    const { serviceEndTimeInClock, timeSpentInQueue, timeSpentInSystem, } = calculateClientTimes({ serviceDuration, arrivalTimeInClock, serviceStartTimeInClock })
    const systemFreeTime = serviceStartTimeInClock - lastClientValues.serviceEndTimeInClock;

    return {
        arrivalTime, serviceDuration,
        arrivalTimeInClock, serviceStartTimeInClock,
        serviceEndTimeInClock, timeSpentInQueue, timeSpentInSystem,
        systemFreeTime
    };
}


(async () => {
    const param = {
        "seed": 31,
        "amount": 100000,
        "a": 5039,
        "c": 0,
        "M": 2147483647
    }

    const a = 15, b = 35;

    let randomValues = generateRandom({ ...param, slice: 2 })
    console.log("Ended the creation of random values")

    const firstCliValues = getFirstClientValues({a, b, random: randomValues[0]});
    let queueTotalTime = firstCliValues.timeSpentInQueue;
    let serviceTotalTime = firstCliValues.serviceDuration;
    let systemTotalTime = firstCliValues.timeSpentInSystem;
    let systemTotalFreeTime = firstCliValues.systemFreeTime;

    const results = [firstCliValues];
    
    for (let i = 1; i < randomValues.length; i++) {
        try {
            const random = randomValues[i];
            const lastClientValues = results[i-1];

            const clientValues = getClientValues({lastClientValues, a, b, random})
            
            results.push(clientValues);

            queueTotalTime += clientValues.timeSpentInQueue;
            serviceTotalTime += clientValues.serviceDuration;
            systemTotalTime += clientValues.timeSpentInSystem;
            systemTotalFreeTime += clientValues.systemFreeTime;
        } catch (error) {
            console.log(error)
        }
    }
     
    const queueAVGTime = queueTotalTime / randomValues.length;
    const serviceAVGTime = serviceTotalTime / randomValues.length;
    const systemAVGTime = systemTotalTime / randomValues.length;
    const systemAVGFreeTime = systemTotalFreeTime / randomValues.length;
    
    console.log(results)
    // console.log(`Sucess rate: ${sucessCases.length}/${originalLength}: ${sucessCases.length / originalLength}`)

})()

