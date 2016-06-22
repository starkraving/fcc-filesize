console.log('starting up');
var mode = process.argv[2] || 'development';
if ( mode == 'development' ) {
	require('dotenv').config();
}
var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer();

app.set('view engine', 'jade');

app.get('/', function(req, resp){
	resp.render('index');
});

app.post('/', upload.single('file'), function(req, resp, next){
	resp.contentType('text/JSON');
	resp.send(JSON.stringify({
		status: 'success',
		data: {
			filename: req.file.originalname,
			filesize: req.file.size
		}
	}));
});

console.log('listening on port '+process.env.PORT);
app.listen(process.env.PORT);