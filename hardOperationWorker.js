const { parentPort, workerData } = require('worker_threads');

function hardOperation(coefficient = 1) {
  const loopCount = coefficient * 1e9;
  let result = 0;
  for (let i = 0; i < loopCount; i++) {
    result += Math.sqrt(Math.random());
  }

  parentPort.postMessage({ result });
  parentPort.close();
}

hardOperation(workerData.coefficient);