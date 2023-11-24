function hardOperation(coefficient = 1) {
    console.log(coefficient, 'coef**')
    const loopCount = coefficient * 1e9;
    let result = 0;
    for (let i = 0; i < loopCount; i++) {
        result += Math.sqrt(Math.random());
    }

    return result;
}

module.exports = hardOperation;