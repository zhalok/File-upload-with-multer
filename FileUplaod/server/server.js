const express = require('express');
const path = require('path');
const multer = require('multer');
const { diskStorage } = require('multer');
const server = express();

server.use(express.json());

server.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow_Headers', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	next();
});

// const FILE_DESTINATION = './images/';
// const upload = multer({ dest: FILE_DESTINATION });

server.get('/', (req, res, next) => {
	res.json('Hello world');
});

const MIME_TYPE = {
	'image/jpg': 'jpg',
	'image/png': 'png',
	'image/jpeg': 'jpeg',
};

const upload = multer({
	limits: 50000000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'images');
		},
		filename: (req, file, cb) => {
			const savedFile = file.originalname;
			cb(null, savedFile);
		},
	}),
});

server.post('/upload', upload.single('file'), function (req, res, next) {
	console.log(req.file);
	res.json('ok');
});

server.use((err, req, res, next) => {
	res.json(err);
});

server.listen(5000, () => {
	console.log('running on port 5000');
});
