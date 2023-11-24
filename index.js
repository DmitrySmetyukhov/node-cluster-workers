const express = require('express');
const bodyParser = require('body-parser');
const { Worker } = require('worker_threads');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const MAX_CONCURRENT_WORKERS = 1; // Set your desired maximum number of concurrent workers

let activeWorkers = 0;

app.get('/', (req, res) => {
  if (activeWorkers < MAX_CONCURRENT_WORKERS) {
    const worker = new Worker(path.join(__dirname, 'hardOperationWorker.js'), {
      workerData: { coefficient: 1.5 },
    });

    activeWorkers++;

    worker.on('message', message => {
      console.log(`Worker: ${message.result}`);
      res.json({ sum: message.result });
    });

    worker.on('error', error => {
      console.error(`Worker error: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    worker.on('exit', code => {
      activeWorkers--;
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  } else {
    res.status(503).json({ error: 'Service Unavailable. Maximum workers reached.' });
  }
});

app.get('/test', (req, res) => {
  res.send('TEST');
});

app.listen(3000, () => {
  console.log('Server started on PORT 3000');
});
