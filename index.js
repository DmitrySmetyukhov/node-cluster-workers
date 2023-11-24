const { fork } = require('child_process');
const express = require('express');
const app = express();

const MAX_CONCURRENT_FORKS = 1; // Set your desired maximum number of concurrent forks
const taskQueue = [];
let activeForks = 0;

function processQueue() {
    if (taskQueue.length > 0 && activeForks < MAX_CONCURRENT_FORKS) {
        const { functionName, args, res } = taskQueue.shift();

        const worker = fork('./workerFork.js');
        activeForks++;

        worker.send({ functionName, args });

        worker.on('message', (message) => {
            console.log(message)
            res.send({ result: message.result });
            worker.kill();
            activeForks--;

            // Process the next task in the queue
            processQueue();
        });
    }
}

app.get('/', (req, res) => {
    const coeffitient = 1.1;

    // Enqueue the task
    taskQueue.push({ functionName: 'hardOperation', args: [coeffitient], res });

    // Process the queue
    processQueue();
});

app.get('/test', (req, res) => {
    res.send('TEST');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
