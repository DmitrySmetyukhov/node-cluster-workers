const workerpool = require('workerpool');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const pool = workerpool.pool(__dirname + '/workerPool.js', {maxWorkers: 2});

    // Pass arguments to the hardOperation function
    const coeffitient = 1.1;
    pool.exec('hardOperation', [coeffitient])
        .then(function (result) {
            console.log(result)
            res.send({ result});
        })
        .catch(function (err) {
            console.error(err);
        })
        .then(function () {
            console.log('worker is terminated. work is done!')
            pool.terminate(); // terminate all workers when done
        });
});

app.get('/test', (req, res) => {
    res.send('TEST');
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});