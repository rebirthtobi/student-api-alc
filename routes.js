var bodyParser = require('body-parser');
var student = require('./controllers/studentController');

var urlencodedParser = bodyParser.json();

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

    app.get('/student', student.index);

    app.get('/student/find', student.find);

    app.put('/student/create', urlencodedParser, student.create);

    app.patch('/student/update', urlencodedParser, student.update);

    app.post('/student/remove', urlencodedParser, student.remove);

    app.get('/student/view/:id', student.view);

    app.get('/', function(req, res) {
        res.status(404).send({ 'error': 'You took the wrong step' });
    });

    app.post('/', function(req, res) {
        res.status(404).send({ 'error': 'You took the wrong step' });
    });
};