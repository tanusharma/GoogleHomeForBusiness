var router = require('./routes/book');
var Book = require('./models/Book.js');
var server = require('./server');
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');
});

/* Dialog flow post call*/
router.post('/ping', function(req, res, next) {
	console.log('from post:', req.body);
			io.emit('message', {
				intent: req.body.queryResult.intent.displayName,
				parameters: req.body.queryResult.parameters,
				query: req.body.queryResult.queryText});
			//console.log(_this.test);
			//console.log(_this.test1);
			res.send({"fulfillmentText": "Sure","fulfillmentMessages": [{"text": {"text": ["Sure"]}}],"source": "webhook sample"});
});

module.exports = io;