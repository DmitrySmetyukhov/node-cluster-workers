// workerFork.js - This script runs in the forked process

function hardOperation(coeffitient = 1) {
  const loopCount = coeffitient * 1e9;
  let result = 0;
  for (let i = 0; i < loopCount; i++) {
    result += Math.sqrt(Math.random());
  }

  process.send({ result });
}

// Listen for messages from the parent process
process.on('message', (message) => {
  if (message.functionName === 'hardOperation') {
    hardOperation(...message.args);
  }
});
