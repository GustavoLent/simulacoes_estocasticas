const isPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
}

export default function getPrimes(amount, start = 1) {

    let primes = []
    let curr = start;

    for (let i = 0; i < amount; i++) {

        while (!isPrime(curr)) {
            curr++
        }
        primes.push(curr);
        curr++
    }

    return primes;
}