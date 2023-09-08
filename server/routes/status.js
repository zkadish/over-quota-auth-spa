var express = require('express');
const { v4: uuid } = require('uuid');
var router = express.Router();

let clients = [];
let facts = [];

/* GET number of clients listing. */
router.get('/', function(req, res, next) {
  res.json({ clients: clients.length });
  // res.send('respond with a status');
});

function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(facts)}\n\n`;

  response.write(data);

  // const clientId = Date.now();
  // console.log('eventsHandler > request', request);
  const clientId = uuid();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

router.get('/events', eventsHandler);

function sendEventsToAll(newFact) {
  clients.forEach(client => {
    console.log('CLIENT:', client);
    return client.response.write(`data: ${JSON.stringify(newFact)}\n\n`);
  });
}

async function addFact(request, response, next) {
  const newFact = request.body;
  facts.push(newFact);
  response.json(newFact)
  return sendEventsToAll(newFact);
}

router.post('/fact', addFact);

module.exports = router;
