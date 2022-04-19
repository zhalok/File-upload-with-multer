const express = require('express');
const fs = require('fs');

const {
	mongodb,
	MongoClient,
	ServerApiVersion,
	GridFSBucket,
} = require('mongodb');
const app = express();

const uri =
	'mongodb+srv://zhalok:03041959@cluster0.ggnxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('yo');
});

const db = client.db('BookLookFiles');
const bucket = new GridFSBucket(db, { bucketName: 'myCustomBucket' });

app.post('/upload', (req, res) => {
	fs.createReadStream('./name.txt').pipe(
		bucket.openUploadStream('myFile.txt', {
			chunkSizeBytes: 1048576,
			metadata: { field: 'myField', value: 'myValue' },
		})
	);
	res.json('Upload Successful');
});

app.get('/retrive', (req, res) => {
	const data = db.collection('BookLookFiles.myCustomBucket.chunks').find({});
	data.forEach((e) => console.log(data));
	res.json(data);
});

app.get('/download', (req, res) => {
	bucket
		.openDownloadStreamByName('myFile.txt')
		.pipe(fs.createWriteStream('./outputFile'));
	res.json('file downloaded');
});

app.listen(5000, () => {
	console.log('server running');
});
